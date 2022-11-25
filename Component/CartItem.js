import { View, StyleSheet, StatusBar, Pressable, Text, Image, 
    ScrollView, ToastAndroid, Linking } from "react-native";
import { useEffect, useState } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from './Information/ColorCode'; 
import * as URL from './Information/RequestURL' ; 
import BlurViewLayout from "./OtherComponent/BlurViewLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartItem({navigation, route}){

    // == Table name 
    const {Table_name} = route.params ; 

    // == Cart Product Data 
    const [cart_productData_information, set_cart_productData_information] = useState([]) ; 

    // == Cart SubTotal value 
    const [cart_subtotal, set_cart_subtotal] = useState(0) ; 
    
    // == Check Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false);

    // == Loading Layout 
    const [loading_layout, set_loading_layout] = useState(false) ; 

    // == Disable Navigation bar color
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    // == Cart Subtotal counter 
    const SubTotal_count = () => {
        
        for(let i = 0 ; i<cart_productData_information.length; i++){
            set_cart_subtotal(cart_subtotal + parseInt(cart_productData_information[i]["Product_discount_price"]) ); 
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

        const Load_Cart_ProductData = async () => {

              
            try{
                let Cart_product_url = URL.RequestAPI ; 
                let Cart_product_data = {
                    "Table_name": Table_name,
                    "Check_status": "Fetch_cart_item"
                }; 
                let Cart_product_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Cart_product_data)
                };
    
                let Cart_product_request = await fetch(Cart_product_url, Cart_product_option) ; 
                let Cart_product_response = await Cart_product_request.json() ; 
    
                if (Cart_product_response.Status == "Fetch"){
                
                    set_cart_productData_information([...Cart_product_response.Data]) ;
                    set_cart_subtotal(Cart_product_response.Subtotal) ;    
                }

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }; 
         
        if (Table_name != ""){
            
            Load_Cart_ProductData() ;
        }

    }, []); 


    //  == Open Product image Handler 

    const Open_product_image = (product_url) => {
        Linking.openURL(product_url) ; 
    }

    // == Set Loading Layout 
    const Set_loading_layout_handler = () => {
        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }

    // == Disable Loading Layout 
    const Disable_loading_layout_handler = () => {
        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    // == Delete Product image Handler 
    const Delete_cart_item = async  (product_id, category_id, index) => {
         
        Set_loading_layout_handler() ; 

        try{

            let Delete_cart_product_url = URL.RequestAPI ; 
            let Delete_cart_product_data = {
                "Check_status":"Delete_cart_item", 
                "Table_name":  Table_name, 
                "Product_id": product_id,
                "Category_id": category_id
            }; 
            let Delete_cart_product_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Delete_cart_product_data)
            }; 

            let Delete_cart_product_request = await fetch(Delete_cart_product_url, Delete_cart_product_option) ;
            let Delete_cart_product_response = await Delete_cart_product_request.json() ; 

            if (Delete_cart_product_response.Status == "Delete"){
                
                Disable_loading_layout_handler() ; 

                cart_productData_information.splice(index, 1); 

                set_cart_productData_information(([...cart_productData_information])); 

                SubTotal_count() ; 

                ToastAndroid.show("Delete cart item", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }catch{

            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed") ; 
        }

        Disable_loading_layout_handler() ; 

    }

    // == Proceed to checkout Option 
    const Proceed_To_checkout_option = async () => {

        const Order_data = await AsyncStorage.getItem("Order") ; 
        
        if (Order_data == null){

            let Proceed_Order_data = {"Subtotal":cart_subtotal, "Product":cart_productData_information}; 
            Proceed_Order_data = JSON.stringify(Proceed_Order_data); 

            await AsyncStorage.setItem("Order", Proceed_Order_data) ; 
        }
        else{
           
            await AsyncStorage.removeItem("Order") ; 

            let Proceed_Order_data = {"Subtotal":cart_subtotal, "Product":cart_productData_information}; 
            Proceed_Order_data = JSON.stringify(Proceed_Order_data); 

            await AsyncStorage.setItem("Order", Proceed_Order_data) ; 

        }
        
        navigation.navigate("SelectAddress", {"Table_name":Table_name}) ; 
        
    }

    // == Cart Empty Handler 
    const Cart_empty_Handler = () => {
        navigation.navigate("Home") ; 
    }

    // == Back Handler 
    const Back_Handler = () => {
        navigation.goBack() ; 
    }

    if ( loadFontValue ){
        return(
            <View style={CartItemStyle.CartItemScreen}>

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />

                {/* == Loading layout ==  */}

                {loading_layout?<>
                    <BlurViewLayout></BlurViewLayout>
                </>:<></>}

                {/* == Back Option Container ==  */}

                <View style={CartItemStyle.BackImageContainer}>
                
                    <Pressable style={[CartItemStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress={Back_Handler}>
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={CartItemStyle.BackImage}
                        />
                    
                        <Text style={CartItemStyle.BackText}>
                            {cart_productData_information.length == 0?"Empty cart":"Your cart"}</Text>
                    
                    </Pressable>
            
                </View>
                
                {cart_productData_information.length > 0?<>

                    {/* == SubTotal price information == */}

                    <View style={CartItemStyle.SubTotalLayout}>

                        <Text style={CartItemStyle.SubTotalTitle}>Subtotal:</Text>

                        <Text style={CartItemStyle.SubTotalPrice}>₹{cart_subtotal}/-</Text>
                    
                    </View> 

                    {/* == Proceed to Buy Option == */}

                    <Pressable style={CartItemStyle.ProceedToBuy}
                        android_ripple={{color: colorCode.HomeScreenColor.PriceInformationTitleColor}}
                        onPress = {() => Proceed_To_checkout_option()}>

                        <Text style={CartItemStyle.ProceedToBuyText}>Proceed to Buy ({cart_productData_information.length} Items)</Text>
                    
                    </Pressable>
                    
                    {/* == Cart Product Data information ==  */}

                    <View style={CartItemStyle.PopularProductMainLayout}>
                        
                        <ScrollView showsHorizontalScrollIndicator={false}>

                            {cart_productData_information.map((element, index) => {
                                
                                return(
                                    <View style={[CartItemStyle.PopularProductLayout]} 
                                        key={index}>

                                        <Pressable style={CartItemStyle.PopularProductPressableLayout}
                                            android_ripple={{color:colorCode.HomeScreenColor.ProductLayoutRippler}}
                                            onPress={() => Open_particular_product(element) }>

                                            <Pressable style={CartItemStyle.PressableImageLayout}
                                                onPress = {() => Open_product_image(element.Product_image1)}>

                                                <Image
                                                    source={{uri:element.Product_image1}}
                                                    style = {CartItemStyle.PopularProductImage}
                                                />

                                            </Pressable>  
                        
                                            <View style={CartItemStyle.ProductInfoData}>

                                                {/* Product information  */}
                                                <Text style={CartItemStyle.ProductInformation}>{element.Product_information}</Text>
                                                    
                                                {/* Weight and Size information layout   */}

                                                <View style={CartItemStyle.WeightSizeLayout}>
                                            
                                                    {/* Weight information  */}

                                                    <View style={CartItemStyle.WeightLayout}>

                                                        <Text style={CartItemStyle.WeightSizeTitle}>Weight |</Text>

                                                        <Text style={CartItemStyle.WeightSizeInformation}>{element.Product_weight}</Text>
                                                    
                                                    </View>
                                                    
                                                    {/* Size information */}

                                                    <View style={[CartItemStyle.SizeLayout]}>
                                                        
                                                        <Text style={CartItemStyle.WeightSizeTitle}>Size |</Text>
                                                    
                                                        <Text style={CartItemStyle.WeightSizeInformation}>{element.Product_size}</Text>
                                                    
                                                    </View>

                                                </View>

                                                {/* Price information layout  */}
                                                
                                                <View style={CartItemStyle.PriceInformationLayout}>
                                                    
                                                    <Text style={[CartItemStyle.WeightLayout, 
                                                        {marginRight: 0, 
                                                        fontFamily: "Mukta",
                                                        fontSize: 18}]}>Price</Text>

                                                    <Text style={CartItemStyle.RetailPrice}>₹{element.Product_retail_price}</Text>
                                                    
                                                    <Text style={CartItemStyle.DiscountPrice}>₹{element.Product_discount_price}</Text>    
                                                
                                                </View>

                                                {/* Delete Option Layout */}

                                                <Pressable style={CartItemStyle.DeleteOptionLayout}
                                                    android_ripple={{color: '#ff6565'}}
                                                    onPress = {() => Delete_cart_item(element.Product_id, element.Category_id, index)}>
                                                    <Text style={CartItemStyle.DeleteOptionText}>Delete</Text>
                                                </Pressable>

                                            </View>

                                        </Pressable>

                                    </View> 
                                )
                            })}

                        </ScrollView>

                    </View> 

                </>:<>
                    <View style={CartItemStyle.CartEmptyLayout}>

                        <Pressable style={CartItemStyle.BackToHomeLayout}
                            android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                            onPress={Cart_empty_Handler}>
                            
                            <Text style={{fontFamily: "Ubuntu", fontSize:18, color: 'white'}}>Back to Home</Text>
                        
                        </Pressable>

                        <Image
                            source={require('../assets/Image/Empty_cart.png')}
                            style={{height: '70%', width: '85%', resizeMode: "contain", 
                            marginLeft: "auto", marginRight: "auto" }}
                        />


                    </View>
                </>}

            </View>
        )
    }
}

const CartItemStyle = StyleSheet.create({
    CartItemScreen: {
        backgroundColor: '#ebebeb',
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
        fontSize: 19,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    },

    SubTotalLayout:{
        display: "flex",
        flexDirection: "row",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10,
        paddingRight: 10
    }, 

    SubTotalTitle:{
        fontFamily: 'Mukta', 
        fontSize: 22,
        color: "#424242", 
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    SubTotalPrice:{
        fontFamily: 'Ubuntu', 
        fontSize: 21, 
        marginTop: "auto",
        marginBottom: "auto", 
        marginLeft: 10
    }, 

    ProceedToBuy:{
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 6, 
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor, 
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12, 
        borderRadius: 8 
    },

    ProceedToBuyText:{
        fontFamily: "Ubuntu",
        fontSize: 19,
        color: "white"
    },

    PopularProductMainLayout:{
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        height: '91%'
    }, 
    
    PopularProductLayout:{
        borderRadius: 10,
        elevation: 8,
        shadowColor:"#5b5b5b",
        height: 185,
        width: '100%',
        marginTop: 5,
        marginBottom:5
    },
    
    PopularProductPressableLayout:{
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 6,
        paddingBottom: 6,
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

    DeleteOptionLayout:{
        backgroundColor: "#fee0e1", 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10,
        width: '50%',
        borderRadius: 8,
        paddingTop: 1,
        paddingBottom: 1

    }, 

    DeleteOptionText:{
        fontFamily: "Mukta",
        fontSize: 19,
        color: "red"
    }, 

    CartEmptyLayout:{
        height:'100%',
        width: '100%', 
        marginTop: "auto", 
        marginBottom: "auto", 
        paddingTop: 30
    }, 

    BackToHomeLayout:{
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor, 
        width: '95%',
        alignItems: 'center', 
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: "auto",
        marginRight: "auto", 
        marginTop: 20, 
        borderRadius: 8, 
    }
    
}) ; 