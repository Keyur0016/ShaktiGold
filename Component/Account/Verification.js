import React, {useState, useEffect, useCallback} from 'react'; 
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator, Image, ToastAndroid } from 'react-native'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 
import * as Font from 'expo-font'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Verification({navigation, route}){

    const {Username, Mobilenumber, Password, Code} = route.params;

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


    // Input value 

    const [verificationCode, set_verificationCode] = useState(''); 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // Input Focus attribute

    const [verificationBorder, set_verificationBorder] = useState(false) ; 

    const OnFocusHandle = () => {
        set_verificationBorder(true); 
    }

    // --- Signup Verification Handler --- // 

    const Verification_Handler = async () => {
        
        setActivityIndicator(true); 

        if (verificationCode == ""){

            ToastAndroid.show("Enter Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (verificationCode != Code){

            ToastAndroid.show("Invalid Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
          
            try {
                
                let Signup_request_url = URL.RequestAPI ; 
                let Signup_request_data = {
                    "Check_status": "Signup", 
                    "Username": Username,
                    "Mobilenumber": Mobilenumber,
                    "Password": Password
                }; 
                let Signup_request_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Signup_request_data)
                }
                

                let Signup_request = await fetch(Signup_request_url, Signup_request_option); 
                let Signup_request_response = await Signup_request.json() ; 
                let Signup_response_STATUS = Signup_request_response.Status;
                
                if (Signup_response_STATUS == "Insert data"){
                         
                    let TableName = Signup_request_response.Table; 

                    // --- Set Attributes in Local storage --- // 

                    // 1. Username
                    await AsyncStorage.setItem("Username", Username); 
                    
                    // 2. Mobilenumber
                    await AsyncStorage.setItem("Mobilenumber", Mobilenumber); 
                    
                    // 3. Table 
                    await AsyncStorage.setItem("Table", TableName); 
                    
                    ToastAndroid.show("Signup successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                
                    navigation.navigate("Home") ; 
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
                
            }
        }

        setActivityIndicator(false); 
    }

    const VerificationBack = () => {

        navigation.navigate("Signup") ; 
    }

    if(loadFontValue){
        return(
            <KeyboardAvoidingView style={VerificationStyle.VerificationScreen} >

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ScreenColor}
                />

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
