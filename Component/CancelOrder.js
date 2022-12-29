import { View, StyleSheet, TextInput, Pressable, Text, Image, StatusBar, ActivityIndicator, ToastAndroid, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL';
import * as colorCode from './Information/ColorCode' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {WebView} from 'react-native-webview' ; 

export default function CancelOrder({navigation, route}){

    const {Table_name} = route.params ; 

    // == Cancel order reason 
    const [cancel_order_reason, set_cancel_order_reason] = useState('') ; 
    const [cancel_order_border, set_cancel_order_border] = useState(false) ; 

    // == ActivityIndicator attributes
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // == Checkout Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

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
    }); 

    // == Back Handler 
    const Back_Handler = () => {
        set_webview_layout(true);
        navigation.goBack() ; 
    }

    // Focus Handler 
    const OnFocusHandle = (x) => {
       set_cancel_order_border(true) ;    
    }

    // **** Start Cancel order Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        setActivityIndicator(false) ; 
        set_webview_layout(true) ; 

        try{
            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Cancel_order"){
                 
                ToastAndroid.show("Your order cancel successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                navigation.goBack() ; 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }
    
    const Cancel_order = async () => {
        
        
        if (cancel_order_reason == ""){
            ToastAndroid.show("Enter order cancel reason", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{
            setActivityIndicator(true) ;
            try{
                
                // == User mobile number 
                const User_mobile_number = await AsyncStorage.getItem("Mobilenumber") ; 

                // == Make cancel order data
                const Day_object = new Date(); 
                const Day = Day_object.getDate() ; 
                const Month = Day_object.getMonth() + 1; 
                const Year = Day_object.getFullYear() ; 
                const Hour = Day_object.getHours();
                const Minute = Day_object.getMinutes() ; 
                const Second = Day_object.getSeconds() ;

                const Cancel_order_date = Day + "-" + Month + "-" + Year + "-" + Hour + "-" + Minute + "-" + Second ; 

                let Cancel_order_data = {
                    "Table_name": Table_name, 
                    "Payment_method": route.params.Order.Data3, 
                    "Payment_id": route.params.Order.Data4, 
                    "Order_id": route.params.Order.Data1,
                    "Cancel_reason": cancel_order_reason, 
                    "Cancel_date": Cancel_order_date, 
                    "Check_status": "Cancel_order", 
                    "Mobile_number": User_mobile_number,
                    "Username": route.params.Order.Data9,
                    "Order_date": route.params.Order.Data5,
                    "Order_total": route.params.Order.Data8 
                } ; 

                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Cancel_order_data) ; 
                console.log(web_url);
                set_web_view_url(web_url) ;

            }catch{     
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }


    }

    // **** Stop Cancel order Request Handler **** // 

    if(loadFontValue){
        return(
            <View style={CancelOrderStyle.CancelOrderScreen}>

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
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
                                onMessage={Message_handling}
                            ></WebView>
                    </View>
                </>:<></>}
                
                {/* == Back Option Container ==  */}

                <View style={CancelOrderStyle.BackImageContainer}>
                
                    <Pressable style={[CancelOrderStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress={Back_Handler}>
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={CancelOrderStyle.BackImage}
                        />
                    
                        <Text allowFontScaling={false} style={CancelOrderStyle.BackText}>
                            Cancel order </Text>
                    
                    </Pressable>
            
                </View>

                {/* Mobilenumber input  */}

                <TextInput style={[CancelOrderStyle.InputStyle, {borderColor: cancel_order_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                    placeholder="Enter cancel order reason"
                    placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                    keyboardType="default"
                    value={cancel_order_reason}
                    cursorColor="black"
                    onChangeText={(value) => set_cancel_order_reason(value)}
                    onFocus = {() => OnFocusHandle(0)}
                    />

                {activityIndicator ? <>
                    <View style={[CancelOrderStyle.SendCode_Layout]}> 
                        
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />

                    </View>
                    </>:<>
                    <Pressable style={[CancelOrderStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor,foreground:false}}
                        onPress={Cancel_order}>
                        <Text allowFontScaling={false} style={CancelOrderStyle.SendCode_Text}>Cancel order</Text>
                    </Pressable></>
                }

            </View>
        )
    }
}

const CancelOrderStyle = StyleSheet.create({
    CancelOrderScreen:{
        backgroundColor:"white", 
        height: "100%", 
        width: "100%"
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

    InputStyle:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor,
        width: '98%', 
        fontFamily: 'Sans', 
        fontSize: 18,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginTop: 15,
        marginBottom: 8, 
        marginLeft: "auto", 
        marginRight:"auto"
    }, 

    SendCode_Layout:{
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        borderRadius: 5, 
        marginTop:15, 
        alignItems:'center',
        paddingTop:6, 
        paddingBottom:6, 
        width: "96%", 
        marginLeft:"auto", 
        marginRight:"auto"
    }, 
    
    SendCode_Text:{
        fontFamily:"Mukta",
        fontSize:19, 
        color:'white'
    }
})