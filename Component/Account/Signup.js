import {View, Text, StyleSheet, KeyboardAvoidingView, StatusBar, TextInput, 
Pressable, ActivityIndicator, ToastAndroid } from 'react-native';
import * as colorCode from  '../Information/ColorCode'; 
import * as Font from 'expo-font'; 
import * as URL from '../Information/RequestURL';
import { useEffect, useState } from 'react';

export default function Signup({navigation}) {

    // --- Check Font loaded or not --- // 

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
    
    // Input 

    const [username, set_username] = useState(''); 
    const [mobilenumber, set_mobilenumber] = useState(''); 
    const [password, set_password] = useState(''); 
    const [re_password, set_rePassword] = useState('');  
    
    // Input Focus attributes 

    const [usernameBorder, set_usernameBorder] = useState(false); 
    const [mobileBorder, set_mobileBorder] = useState(false) ; 
    const [passwordBorder, set_passwordBorder] = useState(false) ; 
    const [re_passwordBorder, set_re_passwordBorder] = useState(false) ;  


    // Activity Indicator set or not Value 

    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // Input widget focus handler
    const OnFocusHandle = (x) => {
        set_usernameBorder(false); 
        set_mobileBorder(false) ; 
        set_passwordBorder(false) ; 
        set_re_passwordBorder(false) ;

        if (x == 0){
            set_usernameBorder(true) ; 
        }
        else if (x == 1){
            set_mobileBorder(true) ; 
        }
        else if (x == 2){
            set_passwordBorder(true) ; 
        }
        else{
            set_re_passwordBorder(true) ; 
        }
    }

    const Signup_Handler = async () => {
        
        setActivityIndicator(true); 

        if (username == ""){

            ToastAndroid.show("Enter Username", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        
        }
        else if (mobilenumber == ""){
        
            ToastAndroid.show("Enter Mobile number", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
    
        }
        else if (mobilenumber.length < 10){

            ToastAndroid.show("Mobile number length must be 10", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
        }
        else if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (re_password == ""){

            ToastAndroid.show("Re-enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (password.length < 8){

            ToastAndroid.show("Password must be greater than 8", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (password != re_password){
        
            ToastAndroid.show("Both Password must be same", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        
        }
        else{
            
            try {
                
                let Signup_check_url = URL.RequestAPI; 
                let Signup_check_data = {
                    "Check_status" : "Signup_check", 
                    "Mobilenumber" : mobilenumber
                }
                let Signup_check_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Signup_check_data)
                }

                let Signup_request = await fetch(Signup_check_url, Signup_check_option);
                let Signup_request_response = await Signup_request.json() ; 
                let Signup_request_STATUS = Signup_request_response.Status ; 

                if (Signup_request_STATUS == "Mobile number already register"){
                    
                    ToastAndroid.show(Signup_request_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }
                else if (Signup_request_STATUS == "OTP send failed"){
                    
                    ToastAndroid.show("OTP send failed. Try, again", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }
                else if (Signup_request_STATUS == "OTP send"){

                    let Verification_OTP = Signup_request_response.OTP; 

                    ToastAndroid.show("OTP send successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;

                    navigation.navigate("Verification", {"Username":username,"Mobilenumber":mobilenumber,"Password":password,"Code":Verification_OTP}); 
                    
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
                      
        }

        setActivityIndicator(false); 
        
        setActivityIndicator(false) ; 
    }

    const AlreadyAccount_handler = () => {
        navigation.navigate("Signin");     
    }

    if (loadFontValue){
        return (
            <KeyboardAvoidingView style={SignupStyle.SignupScreen}
                behavior="height">
    
                <StatusBar 
                    backgroundColor={colorCode.SignupColorCode.ScreenColor} />
                
                {/* Signup Title  */}

                <Text style={SignupStyle.SignupTitle}>Signup</Text>
                 
                {/* InputWidget Layout  */}
                
                <View style={SignupStyle.InputLayout}>
                     
                    <TextInput style={[SignupStyle.InputStyle, {borderColor: usernameBorder? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Username"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={username}
                        cursorColor="black"
                        onChangeText={(value) => set_username(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    <TextInput style={[SignupStyle.InputStyle, {borderColor: mobileBorder? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Mobile number"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="phone-pad"
                        value= {mobilenumber}
                        cursorColor="black"
                        onChangeText = {(value) => set_mobilenumber(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    />
                    
                    <TextInput style={[SignupStyle.InputStyle, {borderColor: passwordBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Password"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value = {password}
                        secureTextEntry={true}
                        cursorColor="black"
                        onChangeText = {(value) => set_password(value)}
                        onFocus= {() => OnFocusHandle(2)}
                    />
                    
                    <TextInput style={[SignupStyle.InputStyle, {borderColor: re_passwordBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Re-password"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value = {re_password}
                        secureTextEntry={true}
                        cursorColor="black"
                        onChangeText = {(value) => set_rePassword(value)}
                        onFocus = {() => OnFocusHandle(3)}
                    />
                   
                    {activityIndicator ? 
                    <View style={[SignupStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[SignupStyle.SendCode_Layout]}
                        android_ripple={{color:'#ffd100',foreground:false}}
                        onPress={Signup_Handler}>
                        <Text style={SignupStyle.SendCode_Text}>Verify</Text>
                    </Pressable>
                    }
        
                </View>

                <Pressable 
                    onPress={AlreadyAccount_handler}>
                    <Text style={SignupStyle.SigninInformation}>Already have account?</Text>
                </Pressable>
                       
            </KeyboardAvoidingView>
        );
    }
    
}

const SignupStyle = StyleSheet.create({
    'SignupScreen': {
        backgroundColor: colorCode.SignupColorCode.ScreenColor, 
        height: '100%', 
        width: '100%',
    }, 
    SignupTitle:{
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
        fontSize:18, 
        color:'black'
    }, 
    SigninInformation:{
        fontFamily: "Sans", 
        fontSize:17,
        color: colorCode.SignupColorCode.InputPlaceholderColor,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%'
    }
}); 