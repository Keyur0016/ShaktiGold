import React, {useState, useEffect} from 'react' ; 
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, 
Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as colorCode from '../Information/ColorCode' ; 
import * as Font from 'expo-font' ; 
import * as URL from '../Information/RequestURL'; 
import {WebView} from 'react-native-webview' ; 

export default function Signin({navigation}) {
    
    // ==== Load font ==== // 
    
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

    // === Input value === // 

    const [mobilenumber, setMobilenumber] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [activityIndicator, setActivityIndicator] = useState(false); 

    // === Input focus attributes === // 

    const [emailBorder, set_emailBorder] = useState(false); 
    const [passwordBorder, set_passwordBorder] = useState(false);

    // === Focus Handler === // 

    const OnFocusHandle = (x) => {

        set_emailBorder(false); 
        set_passwordBorder(false); 

        if (x == 0){
            set_emailBorder(true); 
        }
        else{
            set_passwordBorder(true) ; 
        }
    }

    // **** Start Signin Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    // -- WebView Request Handler -- // 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Signin_response_status = Temp_data.Status ; 

            if (Signin_response_status == "Mobile number not register"){

                ToastAndroid.show(Signin_response_status, ToastAndroid.BOTTOM, ToastAndroid.LONG); 
            }
            else if (Signin_response_status == "Invalid Password"){

                ToastAndroid.show(Signin_response_status, ToastAndroid.BOTTOM, ToastAndroid.LONG); 
            }
            else if (Signin_response_status == "Signin"){

                // Store attributes in LocalStorage 

                // 1. Username
                await AsyncStorage.setItem("Username", Temp_data.Username); 
                
                // 2. Mobile number 
                await AsyncStorage.setItem("Mobilenumber", mobilenumber); 
                
                // 3. Table name 
                await AsyncStorage.setItem("Table", Temp_data.Tablename); 

                navigation.navigate("Home") ; 

            }

        }catch{

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        setActivityIndicator(false) ; 

    }

    // -- Signin Button Handler --- // 

    const Signin_Handler = async () => {

        if (mobilenumber == ""){

            ToastAndroid.show("Enter Mobilenumber", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (mobilenumber.length < 10){

            ToastAndroid.show("Enter valid Mobilenumber", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
 
            // -- Call webview request -- // 

            setActivityIndicator(true) ; 

            let Signin_request_data = {
                "Check_status": 'Signin', 
                "Mobilenumber": mobilenumber,
                "Password": password
            }

            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Signin_request_data) ; 
            set_web_view_url(web_url ) ; 
            
        }


    }

    // **** Close Signin Request Handler **** // 

    
    // --- Forget Password Handler --- // 

    const Forget_navigator = () => {

        navigation.navigate("ForgetPassword"); 
    }

    // --- Already account handler --- //  

    const Signup_navigator = () => {

        navigation.navigate("Signup") ; 
    
    }

    // ==== Layout ==== // 

    if (loadFontValue){

        return (
            <KeyboardAvoidingView style={SigninStyle.SigninScreen}>

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
              
                {/* Signin Title  */}

                <Text style={SigninStyle.SigninTitle}>Signin</Text>

                {/* Input Widget  */}
                
                <View style={SigninStyle.InputLayout}>
                    
                    {/* Mobilenumber input  */}

                    <TextInput style={[SigninStyle.InputStyle, {borderColor: emailBorder? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Mobilenumber"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="phone-pad"
                        value={mobilenumber}
                        cursorColor="black"
                        onChangeText={(value) => setMobilenumber(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {/* Password input  */}

                    <TextInput style={[SigninStyle.InputStyle, {borderColor: passwordBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Password"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value = {password}
                        secureTextEntry={true}
                        cursorColor="black"
                        onChangeText = {(value) => setPassword(value)}
                        onFocus= {() => OnFocusHandle(1)}
                    />
                    
                    {activityIndicator ? 
                    <View style={[SigninStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[SigninStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={Signin_Handler}>
                        <Text style={SigninStyle.SendCode_Text}>Signin</Text>
                    </Pressable>
                    }

                </View>
                 
                <Pressable
                    onPress={Signup_navigator}>

                    <Text style={SigninStyle.AlreadyAccountInformation}>Create new account ? Signup</Text>

                </Pressable>

                <Pressable

                    onPress={Forget_navigator}>
                    
                    <Text style={SigninStyle.ForgetInformation}>Forget Password ?</Text>

                </Pressable>

            </KeyboardAvoidingView>
        )
    
    }
}

const SigninStyle = StyleSheet.create({
    SigninScreen: {
        backgroundColor: colorCode.SignupColorCode.ScreenColor, 
        height: '100%', 
        width: '100%',
    }, 
    
    SigninTitle: {
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
    },
    
    ForgetInformation:{
        fontFamily: "Sans", 
        fontSize:17,
        color: "#535353",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%'
    },

    AlreadyAccountInformation:{
        fontFamily: "Mukta",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto",
        color: '#565555',
        marginTop: 5
    }
}); 