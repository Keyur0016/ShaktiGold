import { View, StyleSheet, StatusBar, ScrollView, Image, Text, 
    Pressable, ToastAndroid, Dimensions, BackHandler, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from './Information/ColorCode'; 
import * as URL from './Information/RequestURL' ; 
import {WebView} from 'react-native-webview' ; 
import LoadData from './OtherComponent/LoadingData' ; 
import { useIsFocused } from "@react-navigation/native";


export default function OrderLayout({navigation, route}){

    // == Table name
    const {Table_name} = route.params ;

    // == Order Option Layout Width 
    const Order_option_layout_width = parseInt((Dimensions.get('window').width)*0.6) ; 

    // == Layout option value 
    const [pending_order_layout, set_pending_order_layout] = useState(true); 
    const [complete_order_layout, set_complete_order_layout] = useState(false) ; 
    const [cancel_order_layout, set_cancel_order_layout] = useState(false) ;  

    // == Show QRCOde Image Layout 
    const [QR_code_layout, set_QR_Code_layout] = useState(false) ; 
    const [QR_code_image , set_QR_code_image] = useState('') ; 

    // == Status bar color
    const [Status_bar_color, set_Status_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    // == Order information
    const [pending_order_information_data, set_pending_order_information_data] = useState([]) ; 
    const [order_information, set_order_information] = useState([]); 

    // == Check Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    const isScreenFocus = useIsFocused() ; 

    
    // **** Start Pending order data Request Handler **** //

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;
    const [order_loading_layout, set_order_loading_layout] = useState(false) ; 

    const Fetch_order_data = (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 
        set_order_loading_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data);

            if (Temp_data.Status == "Fetch"){
                set_order_information([...Temp_data.Order].reverse());
                set_pending_order_information_data([...Temp_data.Order].reverse()) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT ) ; 
        }
    }

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../assets/Font/Ubuntu-Medium.ttf')
            })
           
            setLoadFontValue(true); 
        }; 
    
        loadFont() ;

        const Load_Order_data = async () => {

            try{

                let Pending_order_data = {
                    "Table_name": Table_name, 
                    "Order_status": "Pending", 
                    "Check_status": "Place_order_data"
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Pending_order_data) ; 
                
                set_web_view_url(web_url) ; 
                set_order_loading_layout(false) ; 

            }catch{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }; 

        
        setTimeout(() => {
            Load_Order_data() ; 
            
        }, 500);
    }, [isScreenFocus] ); 

    // == Qr Code Opener 
    const QrCode_layout_opener = (order_id, mobile_number) => {
        
        let QrCode_data = Table_name + "**" + order_id + "**" + mobile_number ; 
        set_QR_code_image("https://api.qrserver.com/v1/create-qr-code/?data=" + QrCode_data ) ; 
        set_QR_Code_layout(true) ; 
        set_Status_bar_color("#ececec") ; 
    }

    // == QRCode Closer
    const QRCode_layout_closer = () => {
        set_QR_Code_layout(false); 
        set_Status_bar_color(colorCode.SignupColorCode.ButtonColor) ;
    }

    // == Back Handler 
    const Back_Handler = () => {
        navigation.goBack() ; 
    }

    // == Pending order Handler 
    const Pending_order_handler = () => {
        set_pending_order_layout(true) ; 
        set_complete_order_layout(false) ;
        set_cancel_order_layout(false) ;
        
        try{

            let Cancel_order_data = {
                "Table_name": Table_name, 
                "Order_status": "Pending", 
                "Check_status": "Place_order_data"
            }; 

            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Cancel_order_data) ; 
            
            set_web_view_url(web_url) ; 
            set_order_loading_layout(false) ; 
            
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

    }

    // == Complete order Handler 
    const Complete_order_handler = async () => {
        set_pending_order_layout(false); 
        set_complete_order_layout(true) ; 
        set_cancel_order_layout(false) ; 
     
        try{

            let Complete_order_data = {
                "Table_name": Table_name, 
                "Order_status": "Complete", 
                "Check_status": "Place_order_data"
            }; 

            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Complete_order_data) ; 
            
            set_web_view_url(web_url) ; 
            set_order_loading_layout(false) ; 
            

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // == Cancel order handler
    const Cancel_order_Handler = async () => {
        set_pending_order_layout(false) ;
        set_complete_order_layout(false) ; 
        set_cancel_order_layout(true); 
        
        try{

            let Cancel_order_data = {
                "Table_name": Table_name, 
                "Order_status": "Cancel", 
                "Check_status": "Place_order_data"
            }; 

            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Cancel_order_data) ; 
            
            set_web_view_url(web_url) ; 
            set_order_loading_layout(false) ; 
            
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // == Cancel order request 
    const Cancel_order_request_handler = async (element) => {
        navigation.navigate("CancelOrder", {"Table_name":Table_name, "Order":element}) ; 
    }

    
    

    if (loadFontValue){
        return(
            <View style={OrderLayoutStyle.OrderLayoutScreen}>
                  
                <StatusBar
                    backgroundColor={Status_bar_color}
                />  

                {!webview_layout?<>
                    <View
                        style={{
                            height: "1%", 
                            width: "1%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {webview_value}
                            source={{uri:web_view_url}}
                            onMessage={Fetch_order_data}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* == Back Option Container ==  */}

                <View style={OrderLayoutStyle.BackImageContainer}>
                                
                    <Pressable style={[OrderLayoutStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress={Back_Handler}
                        >
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={OrderLayoutStyle.BackImage}
                        />
                    
                        <Text style={OrderLayoutStyle.BackText}>Order information</Text>
                    
                    </Pressable>
        
                </View>
                
                {/* == Pending order, cancel order, complete order option ==  */}
                 
                <View style={OrderLayoutStyle.OrderFetchOption}>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >

                        {/* == Pending order option ==  */}

                        <Pressable style={[OrderLayoutStyle.OrderFetchPressableLayout, 
                            {backgroundColor: pending_order_layout? colorCode.HomeScreenColor.PriceLayoutColor : colorCode.HomeScreenColor.PriceInformationTitleColor,
                            width: Order_option_layout_width} ]}
                            android_ripple={{color: pending_order_layout ? colorCode.HomeScreenColor.PriceInformationTitleColor:colorCode.HomeScreenColor.PriceLayoutColor }}
                            onPress={Pending_order_handler}>

                            <Text style={[OrderLayoutStyle.OrderFetchText, {color:pending_order_layout?"white":"black"}]}>Pending order</Text>
                        
                        </Pressable>

                        {/* == Complete order option ==  */}
                        <Pressable style={[OrderLayoutStyle.OrderFetchPressableLayout, 
                            {backgroundColor:complete_order_layout ?colorCode.HomeScreenColor.PriceLayoutColor:colorCode.HomeScreenColor.PriceInformationTitleColor,
                            width: Order_option_layout_width}]}
                            android_ripple={{color: complete_order_layout ? colorCode.HomeScreenColor.PriceInformationTitleColor:colorCode.HomeScreenColor.PriceLayoutColor}}
                            onPress={Complete_order_handler}>
                        
                            <Text style={[OrderLayoutStyle.OrderFetchText, {color:complete_order_layout?"white":"black"}]}>Complete order</Text>
                        
                        </Pressable>

                        {/* == Cancel order option ==  */}
                        <Pressable style={[OrderLayoutStyle.OrderFetchPressableLayout, 
                            {backgroundColor:cancel_order_layout ?colorCode.HomeScreenColor.PriceLayoutColor:colorCode.HomeScreenColor.PriceInformationTitleColor,
                            width: Order_option_layout_width}]}
                            android_ripple={{color: cancel_order_layout  ? colorCode.HomeScreenColor.PriceInformationTitleColor:colorCode.HomeScreenColor.PriceLayoutColor}}
                            onPress={Cancel_order_Handler}>
                        
                            <Text style={[OrderLayoutStyle.OrderFetchText, {color: cancel_order_layout ?"white":"black"}]}>Cancel order</Text>
                        
                        </Pressable>

                    </ScrollView>
                    

                </View>
                   
                {QR_code_layout?<>

                    <View style={OrderLayoutStyle.QRCodeImageLayout}>
                    
                        <Pressable 
                            style={{backgroundColor:"white", marginLeft: "auto", marginRight: "auto", width:"80%",
                                paddingTop:10, paddingBottom: 10, alignItems:"center", borderRadius: 8, marginTop: 25 }}
                                android_ripple={{color:"#a4a4a4"}}
                                onPress = {QRCode_layout_closer}>
                            
                            <Text style={OrderLayoutStyle.QRCodeText}>Close</Text>
                        
                        </Pressable>

                        <Image
                            source={{uri:QR_code_image}}
                            style={OrderLayoutStyle.QRCodeImage}
                        />
                    </View>

                </>:<></>}

                {/* Order data layout  */}
                
                {order_loading_layout?<>

                    <ScrollView showsVerticalScrollIndicator={false} >
                    
                        {order_information.length > 0?<>

                            {order_information.map((element, index) => {
                                return(

                                    <View style={OrderLayoutStyle.OrderInformationLayout}
                                        key={index}>

                                        {/* Username information  */}
                                        
                                        <View style={[OrderLayoutStyle.UserInformationStyle, {backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor}]} >
                                            
                                            <Text style={[OrderLayoutStyle.UserInformationTitle, {color: "white"}]}>Username : </Text>
                                            <Text style={[OrderLayoutStyle.UserInformationData, {color: "white", fontFamily: "Ubuntu"}]}>{element.Data9}</Text>
                                        
                                        </View>

                                        {((cancel_order_layout == true) || (element.Data2 == "Server-cancel"))?<>
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle, {color:"#ff7176", fontSize:18}]}>Order cancel by Shree Shakti Gold </Text>

                                            </View>
                                        </>:<></>}

                                        {/* Order id information  */}

                                        <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                            <Text style={[OrderLayoutStyle.UserInformationTitle]}>Order id :</Text>
                                            <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data1}</Text>

                                        </View>

                                        {/* Order date information  */}

                                        <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                            <Text style={[OrderLayoutStyle.UserInformationTitle]}>Order date :</Text>
                                            <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data5}</Text>

                                        </View>
                                        
                                        {/* Show complete order date for Complete order  */}

                                        {complete_order_layout == true?<>
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle]}>Order Deliver date :</Text>
                                                <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data5}</Text>

                                            </View>
                                        </>:<></>}

                                        {/* Show cancel order date for Cancel order  */}

                                        {cancel_order_layout == true?<>
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle]}>Order cancel date :</Text>
                                                <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data6}</Text>

                                            </View>
                                        </>:<></>}

                                        {/* Cancel reason information  */}

                                        {cancel_order_layout == true?<>
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle]}>Cancel reason :</Text>
                                                <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data7 }</Text>

                                            </View>
                                        </>:<></>}

                                        

                                        {/* Payment method information  */}

                                        <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                            <Text style={[OrderLayoutStyle.UserInformationTitle]}>Payment method :</Text>
                                            <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data3}</Text>

                                        </View>

                                        {(element.Data2 == "User-cancel") && (element.Data3 == "Payment success")?<>
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle]}>Refund status :</Text>
                                                <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data15}</Text>

                                            </View>
                                        </>:<></>}
                                        

                                        {/* Payment id information  */}

                                        {element.Data2 == "Online payment"?<>
                                            
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle]}>Payment id :</Text>
                                                <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data4}</Text>

                                            </View>
                                        
                                        </>:<></>}

                                        {(element.Data2 == "Complete") && (element.Data3 == "Payment success") ?<>
                                            
                                            <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8} ]}>

                                                <Text style={[OrderLayoutStyle.UserInformationTitle]}>Payment id :</Text>
                                                <Text style={[OrderLayoutStyle.UserInformationData]}>{element.Data4}</Text>

                                            </View>
                                        
                                        </>:<></>}
                                    
                                        {/* Subtotal information  */}

                                        <View style={[OrderLayoutStyle.UserInformationStyle, {paddingTop:8, paddingBottom:8, marginBottom: 6}]}>
                                            
                                            <Text style={[OrderLayoutStyle.UserInformationTitle, {color:"#cd3838"}]}>Subtotal:</Text>
                                            <Text style={[OrderLayoutStyle.UserInformationData, {marginLeft:"auto", fontSize: 19}]}>₹{element.Data8}/-</Text>
                                        
                                        </View>

                                        {/* ProductData information  */}
                                        
                                        {element.Product_data.map((product_element, index) => {
                                            return(
                                                <View style={[OrderLayoutStyle.PopularProductLayout, 
                                                    {elevation:0, marginTop:5,marginBottom:5, borderTopWidth: 1, borderTopColor: "#ececec"}]}
                                                    key={index}>

                                                    <Pressable style={OrderLayoutStyle.PopularProductPressableLayout}
                                                        android_ripple={{color:colorCode.HomeScreenColor.ProductLayoutRippler}}
                                                        > 
                                                        
                                                        <Pressable style={OrderLayoutStyle.PressableImageLayout}>
                                                            
                                                            <Image
                                                                source={{uri:product_element.Product_image1}}
                                                                style = {OrderLayoutStyle.PopularProductImage}
                                                            />

                                                        </Pressable>
                                    
                                                        <View style={OrderLayoutStyle.ProductInfoData}>

                                                            {/* Product information  */}
                                                            <Text style={OrderLayoutStyle.ProductInformation}>{product_element.Product_information}</Text>
                                                                
                                                            {/* Weight and Size information layout   */}

                                                            <View style={OrderLayoutStyle.WeightSizeLayout}>
                                                        
                                                                {/* Weight information  */}

                                                                <View style={OrderLayoutStyle.WeightLayout}>

                                                                    <Text style={OrderLayoutStyle.WeightSizeTitle}>Weight |</Text>

                                                                    <Text style={OrderLayoutStyle.WeightSizeInformation}>{product_element.Product_weight}</Text>
                                                                
                                                                </View>
                                                                
                                                                {/* Size information */}

                                                                <View style={[OrderLayoutStyle.SizeLayout]}>
                                                                    
                                                                    <Text style={OrderLayoutStyle.WeightSizeTitle}>Size |</Text>
                                                                
                                                                    <Text style={OrderLayoutStyle.WeightSizeInformation}>{product_element.Product_size}</Text>
                                                                
                                                                </View>

                                                            </View>

                                                            {/* Price information layout  */}
                                                            
                                                            <View style={OrderLayoutStyle.PriceInformationLayout}>
                                                                
                                                                <Text style={[OrderLayoutStyle.WeightLayout, 
                                                                    {marginRight: 0, 
                                                                    fontFamily: "Mukta",
                                                                    fontSize: 18}]}>Price</Text>

                                                                <Text style={OrderLayoutStyle.RetailPrice}>₹{product_element.Product_retail_price}</Text>
                                                                
                                                                <Text style={OrderLayoutStyle.DiscountPrice} numberOfLines={1} >₹{product_element.Product_discount_price}</Text>    
                                                            
                                                            </View>


                                                        </View>

                                                    </Pressable>

                                                </View> 
                                            )
                                        })}
                                        
                                        {/* Product address information layout */}

                                        <View style={[OrderLayoutStyle.AddressLayout, 
                                            {borderTopWidth:1, borderTopColor:"#ececec", paddingTop:8, marginBottom: 5}]}>
                                        
                                            <Text style={[OrderLayoutStyle.UserInformationTitle]}>Address :</Text>
                                            <Text style={[OrderLayoutStyle.UserInformationData, {marginLeft:0, marginTop: 8}]}>
                                                {element.Data11}
                                            </Text>
                                            
                                            <Text style={[OrderLayoutStyle.UserInformationData, {marginLeft:0, marginTop: 4}]}>
                                                {element.Data12}, {element.Data13}
                                            </Text>
                                            
                                            <Text style={[OrderLayoutStyle.UserInformationData, {marginLeft:0, marginTop: 4}]}>
                                                Pincode = {element.Data14}
                                            </Text>
                                        
                                        </View>

                                        {/* Show QR code Option  */}
                                        <Pressable style={[OrderLayoutStyle.QrCancelLayout]}
                                            android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                            onPress = {() => QrCode_layout_opener(element.Data1, element.Data10)}>

                                            <Text style={[OrderLayoutStyle.QrCancelText]}> Show QR code</Text>
                                        
                                        </Pressable> 

                                        {((element.Data2 == "Pending") || (element.Data2 == "Online payment") )?<>

                                            <Pressable style={[OrderLayoutStyle.QrCancelLayout]}
                                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                                onPress={() => Cancel_order_request_handler(element)}>
                                            
                                                <Text style={[OrderLayoutStyle.QrCancelText]}>Cancel order</Text>
                                            
                                            </Pressable>
                                        </>:<></>}

                                    </View>
                                )
                            })}
                        </>:<>
                            <Text style={{fontFamily:"Ubuntu", fontSize: 19, 
                            width:"80%", marginLeft:"auto", marginRight:"auto", marginTop:20}}>Not found any Order information</Text>
                        </>}
                    
                    </ScrollView>
                </>:<>
                    <LoadData/>
                </>}

            </View>
        )
    }
    
}

