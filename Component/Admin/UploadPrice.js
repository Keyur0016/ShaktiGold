import { View, StyleSheet, StatusBar, Text, TextInput,
ActivityIndicator, Pressable, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import * as Font from 'expo-font' ; 
import * as Notifications from 'expo-notifications';
import {WebView} from 'react-native-webview' ; 


// === Set Notification attributes === // 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function UploadPrice({navigation}){
    
    // === Load font === // 

    const [loadFontValue, setLoadFontValue] = useState(false); 
       
    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ; 

    }, []);

    // === Input focus attributes === // 

    const [price1Border, set_price1Border] = useState(false) ; 
    const [price2Border, set_price2Border] = useState(false) ; 
    const [price3Border, set_price3Border] = useState(false) ; 
    const [price4Border, set_price4Border] = useState(false) ;    
    const [price5Border, set_price5Border] = useState(false) ;                                          

    // === Input value === // 

    const [price1, set_price1] = useState('') ; 
    const [price2, set_price2] = useState('') ; 
    const [price3, set_price3] = useState('') ; 
    const [price4, set_price4] = useState('') ; 
    const [price5, set_price5] = useState('') ; 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // === Input focus handler === // 

    const OnFocusHandle = (x) => {

        set_price1Border(false) ; 
        set_price2Border(false) ; 
        set_price3Border(false) ; 
        set_price4Border(false) ; 
        set_price4Border(false) ; 

        if (x == 0){
            set_price5Border(true) ; 
        }
        else if(x == 4){
            set_price1Border(true) ; 
        }
        else if (x == 1){
            set_price2Border(true) ; 
        }
        else if (x == 2){
            set_price3Border(true) ; 
        }
        else{
            set_price4Border(true) ; 
        }
    }

    // *** Start Fetch notification id request handler *** //

    const [fetch_notification_layout, set_fetch_notification_layout] = useState(true) ; 
    const [fetch_notification_web_url, set_fetch_notification_web_url] = useState('') ;  
    const [fetch_notification_value, set_fetch_notification_value] = useState(0) ; 

    const Fetch_notification_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        setActivityIndicator(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Temp_notification_data = Temp_data.Notification ;
            let Temp_info = [] ; 
            
            Temp_notification_data.map((element)=>{
                
                Temp_info.push(element.Notification_id) ; 
            }) ; 

            let Notification_body = "Today \n24K gold price = "+price5+"\n22K price = "+price1+"\n916 Price = "+price3+"\nSilver price = "+price4 ;

            for(let i = 0; i<Temp_info.length; i++){
                sendPushNotification(Temp_info[i], Notification_body); 
            }
            
            navigation.goBack() ; 

        }catch{

        }
    }
    
    // *** Stop Fetch notification id request handler *** // 


    // *** Start Insert Price Request Handler *** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Gold_price_STATUS = Temp_data.Status; 

            if (Gold_price_STATUS == "Update price"){
                
                ToastAndroid.show("Update Price successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                
                navigation.goBack() ;                    

            }
            else if (Gold_price_STATUS == "Insert price"){
                
                ToastAndroid.show("Insert price successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                let Fetch_notification_data = {
                    'Check_status': "Fetch_notification_id"
                } ; 

                // Set URL to webview 
                set_fetch_notification_web_url("") ;
                set_fetch_notification_layout(false) ; 
                set_fetch_notification_value( fetch_notification_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_notification_data) ; 
                set_fetch_notification_web_url(web_url) ; 

                
            }
                

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            setActivityIndicator(false) ; 
        }


    }

    const PriceInsert_Handler = async () => {
        const date = new Date(); 
        let day = date.getDate() ;
        let month = date.getMonth() + 1 ; 
        let Year = date.getFullYear() ; 

        let Today_date = day + '-' + month + '-' + Year ; 

        if (price5 == ""){
            ToastAndroid.show("Enter 24K gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;  
        } 
        else if (price1 == ""){

            ToastAndroid.show("Enter 22K gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (price2 == ""){

            ToastAndroid.show("Enter 18K gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (price3 == ""){

            ToastAndroid.show("Enter 916 gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (price4 == ""){

            ToastAndroid.show("Enter Silver price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{

            
            try {
                
                setActivityIndicator(true) ; 

                let Gold_price_data = {
                    "Check_status": "Insert_gold_price",
                    'Date': Today_date, 
                    "22K_price": price1, 
                    "18K_price": price2, 
                    "916_price": price3, 
                    "Silver_price": price4, 
                    "24K_price": price5
                }; 
                
                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Gold_price_data) ; 
                
                set_web_view_url(web_url) ; 

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }

    }

    // *** Close Insert Price Request Handler *** // 

    // === Layout === // 

    if (loadFontValue){

        return(
            <View style={UpdatePriceStyle.UpdatePriceScreen}>
                
                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />

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
                            onMessage={Message_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {!fetch_notification_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {fetch_notification_value}
                            source={{uri:fetch_notification_web_url}}
                            onMessage={Fetch_notification_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* Update Price Title   */}
                <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceTitle}>Insert Gold/Sliver Price</Text>
     
                <View style={UpdatePriceStyle.InputLayout}>
                    
                    {/* 24K gold price input  */}
                    
                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price5Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="24K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price5}
                        cursorColor="black"
                        onChangeText={(value) => set_price5(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {/* 22K gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price1Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="22K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price1}
                        cursorColor="black"
                        onChangeText={(value) => set_price1(value)}
                        onFocus = {() => OnFocusHandle(4)}
                    />

                    {/* 18K gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price2Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="18K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price2}
                        cursorColor="black"
                        onChangeText={(value) => set_price2(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    />
                
                    {/* 916 gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price3Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="916 gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price3}
                        cursorColor="black"
                        onChangeText={(value) => set_price3(value)}
                        onFocus = {() => OnFocusHandle(2)}
                    />
                    
                    {/* Silver price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price4Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Silver price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price4}
                        cursorColor="black"
                        onChangeText={(value) => set_price4(value)}
                        onFocus = {() => OnFocusHandle(3)}
                    />
                    
                    {activityIndicator ? 
                    <View style={[UpdatePriceStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[UpdatePriceStyle.SendCode_Layout]}
                        android_ripple={{color:'#ffd100',foreground:false}}
                        onPress={PriceInsert_Handler}>
                        <Text allowFontScaling={false} style={UpdatePriceStyle.SendCode_Text}>Upload price</Text>
                    </Pressable>
                    }

                </View>
          
            </View>
        )
    }
}

// === Send Notification function === // 

async function sendPushNotification(expoPushToken, notification_body) {
    const message = {
        to: expoPushToken,
        priority: "normal",
        notification: {
            title: " 🔶🔷 Shree Shakti Gold Jewellers 🔶🔷 ",
            body: notification_body,
            data: { Data: "Status" },
        }
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
            "key=AAAA6GxAfPM:APA91bGxKuNUheg83H4kLEhWYiEfid0aL_3En5nThJTNlugbTPh6oi5vtDpgS_1O5cy52DlSmeUtfHvjBzj1JvmC7VSWWQJFdecrRGhpozrb5h6KxSCh79eYlVWdzk0cyTNhvhilBGgB",
        },
        body: JSON.stringify(message)
    });
}

const UpdatePriceStyle = StyleSheet.create({
    UpdatePriceScreen: {
        backgroundColor: 'white', 
        height: '100%', 
        width: '100%'
    }, 
    UpdatePriceTitle: {
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'4%',
        marginTop:'5%'
    }, 
    InputLayout: {
        width: '94%',
        marginLeft:'auto',
        marginRight:'auto', 
        marginTop: '3%'
    }, 
    InputStyle:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor,
        width: '100%', 
        fontFamily: 'Sans', 
        fontSize: 18,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginTop: 8,
        marginBottom: 8
    },
    SendCode_Layout:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor,
        borderRadius: 5, 
        marginTop:15, 
        alignItems:'center',
        paddingTop:6, 
        paddingBottom:6
    }, 
    SendCode_Text:{
        fontFamily:"Mukta",
        fontSize:18, 
        color:'black'
    }    
})