import { View, StatusBar, Pressable, Text, ScrollView, 
    StyleSheet, Image, ToastAndroid} from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from './Information/ColorCode' ; 
import * as URL from './Information/RequestURL' ; 
import BlurViewLayout from "./OtherComponent/BlurViewLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';
import { CommonActions } from '@react-navigation/native';

export default function BillLayout({navigation, route}){

    // --- Table name --- // 

    const {Table_name} = route.params ; 

    // == Loading Layout 

    const [loading_layout, set_loading_layout] = useState(false) ; 

    // == Disable Navigation bar color
    
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    // == Require data 
    
    const [Username, set_Username] = useState(''); 
    
    const [cart_total, set_cart_total] = useState(''); 
    
    const [product_data, set_product_data] = useState([]) ; 
    
    const [payment_method, set_payment_method] = useState('') ; 
    
    const [street_address, set_street_address] = useState('') ; 
    
    const [area, set_area] = useState('') ; 
    
    const [landmark, set_landmark] = useState(''); 
    
    const [pincode, set_pincode] = useState('') ; 
    
    const [mobile_number, set_mobile_number] = useState('') ; 

    // == Check font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false);

    useEffect(() => {
        const loadFont = async () => {

            const Fetch_mobile_number = await AsyncStorage.getItem("Mobilenumber") ; 
            set_mobile_number(Fetch_mobile_number)

            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../assets/Font/Ubuntu-Medium.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ;

        const Set_Bill_data = async ()  => {
               
            let Order_data = await AsyncStorage.getItem("Order") ; 
            Order_data = JSON.parse(Order_data) ; 

            set_cart_total(Order_data.Subtotal) ; 
            
            set_product_data([...Order_data.Product]) ;
            
            set_payment_method(Order_data.Payment_method) ; 
            
            set_street_address(Order_data.Address.Street_address) ; 
            
            set_area(Order_data.Address.Area) ; 
            
            set_landmark(Order_data.Address.Landmark); 
            
            set_pincode(Order_data.Address.Pincode); 
            
            set_Username(Order_data.Address.Username) ; 

            const Mobile_number = await AsyncStorage.getItem("Mobilenumber"); 

        } ; 

        Set_Bill_data() ; 

    }, []);

    const Set_loading_layout_handler = () => {
        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }

    const Disable_loading_layout_handler = () => {
        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    // **** Start Place order Request Handler **** // 
    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;

    // --- Webview request --- // 

    const Place_order_view_handling = (event) => {

        let Temp_data = event.nativeEvent.data ; 
        Disable_loading_layout_handler() ; 
        set_webview_layout(true) ; 

        try{
 
            Temp_data = JSON.parse(Temp_data) ; 


            if (Temp_data.Status == "Place_order"){

                Disable_loading_layout_handler() ; 
                
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                }));

                navigation.navigate("Home") ; 
                
                ToastAndroid.show("Order place successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;
                
            }
            else{
                Disable_loading_layout_handler() ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // --- Button handler --- // 
    const Place_order_Handler = async () => {
           
        Set_loading_layout_handler() ;

        try {

            let Day = new Date().getDate() ; 
            let Month = new Date().getMonth() + 1;
            let Year = new Date().getFullYear() ; 
            let Date_information = Day + "-" + Month + "-" + Year; 
            
            let Place_order_data = {
                "Check_status": "Place_order", 
                "Order_total": cart_total, 
                "Order_product_data": product_data, 
                "Order_payment_method": payment_method,
                "Table_name": Table_name,
                "Mobile_number": "6354757251", 
                "Order_address": {
                    "Username": Username, 
                    "Street_address": street_address, 
                    "Area": area, 
                    "Landmark": landmark, 
                    "Pincode": pincode
                }, 
                "Order_date": Date_information, 
                "Mobile_number": mobile_number
            } ; 

            
            // --- Set Web view request --- // 
            set_web_view_url('') ; 
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Place_order_data) ;

            set_web_view_url(web_url) ; 
        

        } catch {
            
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Error in placing order", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Stop Place order Request Handler **** // 
    
    // --- Layout --- // 
    
    if (loadFontValue){
        return(

            <View style={BillLayoutStyle.BillLayoutScreen}>
            
                <StatusBar
                    backgroundColor={navigation_bar_color}
                />

                {loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}

                {!webview_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {webview_value}
                            source={{uri:web_view_url}}
                            onMessage={Place_order_view_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                <View style={BillLayoutStyle.BackImageContainer}>
                
                    <Pressable style={[BillLayoutStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress={() => navigation.goBack()}>
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={BillLayoutStyle.BackImage}
                        />
                    
                        <Text allowFontScaling={false} style={BillLayoutStyle.BackText}>Your Order</Text>
                    
                    </Pressable>
            
                </View>

                <ScrollView>
                        
                    {/* Username and Price information layout */}

                    <View style={BillLayoutStyle.PriceLayout}>
                        
                        {/* Username information  */}

                        <View style={[BillLayoutStyle.BillDataLayout, {borderBottomColor: "#dedede", borderBottomWidth : 1}]}>
                            <Text allowFontScaling={false} style={BillLayoutStyle.UsernameTitle}>Username : </Text>
                            <Text allowFontScaling={false} style={BillLayoutStyle.UsernameData}>{Username}</Text>
                        </View>
                        
                        {/* Price information */}

                        <View style={[BillLayoutStyle.BillDataLayout]}>
                            <Text allowFontScaling={false} style={[BillLayoutStyle.UsernameTitle, {color: "#cd3838"}]}>Subtotal: </Text>
                            <Text allowFontScaling={false} style={[BillLayoutStyle.UsernameData, 
                                {marginLeft: "auto", marginTop: "auto", marginBottom:"auto", fontSize: 20}]}>₹{cart_total}/-</Text>
                        </View>
                    
                    </View>
                    
                    {/* Product data list  */}
                    
                    {product_data.map((element, index) => {
                        return(

                            <View style={[BillLayoutStyle.PopularProductLayout]}
                                key={index}>

                                <Pressable style={BillLayoutStyle.PopularProductPressableLayout}
                                    android_ripple={{color:colorCode.HomeScreenColor.ProductLayoutRippler}}
                                    > 
                                    
                                    <Pressable style={BillLayoutStyle.PressableImageLayout}>
                                        
                                        <Image
                                            source={{uri:element.Product_image1}}
                                            style = {BillLayoutStyle.PopularProductImage}
                                        />

                                    </Pressable>
                
                                    <View style={BillLayoutStyle.ProductInfoData}>

                                        {/* Product information  */}
                                        <Text allowFontScaling={false} style={BillLayoutStyle.ProductInformation}>{element.Product_information}</Text>
                                            
                                        {/* Weight and Size information layout   */}

                                        <View style={BillLayoutStyle.WeightSizeLayout}>
                                    
                                            {/* Weight information  */}

                                            <View style={BillLayoutStyle.WeightLayout}>

                                                <Text allowFontScaling={false} style={BillLayoutStyle.WeightSizeTitle}>Weight |</Text>

                                                <Text allowFontScaling={false} style={BillLayoutStyle.WeightSizeInformation}>{element.Product_weight}</Text>
                                            
                                            </View>
                                            
                                            {/* Size information */}

                                            <View style={[BillLayoutStyle.SizeLayout]}>
                                                
                                                <Text allowFontScaling={false} style={BillLayoutStyle.WeightSizeTitle}>Size |</Text>
                                            
                                                <Text allowFontScaling={false} style={BillLayoutStyle.WeightSizeInformation}>{element.Product_size}</Text>
                                            
                                            </View>

                                        </View>

                                        {/* Price information layout  */}
                                        
                                        <View style={BillLayoutStyle.PriceInformationLayout}>
                                            
                                            <Text allowFontScaling={false} style={[BillLayoutStyle.WeightLayout, 
                                                {marginRight: 0, 
                                                fontFamily: "Mukta",
                                                fontSize: 18}]}>Price</Text>

                                            <Text allowFontScaling={false} style={BillLayoutStyle.RetailPrice}>₹{element.Product_retail_price}/-</Text>
                                            
                                            <Text allowFontScaling={false} style={BillLayoutStyle.DiscountPrice}>₹{element.Product_discount_price}/-</Text>    
                                        
                                        </View>


                                    </View>

                                </Pressable>

                            </View> 
                        )
                    })}

                    {/* Mobile number information  */}

                    <View style={[BillLayoutStyle.PriceLayout, 
                        {paddingTop: 12, marginTop: 6, paddingBottom: 12, paddingLeft: 12, paddingRight: 12, marginBottom: 8}]}>

                        <Text allowFontScaling={false} style={[BillLayoutStyle.UsernameTitle]}>Mobile number</Text>
                        <Text allowFontScaling={false} style={[BillLayoutStyle.PaymentMethodInformation, {marginTop: 10}]}>{mobile_number}</Text>
                        
                    </View>

                    {/* Payment method information  */}

                    <View style={[BillLayoutStyle.PriceLayout, 
                        {paddingTop: 12, marginTop: 6, paddingBottom: 12, paddingLeft: 12, paddingRight: 12}]}>

                        <Text allowFontScaling={false} style={[BillLayoutStyle.UsernameTitle]}>Payment method</Text>
                        <Text allowFontScaling={false} style={[BillLayoutStyle.PaymentMethodInformation, {marginTop: 10}]}>{payment_method}</Text>
                        
                    </View>

                    {/* Address information layout */}

                    <View style={[BillLayoutStyle.PriceLayout, 
                        {paddingTop:12, marginTop:12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12}]}>
                        
                        <Text allowFontScaling={false} style={BillLayoutStyle.UsernameTitle}>Delivery Address:</Text>
                        <Text allowFontScaling={false} style={BillLayoutStyle.AddressInformation}>{street_address}</Text>
                        <Text allowFontScaling={false} style={BillLayoutStyle.AddressInformation}>{area}, {landmark}</Text>
                        <Text allowFontScaling={false} style={BillLayoutStyle.AddressInformation}>Pincode = {pincode}</Text>

                    </View>


                    {/* Place order button  */}

                    <Pressable style={BillLayoutStyle.PlaceOrderButton}
                        android_ripple={{color: colorCode.SignupColorCode.ButtonRippleColor}}
                        onPress = {Place_order_Handler}>

                        <Text allowFontScaling={false} style={BillLayoutStyle.PlaceOrderButtonText}>Place order</Text>
                    
                    </Pressable>

                </ScrollView>

            </View>
        
        )
    }
}

const BillLayoutStyle = StyleSheet.create({
    BillLayoutScreen:{
        backgroundColor: "#ebebeb", 
        height: '100%',
        width: '100%'
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
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    }, 

    PriceLayout:{
        width: '96%',
        backgroundColor: "white", 
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 10, 
        borderRadius: 5,
        marginTop: 15, 
    }, 

    BillDataLayout:{
        display: "flex",
        flexDirection: "row", 
        paddingTop: 15, 
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15, 
        textAlign: "center",
        justifyContent: "flex-start"
    }, 

    UsernameTitle:{
        fontFamily: "Ubuntu",
        fontSize: 18, 
        marginTop: "auto",
        marginBottom: "auto", 
    }, 
    
    UsernameData:{
        fontFamily: "Sans", 
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    PaymentMethodInformation:{
        fontFamily: "Sans", 
        fontSize: 18, 
        marginTop: 10
    },

    PopularProductLayout:{
        borderRadius: 10,
        height: 185,
        width: '96%',
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
        marginTop: 10
    },
    
    RetailPrice:{
        fontFamily: "Ubuntu",
        fontSize: 17,
        color: '#fb6969', 
        textDecorationLine: 'line-through',
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 12
    },
    
    DiscountPrice:{
        fontFamily: "Ubuntu",
        fontSize: 17,
        color: "#696969",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 8
    },
    
    AddressInformation:{
        fontFamily: "Sans",
        fontSize: 18, 
        marginTop: 10, 
    }, 

    PlaceOrderButton:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor  , 
        width: '96%', 
        marginLeft: "auto",
        marginRight: "auto", 
        marginTop: 15, 
        alignItems: "center" , 
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 8, 
        marginBottom: 10
    }, 

    PlaceOrderButtonText:{
        fontFamily: "Ubuntu", 
        fontSize: 18,
        color: "#424242",
    }
})
