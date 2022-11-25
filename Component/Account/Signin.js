import React, {useState, useEffect} from 'react' ; 
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, 
Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as colorCode from '../Information/ColorCode' ; 
import * as Font from 'expo-font' ; 
import * as URL from '../Information/RequestURL'; 

export default function Signin({navigation}) {
    
    // --- Load Require font --- // 
    
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

    // Input value 

    const [mobilenumber, setMobilenumber] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [activityIndicator, setActivityIndicator] = useState(false); 

    // Input Focus attributes

    const [emailBorder, set_emailBorder] = useState(false); 
    const [passwordBorder, set_passwordBorder] = useState(false);

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

    const Signin_Handler = async () => {
             
        setActivityIndicator(true); 

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

            try {

                let Signin_request_url = URL.RequestAPI ; 
                let Signin_request_data = {
                    "Check_status": 'Signin', 
                    "Mobilenumber": mobilenumber,
                    "Password": password
                }
                let Signin_request_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Signin_request_data)
                }; 

                let Signin_request = await fetch(Signin_request_url, Signin_request_option); 
                let Signin_response = await Signin_request.json() ; 
                let Signin_response_status = Signin_response.Status ; 

                if (Signin_response_status == "Mobile number not register"){

                    ToastAndroid.show(Signin_response_status, ToastAndroid.BOTTOM, ToastAndroid.LONG); 
                }
                else if (Signin_response_status == "Invalid Password"){

                    ToastAndroid.show(Signin_response_status, ToastAndroid.BOTTOM, ToastAndroid.LONG); 
                }
                else if (Signin_response_status == "Signin"){

                    // Store attributes in LocalStorage 

                    // 1. Username
                    await AsyncStorage.setItem("Username", Signin_response.Username); 
                    
                    // 2. Mobile number 
                    await AsyncStorage.setItem("Mobilenumber", mobilenumber); 
                    
                    // 3. Table name 
                    await AsyncStorage.setItem("Table", Signin_response.Tablename); 

                    navigation.navigate("Home") ; 

                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);; 
            }
            
        }

        setActivityIndicator(false); 
    }

    // --- Forget Password Handler --- // 

    const Forget_navigator = () => {

        navigation.navigate("ForgetPassword"); 
    }

    // --- Already account option Handler --- // 

    const Signup_navigator = () => {

        navigation.navigate("Signup") ; 
    
    }

    if (loadFontValue){

        return (
            <KeyboardAvoidingView style={SigninStyle.SigninScreen}>

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ScreenColor}
                />
              
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

                    <Text style={SigninStyle.AlreadyAccountInformation}>Already have account ? Signup</Text>

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
        color: colorCode.SignupColorCode.InputPlaceholderColor,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1%'
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