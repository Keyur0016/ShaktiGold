import { View, StyleSheet, StatusBar, Image, Text, Pressable, 
    ToastAndroid, Alert, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from './Information/ColorCode' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';
import * as URL from './Information/RequestURL' ; 
import BlurViewLayout from "./OtherComponent/BlurViewLayout";
import { CommonActions } from '@react-navigation/native';

export default function PaymentOption({navigation, route}){

    // == Table name 
    const {Table_name} = route.params ; 

    // ==== Load font ==== // 
    const [loadFontValue, setLoadFontValue] = useState(false);

    // === Payment page layout === // 
    const [payment_page, set_payment_page] = useState(true) ; 

    // === Payment page url === // 
    const [final_payment_url, set_final_payment_url] = useState('') ;  
    const [cancel_payment_url, set_cancel_payment_url] = useState('') ; 
    const [payment_page_value, set_payment_page_value] = useState(0) ; 

    // == Loading Layout 
    const [loading_layout, set_loading_layout] = useState(false) ; 

    // == Disable Navigation bar color
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 
    
    // **** Start Cancel Payment Request Handler ***** // 

    const [cancel_payment_layout, set_cancel_payment_layout] = useState(true) ; 
    const [cancel_payment_web_url, set_cancel_payment_web_url] = useState('') ;
    const [cancel_payment_value, set_cancel_payment_value] = useState(0) ; 

    const Payment_cancel_webview_handling = (event) => {
        
        let Temp_data = event.nativeEvent.data ;
        set_cancel_payment_layout(true) ;  
        Disable_loading_layout_handler() ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Payment_fail"){

                ToastAndroid.show("Payment failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                }));

                navigation.navigate("Home") ; 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Stop Cancel Payment Request Handler **** // 

    const Payment_cancel_back_handler = () => {

        // --- Set cancel payment webview layout --- // 
        set_payment_page(true) ; 

        set_cancel_payment_layout(false) ; 
        set_cancel_payment_web_url('') ; 
        set_cancel_payment_value(cancel_payment_value + 1) ; 

        set_cancel_payment_web_url(cancel_payment_url) ; 

        Set_loading_layout_handler() ; 
    }

    const backAction = () => {

        Alert.alert("Cancel payment", "Are you sure you want to cancel payment ?", [
            {
                text: "Yes",
                onPress: () => Payment_cancel_back_handler(),
                style: "cancel"
            },
            { text: "No", onPress: () => null }
        ]);

        return true;
    };
    

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

    }, []);

    useEffect(() => {

        if (payment_page == false){
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
        } 

    }, [payment_page])

    // ***** Start Online order data inserter Request Handler ***** //

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;  

    const Online_order_place_handling = (event) => {
       
        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 

        try {
            
            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Place_order"){
                 
                // Update Payment page related url 

                set_final_payment_url(Temp_data.Payment_url) ; 
                set_cancel_payment_url(Temp_data.Payment_cancel_url) ; 
                set_payment_page_value(payment_page_value + 1); 
                set_payment_page(false) ; 
                console.log(final_payment_url);
            }

        } catch{
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    const Payment_method_selector = async (payment_method) => {

        let Order_data = await AsyncStorage.getItem("Order"); 
        Order_data = JSON.parse(Order_data) ;
        Order_data["Payment_method"] = payment_method ; 

        await AsyncStorage.removeItem("Order") ; 
        await AsyncStorage.setItem("Order", JSON.stringify(Order_data)) ;

        // === Fetch user mobile number === // 
        let Mobile_number = await AsyncStorage.getItem("Mobilenumber") ; 

        if (payment_method == "Cash on delivery"){

            navigation.navigate("BillLayout", {"Table_name":Table_name}) ; 
        }
        else{

             try{
                
                Set_loading_layout_handler() ; 

                // Fetch today date 
                let Day = new Date().getDate() ; 
                let Month = new Date().getMonth() + 1;
                let Year = new Date().getFullYear() ; 
                let Date_information = Day + "-" + Month + "-" + Year; 
                
                let Place_Order_data = {
                    "Check_status": "Place_order", 
                    "Order_total": Order_data.Subtotal, 
                    "Order_product_data": [...Order_data.Product], 
                    "Order_payment_method": "Payment pending",
                    "Table_name": Table_name,
                    "Mobile_number": Mobile_number, 
                    "Order_address": {
                        "Username": Order_data.Address.Username, 
                        "Street_address": Order_data.Address.Street_address, 
                        "Area": Order_data.Address.Area, 
                        "Landmark": Order_data.Address.Landmark, 
                        "Pincode": Order_data.Address.Pincode
                    }, 
                    "Order_date": Date_information 
                } ;

                // Set URL to webview 

                set_web_view_url('') ; 
                set_webview_value(webview_value+ 1) ; 
                set_webview_layout(false) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Place_Order_data) ; 
                set_web_view_url(web_url) ; 
                
            }catch{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

    }
    
    // ***** Stop Online order data inserter Request Handler ***** // 


    // **** Start Payment page success and Payment page cancel Request Handler **** //
    
    const Payment_success_cancel_handler = (event) => {
        let Temp_data = event.nativeEvent.data ; 

        try{
            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Payment_fail"){

                ToastAndroid.show("Payment failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                set_payment_page(true) ; 
                BackHandler.removeEventListener("hardwareBackPress", backAction);

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                }));
                navigation.navigate("Home") ; 
            }
            else if (Temp_data.Status == "Payment success"){

                ToastAndroid.show("Payment successful", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                BackHandler.removeEventListener("hardwareBackPress", backAction);
                
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                }));

                navigation.navigate("Home") ; 


            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }
    
    // **** Stop Payment page success and Payment page cancel Request Handler **** //
    
    
    const Back_press_handler = () => {
        navigation.goBack() ; 
    }

    const Set_loading_layout_handler = () => {
        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }

    const Disable_loading_layout_handler = () => {
        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }
    
    const Load_payment_page = () => {
        Disable_loading_layout_handler() ; 
    }

    // === Layout === // 
    
    if (loadFontValue){
        return(

            <View style={PaymentOptionStyle.PaymentOptionScreen}
                renderToHardwareTextureAndroid={true}>
                    
                <StatusBar
                    backgroundColor={navigation_bar_color}
                />

                {loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}

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
                        onMessage={Online_order_place_handling}
                        ></WebView>
                    </View>
                </>:<></>}

                {!cancel_payment_layout?<>
                    <View
                        style={{
                            height: "1%", 
                            width: "1%", 
                            opacity: 0.90
                    }}>
                        <WebView
                        key = {cancel_payment_value}
                        source={{uri:cancel_payment_web_url}}
                        onMessage={Payment_cancel_webview_handling}
                        ></WebView>
                    </View>
                </>:<></>}


                {payment_page?<>

                    {/* Back Image container */}

                    <View style={PaymentOptionStyle.BackImageContainer}>

                        <Pressable style={[PaymentOptionStyle.BackImageContainer, 
                            {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                            onPress = {Back_press_handler}
                            >

                            <Image
                                source={require('../assets/arrow.png')}
                                style={PaymentOptionStyle.BackImage}
                            />

                            <Text allowFontScaling={false} style={PaymentOptionStyle.BackText}>Select Payment Option</Text>
                        
                        </Pressable>
                        
                    </View>

                    {/* Cash on delivery option  */}

                    <Pressable style={PaymentOptionStyle.PaymentOptionLayout}
                        android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                        onPress = {() => Payment_method_selector("Cash on delivery")}>

                        <Image
                            source={require('../assets/Image/CashOnDelivery.png')}
                            style={PaymentOptionStyle.PaymentOptionImage}
                        />
                        <Text allowFontScaling={false} style={PaymentOptionStyle.PaymentOptionText}>Cash on delivery</Text>

                    </Pressable>

                    {/* Make Online payment option  */}

                    <Pressable style={PaymentOptionStyle.PaymentOptionLayout}
                        android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                        onPress = {() => Payment_method_selector("Online payment")}>

                        <Image
                            source={require('../assets/Image/OnlinePayment.png')}
                            style={PaymentOptionStyle.PaymentOptionImage}
                        />
                        <Text allowFontScaling={false} style={PaymentOptionStyle.PaymentOptionText}>Make online payment</Text>

                    </Pressable>
                </>:<>
                    
                    <WebView
                        key = {payment_page_value}
                        source={{ uri: final_payment_url }}
                        onLoadEnd = {() => Load_payment_page() }
                        onMessage = {Payment_success_cancel_handler}
                    />
                    
                </>}



            </View>
        
        )
    }
}

const PaymentOptionStyle = new StyleSheet.create({
    PaymentOptionScreen: {
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

    PaymentOptionLayout:{
        display: "flex", 
        flexDirection: "row", 
        backgroundColor: "white", 
        width: '95%', 
        marginLeft: "auto", 
        marginRight: "auto", 
        elevation: 10,
        shadowColor: "#505050", 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    }, 

    PaymentOptionImage:{
        width: 75, 
        height: 75, 
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    PaymentOptionText:{
        fontFamily: "Ubuntu",
        fontSize: 19, 
        marginTop: "auto", 
        marginBottom: "auto",
        marginLeft: 17
    }

})