const OrderLayoutStyle = StyleSheet.create({
    OrderLayoutScreen: {
        backgroundColor: "#ececec", 
        width:"100%", 
        height: "100%"
    }, 

    OrderFetchOption:{
        paddingTop: 8 ,
        paddingBottom: 8, 
        backgroundColor: "white", 
        width: "100%"
    }, 

    OrderFetchPressableLayout:{
        backgroundColor: colorCode.HomeScreenColor.PriceInformationTitleColor, 
        marginLeft: "auto", 
        marginRight:"auto", 
        alignItems: "center", 
        paddingTop: 10, 
        paddingBottom: 10, 
        borderRadius: 5, 
        marginLeft: 8, 
        marginRight: 8
    }, 

    OrderFetchText:{
        fontFamily: "Ubuntu",
        fontSize: 17
    }, 

    OrderInformationLayout:{
        width: "96%", 
        backgroundColor: "white", 
        marginLeft: "auto", 
        marginRight: "auto", 
        paddingBottom:13, 
        borderRadius:8,
        elevation: 10, 
        shadowColor: "#919191", 
        marginTop: 5,
        marginBottom: 10  
    }, 

    UserInformationStyle:{
        display: "flex", 
        flexDirection: "row", 
        paddingLeft: 8, 
        paddingRight: 10, 
        paddingBottom: 8, 
        paddingTop: 13, 
        borderTopLeftRadius: 8 ,
        borderTopRightRadius: 8 
    }, 

    UserInformationTitle:{
        fontFamily: "Ubuntu", 
        fontSize: 17
    }, 

    UserInformationData:{
        fontFamily: "Sans", 
        fontSize: 18, 
        marginLeft: 8
    },

    PopularProductLayout:{
        borderRadius: 10,
        height: 160,
        width: '100%',
        marginTop: 10,
        marginBottom:10, 
        marginLeft: "auto", 
        marginRight: "auto",
        elevation: 10, 
        shadowColor: "#a7a7a7" 
    },
    
    PopularProductPressableLayout:{
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 15,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row"
    },   
    
    PressableImageLayout:{
        width: "30%", 
        display: "flex", 
        textAlign: "center", 
        justifyContent: "center", 
        alignItems: "center", 
        paddingLeft: 8,
        paddingRight: 8
    }, 

    PopularProductImage:{
        height: "100%",
        width: "100%",
        resizeMode: 'contain'
    }, 
    
    ProductInfoData:{
        width:"70%",
        paddingLeft: "3%",
        borderLeftWidth: 1,
        borderLeftColor: "#ececec"
    },
    
    ProductInformation:{
        fontFamily: "Ubuntu",
        fontSize: 18,
        color: '#4b4b4b',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
        width : '100%',
        textAlign: 'left'
    },
    
    WeightSizeLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop:13
    },
    
    WeightLayout:{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f3f1f1",
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:6,
        paddingRight:6,
        borderRadius:5,
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    },
    
    SizeLayout:{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f3f1f1",
        marginRight: "1%",
        marginLeft: "1%" , 
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:6,
        paddingRight:6,
        borderRadius:5,
        marginLeft: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    },
    
    WeightSizeTitle:{
        fontFamily: "Mukta",
        fontSize: 17,
        marginTop: "auto",
        marginBottom: "auto",
        color: "#343434"
    },
    
    WeightSizeInformation:{
        fontFamily: "Sans",
        fontSize: 17,
        marginBottom: "auto",
        marginTop: "auto",
        marginLeft: 5,
        color: '#313131'
    },
    
    PriceInformationLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop: 10, 
        width: "100%", 
    },
    
    RetailPrice:{
        fontFamily: "Ubuntu",
        fontSize: 17,
        color: '#fb6969', 
        textDecorationLine: 'line-through',
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 12, 
    },
    
    DiscountPrice:{
        fontFamily: "Ubuntu",
        fontSize: 17,
        color: "#696969",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10, 
    }, 

    AddressLayout:{
        width: "96%", 
        marginLeft: "auto", 
        marginRight: "auto"
    }, 

    QrCancelLayout:{
        backgroundColor:colorCode.HomeScreenColor.PriceInformationTitleColor, 
        alignItems: "center", 
        width: '95%',
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop: 8  , 
        marginBottom: 8, 
        paddingTop: 12,
        paddingBottom: 12, 
        borderRadius: 8 
    }, 
    
    QrCancelText:{
        fontFamily: "Ubuntu",
        fontSize: 17, 
        color: "white"
    }, 

    QRCodeImageLayout:{
        height: "100%", 
        width: "100%", 
        position: "absolute", 
        zIndex: 10, 
        backgroundColor: "#54545480", 
        display: "flex", 
        textAlign: "center",
    }, 

    QRCodeImage:{
        height: "40%", 
        width:"80%", 
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop: "auto", 
        marginBottom: "auto"
    },

    QRCodeText:{
        fontFamily: "Ubuntu", 
        fontSize: 18,
        zIndex: 12, 
    },

    BackImageContainer:{
        display: "flex",
        flexDirection: 'row',
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    }, 

    BackImage:{
        height: 30,
        width: 30, 
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    BackText:{
        fontFamily: 'Ubuntu',
        fontSize: 19,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    }
})