import React, {useState, useEffect} from 'react'; 
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, Pressable,Image, 
ToastAndroid, ActivityIndicator } from 'react-native'; 
import * as colorCode from './Information/ColorCode'; 
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL' ; 
import {WebView} from 'react-native-webview' ; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Update_mobile_verification({navigation, route}){
    
    // ==== Route attribute ==== // 

    const {Mobilenumber, Code, UpdateMobile} = route.params ; 

    // ==== Load font ==== // 

    const [loadFontValue, setLoadFontValue] = useState(false); 

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf')
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

    // **** Start Update mobile number Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    // -- Webview request -- //

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        setActivityIndicator(false) ; 
        set_webview_layout(true) ; 

        try{
            Temp_data = JSON.parse(Temp_data) ; 

            let SendCode_STATUS = Temp_data.Status; 

            if (SendCode_STATUS == "Success"){
                
                await AsyncStorage.setItem("Mobilenumber", UpdateMobile); 
                
                ToastAndroid.show("Update mobilenumber successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                navigation.navigate("Home") ; 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    // *** Stop Update Mobile number Request Handler *** // 

    // ==== Code Verification Handler ==== // 

    const Verification_Handler = async () => {
        
        
        if (verificationCode == ""){
            
            ToastAndroid.show("Enter Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (verificationCode != Code){
            
            ToastAndroid.show("Invalid Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
            
            setActivityIndicator(true); 

            let SendCode_data = {
                'Check_status': 'Update_mobile',
                'Update_number': UpdateMobile, 
                'Previous_number': Mobilenumber
            } ; 
            
            // Set URL to webview 
            setActivityIndicator(true) ; 

            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(SendCode_data) ; 
            
            set_web_view_url(web_url) ;
        }


    }

    // ==== Back Handler ==== // 

    const VerificationBack = () => {

        navigation.goBack() ; 
    
    }

    // ==== Layout ==== // 

    if(loadFontValue){
        return(
            <KeyboardAvoidingView style={ForgetVerificationStyle.VerificationScreen} >

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

                <View style={ForgetVerificationStyle.Back_Title} >

                    {/* Back button Image */}

                    <Pressable style={ForgetVerificationStyle.BackImageContainer}
                        android_ripple={{'color':'#b2b2b2'}}
                        onPress={VerificationBack}>

                        <Image 
                            style={ForgetVerificationStyle.BackImage}
                            source={require('../assets/arrow.png')}
                        />

                    </Pressable>

                    {/* Verification Title */}

                    <Text style={ForgetVerificationStyle.ForgetVerificationTitle}>Update MobileVerification</Text>
                
                </View>                

                {/* Mobilenumber information  */}
                
                {/* <Text style={ForgetVerificationStyle.MobileInformation}>Mobilenumber: {Mobilenumber}</Text> */}
            
                {/* Input Layout  */}

                <View style={ForgetVerificationStyle.InputLayout}>
                    
                    {/* Verification code Input  */}

                    <TextInput style={[ForgetVerificationStyle.InputStyle, {borderColor: verificationBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Verification code"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="numeric"
                        value={verificationCode}
                        cursorColor="black"
                        onChangeText={(value) => set_verificationCode(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {activityIndicator? 
                    <View style={[ForgetVerificationStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    
                    <Pressable style={[ForgetVerificationStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={Verification_Handler}>
                        <Text style={ForgetVerificationStyle.SendCode_Text}>Update Mobilenumber</Text>
                    </Pressable>
                    
                    }
 
                </View>

            </KeyboardAvoidingView>
        )
    }
}

const ForgetVerificationStyle = StyleSheet.create({
    VerificationScreen: {
        backgroundColor: colorCode.SignupColorCode.ScreenColor, 
        height: '100%', 
        width: '100%',
    }, 
    
    ForgetVerificationTitle: {
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'2%',
        marginTop: 'auto',
        marginBottom: 'auto'
    }, 

    BackImageContainer:{
        marginTop: "auto", 
        marginBottom: "auto",
        padding:10,
    },

    BackImage:{
        height:25,
        width:25,
        backgroundColor:'transparent',
        marginTop: 'auto',
        marginBottom:'auto' 
    },

    Back_Title:{
        display:'flex', 
        flexDirection:'row',
        alignItems:'flex-start', 
        marginTop:'5%',
        marginLeft: '1%'
    },  
    
    InputLayout:{
        width: '94%',
        marginLeft:'auto',
        marginRight:'auto', 
        marginTop: '1%'
    },
    
    MobileInformation:{
        fontFamily: "Mukta",
        fontSize: 18, 
        color: colorCode.SignupColorCode.InputPlaceholderColor, 
        marginLeft: '4%', 
        marginTop:'3%' 
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
    
}); 
