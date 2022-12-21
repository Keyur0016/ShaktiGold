import React, {useState, useEffect} from 'react'; 
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, Pressable, 
    ActivityIndicator, Image, ToastAndroid, Platform } from 'react-native'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 
import * as Font from 'expo-font'; 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview'  ; 

// === Set Notification Handler Object === // 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

// ==== Create Notification token ==== //   

async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
            }

            token = (await Notifications.getDevicePushTokenAsync()).data;
            console.log(token);

        } 
        else {
        }

    if (Platform.OS === 'android') {

        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default function Verification({navigation, route}){
    
    // ==== Route attributes ==== // 

    const {Username, Mobilenumber, Password, Code} = route.params;

    // ==== Font load ==== // 

    const [loadFontValue, setLoadFontValue] = useState(false); 
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {

        // Register Push Notification token 
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        
        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ; 

    }, []); 


    // ==== Input value ==== // 

    const [verificationCode, set_verificationCode] = useState(''); 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // ==== Input focus attributes ==== //

    const [verificationBorder, set_verificationBorder] = useState(false) ;

    // ==== Focus Handler ==== // 

    const OnFocusHandle = () => {
        set_verificationBorder(true); 
    }

    // **** Start Verification Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ; 
    const [value, setValue] = useState(0) ; 

    // -- Webview Request -- // 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(false) ; 

        try{
           
            Temp_data = JSON.parse(Temp_data) ; 
            let Signup_response_STATUS = Temp_data.Status;

            if (Signup_response_STATUS == "Insert data"){
                         
                let TableName = Temp_data.Table; 
                
                // === Set Attributes in Local Storage === // 

                // 1. Username
                await AsyncStorage.setItem("Username", Username); 
                
                // 2. Mobilenumber
                await AsyncStorage.setItem("Mobilenumber", Mobilenumber); 
                
                // 3. Table 
                await AsyncStorage.setItem("Table", TableName); 
                
                ToastAndroid.show("Signup successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                
                set_webview_layout(true) ; 

                navigation.navigate("Home") ; 
            }
        
        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        setActivityIndicator(false) ; 
    }

    // -- Signup Handler -- // 

    const Verification_Handler = async () => {

        if (verificationCode == ""){

            ToastAndroid.show("Enter Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (verificationCode != Code){

            ToastAndroid.show("Invalid Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
               
            // --- Webview request --- // 

            let Signup_request_data = {
                "Check_status": "Signup", 
                "Username": Username,
                "Mobilenumber": Mobilenumber,
                "Password": Password, 
                "Notification_id": expoPushToken
            }; 

            setActivityIndicator(true) ; 

            // Set URL to Webview 

            set_web_view_url('') ;
            set_webview_layout(false) ; 
            setValue(value + 1) ;

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Signup_request_data) ; 
            set_web_view_url(web_url) ; 
        }


    }

    // **** Stop Verification Request Handler **** // 
    

    // === Verification Back Handler === // 

    const VerificationBack = () => {

        navigation.navigate("Signup") ; 
    }

    // ==== Layout ==== // 

    if(loadFontValue){
        return(
            <KeyboardAvoidingView style={VerificationStyle.VerificationScreen} >

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />

                {/* Webview Request */}
                {!webview_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                                key={value}
                                source={{uri:web_view_url}}
                                onMessage={Message_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                <View style={VerificationStyle.Back_Title} >

                    {/* Back button Image */}

                    <Pressable style={VerificationStyle.BackImageContainer}
                        android_ripple={{'color':'#b2b2b2'}}
                        onPress={VerificationBack}>

                        <Image 
                            style={VerificationStyle.BackImage}
                            source={require('../../assets/arrow.png')}
                        />

                    </Pressable>

                    {/* Verification Title */}

                    <Text style={VerificationStyle.VerificationTitle}>Verification</Text>
                
                </View>

                {/* Mobile Information  */}

                <Text style={VerificationStyle.MobileInformation}>Mobilenumber: {Mobilenumber}</Text>
            
                {/* Input Layout  */}

                <View style={VerificationStyle.InputLayout}>
                    
                    <TextInput style={[VerificationStyle.InputStyle, {borderColor: verificationBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Verification code"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="numeric"
                        value={verificationCode}
                        cursorColor="black"
                        onChangeText={(value) => set_verificationCode(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {activityIndicator ? 
                    <View style={[VerificationStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[VerificationStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={Verification_Handler}>
                        <Text style={VerificationStyle.SendCode_Text}>Signup</Text>
                    </Pressable>
                    }
 
                </View>

            </KeyboardAvoidingView>
        )
    }
}



const VerificationStyle = StyleSheet.create({
    VerificationScreen: {
        backgroundColor: colorCode.SignupColorCode.ScreenColor, 
        height: '100%', 
        width: '100%',
    }, 
    
    VerificationTitle: {
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'2%',
        marginTop: 'auto',
        marginBottom: 'auto'
    }, 

    Back_Title:{
        display:'flex', 
        flexDirection:'row',
        alignItems:'flex-start', 
        marginTop:'5%',
        marginLeft: '1%'
    },
    
    BackImage:{
        height:25,
        width:25,
        backgroundColor:'transparent',
        marginTop: 'auto',
        marginBottom:'auto' 
    }, 
    
    BackImageContainer:{
        marginTop: "auto", 
        marginBottom: "auto",
        padding:10,
    }, 
    
    MobileInformation:{
        fontFamily: "Mukta",
        fontSize: 17, 
        color: colorCode.SignupColorCode.InputPlaceholderColor, 
        marginLeft: '4%', 
        marginTop:'2%' 
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
    } 
}); 
