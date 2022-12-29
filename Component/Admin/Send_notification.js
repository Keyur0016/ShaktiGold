import { View, StyleSheet, StatusBar, Text, ActivityIndicator, Pressable, 
    TextInput, ToastAndroid, Alert } from "react-native";
import * as colorCode from '../Information/ColorCode'; 
import * as Font from 'expo-font'; 
import * as URL from '../Information/RequestURL'; 
import { useState, useEffect } from "react";
import BlurViewLayout from "../OtherComponent/BlurViewLayout";
import * as Notifications from 'expo-notifications';
import {WebView} from 'react-native-webview' ; 

// === Set Notification object === // 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Send_notification({navigation}){

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

    const [ notificationBorder, set_notificationBorder] = useState(false) ; 

    // === Input value === //

    const [ notification, set_notification] = useState(''); 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // == Loading Layout value 

    const [loading_layout, set_loading_layout] = useState(false); 

    // == Disable Navigation bar color

    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 
    

    const Set_loading_layout_handler = () => {

        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }


    const Disable_loading_layout_handler = () => {

        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    // ==== Input focus handler ==== // 

    const OnFocusHandle = (x) => {

        set_notificationBorder(true); 
    }
    
    // **** Start Fetch notification id Request Handler **** // 

    const [fetch_notification_layout, set_fetch_notification_layout] = useState(true) ; 
    const [fetch_notification_web_url, set_fetch_notification_web_url] = useState('') ;  
    const [fetch_notification_value, set_fetch_notification_value] = useState(0) ; 

    const Fetch_notification_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        Disable_loading_layout_handler() ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Temp_notification_data = Temp_data.Notification ;
            let Temp_info = [] ; 
            
            Temp_notification_data.map((element)=>{
                
                Temp_info.push(element.Notification_id) ; 
            }) ; 


            for(let i = 0; i<Temp_info.length; i++){
                sendPushNotification(Temp_info[i], notification); 
            }
            
            navigation.goBack() ; 

        }catch{

        }
    }

    const Send_notification_function = async () => {

        Set_loading_layout_handler() ;

        try{

            let Fetch_notification_data = {
                'Check_status': "Fetch_notification_id"
            } ; 

            // Set URL to webview 
            set_fetch_notification_web_url("") ;
            set_fetch_notification_layout(false) ; 
            set_fetch_notification_value( fetch_notification_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_notification_data) ; 
            set_fetch_notification_web_url(web_url) ; 


        }catch{
            Disable_loading_layout_handler() ;
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

    }

    const Notification_send_handler = async () => {

        setActivityIndicator(true) ; 

        if (notification == ""){

            ToastAndroid.show("Enter Notification value", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
            
            Alert.alert(
                "Notification",
                "Are you sure you want to send this notification ? \nNotification = " + notification, 
                [
                    {
                        text: "Yes", 
                        onPress: () => Send_notification_function() 
                    }, 
                    {
                        text: "No"
                    }
                ]
            )
             
        }

        setActivityIndicator(false) ; 
    }

    // **** Close Fetch notification id Request Handler **** // 

    // === Layout === // 

    if (loadFontValue){

        return(
            <View style={NotificationStyle.AdminScreen}>
                  
                <StatusBar
                   backgroundColor={navigation_bar_color}
                />

                {loading_layout?<><BlurViewLayout>
                </BlurViewLayout></>:<></>}

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
    
                <Text allowFontScaling={false} style={NotificationStyle.AdminTitle}>Send Notification</Text>

                {/* Input Layout  */}

                <View style={NotificationStyle.InputLayout}>
                    
                    <TextInput allowFontScaling={false} style={[NotificationStyle.InputStyle, {borderColor: notificationBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Enter Notification value"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={notification}
                        cursorColor="black"
                        onChangeText={(value) => set_notification(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {activityIndicator ? 
                    <View style={[NotificationStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[NotificationStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={Notification_send_handler}>
                        <Text allowFontScaling={false} style={NotificationStyle.SendCode_Text}>Push notification</Text>
                    </Pressable>
                    }
 
                </View>
    
            </View>
        )
    }
}

// ==== Notification sender ==== // 

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
      body: JSON.stringify(message),
    });
}

const NotificationStyle = StyleSheet.create({
    AdminScreen : {
        backgroundColor: 'white', 
        height: '100%',
        width: '100%'
    }, 
    AdminTitle: {
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'4%',
        marginTop:'5%'
    },
    InputLayout:{
        width: '94%',
        marginLeft:'auto',
        marginRight:'auto', 
        marginTop: '1%'
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
    },
})