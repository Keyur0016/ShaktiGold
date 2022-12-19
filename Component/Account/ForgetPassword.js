import React, {useState, useEffect} from 'react'; 
import { View, StyleSheet, KeyboardAvoidingView, StatusBar, Image, Text, TextInput, ActivityIndicator, Pressable, ToastAndroid } from 'react-native';
import * as colorCode from '../Information/ColorCode'; 
import * as Font from 'expo-font' ; 
import * as URL from '../Information/RequestURL' ;
import {WebView} from 'react-native-webview' ; 

export default function ChangeEmail({navigation}){
    
    // ==== Load font ==== // 
    
    const [loadFontValue, setLoadFontValue] = useState(false); 

    useEffect(() => {
        
        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            }); 

            setLoadFontValue(true) ; 
        }; 

        loadFont() ; 

    },[]);
    
    // ==== Input value ==== // 

    const [mobilenumber, setMobilenumber] = useState(''); 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 
    
    // ==== Input focus attribute ==== // 

    const [emailBorder, setEmailBorder] = useState(false); 
    
    // ==== Focus Handler ==== // 

    const OnFocusHandle = () => {
        setEmailBorder(true); 
    }

    // **** Start Forget Password Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    // -- Webview request -- //

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 

        try{
            Temp_data = JSON.parse(Temp_data) ; 
            
            let SendCode_STATUS = Temp_data.Status; 

            if (SendCode_STATUS == "Mobile number not register"){

                ToastAndroid.show(SendCode_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
            else if (SendCode_STATUS == "OTP send") {

                ToastAndroid.show("OTP send successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                let Verification_OTP = Temp_data.OTP; 
                navigation.navigate("ForgetVerification", {"Mobilenumber":mobilenumber, "Code":Verification_OTP}); 
            }
            
            else if (SendCode_STATUS == "OTP send failed"){

                ToastAndroid.show("OTP send failed. Try, again", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        setActivityIndicator(false) ; 

    }

    // -- Forget Password Button Handler -- // 

    const ForgetPassword_Handle = async () => {

        if (mobilenumber == ""){

            ToastAndroid.show("Enter Mobilenumber", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (mobilenumber.length < 10){

            ToastAndroid.show("Invalid Mobilenumber", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{

            // -- Webview request -- // 
             
            let SendCode_data = {
                'Check_status': 'Send_otp',
                'Mobilenumber': mobilenumber
            } ; 
            
            // Set URL to webview 
            setActivityIndicator(true) ; 

            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_web_view_url(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(SendCode_data) ; 
            
            set_web_view_url(web_url ) ;
        }

    }

    // **** Close Forget Password Request Handler **** // 

    
    // ==== Back Handler ==== // 

    const Forget_password_back_handler = () =>{
        navigation.navigate("Signin"); 
    }
    
    // ==== Layout ==== // 

    if (loadFontValue){
        return(
            
            <KeyboardAvoidingView style={ForgetPassStyle.ForgetPassScreen}>
                     
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

                <View style={ForgetPassStyle.ForgetPassBack_Title}>
                    
                    {/* Back button Image  */}

                    <Pressable style={ForgetPassStyle.BackImageContainer}
                        android_ripple={{color:"#b2b2b2"}}
                        onPress={Forget_password_back_handler}>

                        <Image 
                            style={ForgetPassStyle.BackImage}
                            source={require('../../assets/arrow.png')}
                        />

                    </Pressable>

                    {/* Change Mobile number Title  */}
                    
                    <Text style={ForgetPassStyle.ForgetPass_Title}>Forget Password</Text>

                </View>

                {/* Mobile number related information  */}

                <Text style={ForgetPassStyle.ForgetInformation}>Provide your account's Mobilenumber for which you want to reset your password</Text>

                <View style={ForgetPassStyle.InputLayout}>
                    
                    {/* Mobilenumber input  */}

                    <TextInput style={[ForgetPassStyle.InputStyle, {borderColor: emailBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Mobilenumber"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="email-address"
                        value={mobilenumber}
                        cursorColor="black"
                        onChangeText={(value) => setMobilenumber(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {activityIndicator ? 
                    <View style={[ForgetPassStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[ForgetPassStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={ForgetPassword_Handle}>
                        <Text style={ForgetPassStyle.SendCode_Text}>Send code </Text>
                    </Pressable>
                    }

                </View>
                

            </KeyboardAvoidingView>
        )
    }
}; 

const ForgetPassStyle = StyleSheet.create({
    ForgetPassScreen: {
        backgroundColor: colorCode.SignupColorCode.ScreenColor, 
        height: '100%', 
        width: '100%'
    },

    ForgetPassBack_Title:{
        display:'flex', 
        flexDirection:'row',
        alignItems:'flex-start',
        marginTop:'5%',
        marginLeft: '2%'
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
    
    ForgetPass_Title:{
        fontFamily: 'Mukta',
        fontSize: 23,
        color: 'black',
        marginLeft:'4%',
        marginTop: 'auto',
        marginBottom: 'auto'
    }, 
    
    ForgetInformation:{
        fontFamily: 'Sans',
        fontSize:17,
        color:'#5c5c5c',
        width: '92%',
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginTop: '4%',
        marginBottom: '1%' 
    },
    
    InputLayout:{
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
        fontSize:19, 
        color:'black'
    }
}); 