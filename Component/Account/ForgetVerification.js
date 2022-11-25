import React, {useState, useEffect} from 'react'; 
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View, TextInput, Pressable,Image, 
ToastAndroid, ActivityIndicator } from 'react-native'; 
import * as colorCode from '../Information/ColorCode'; 
import * as Font from 'expo-font'; 

export default function Verification({navigation, route}){
    
    const {Mobilenumber, Code} = route.params ; 

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

    // --- Code Verification Handler --- // 

    const Verification_Handler = async () => {
        
        setActivityIndicator(true); 

        if (verificationCode == ""){

            ToastAndroid.show("Enter Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (verificationCode != Code){

            ToastAndroid.show("Invalid Verification code", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
           
            navigation.navigate("UpdatePassword", {"Mobilenumber": Mobilenumber}); 
        }

        setActivityIndicator(false) ; 

    }

    // --- Verification Back Handler --- // 

    const VerificationBack = () => {

        navigation.navigate("ForgetPassword") ; 
    
    }

    if(loadFontValue){
        return(
            <KeyboardAvoidingView style={ForgetVerificationStyle.VerificationScreen} >

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ScreenColor}
                />

                <View style={ForgetVerificationStyle.Back_Title} >

                    {/* Back button Image */}

                    <Pressable style={ForgetVerificationStyle.BackImageContainer}
                        android_ripple={{'color':'#b2b2b2'}}
                        onPress={VerificationBack}>

                        <Image 
                            style={ForgetVerificationStyle.BackImage}
                            source={require('../../assets/arrow.png')}
                        />

                    </Pressable>

                    {/* Verification Title */}

                    <Text style={ForgetVerificationStyle.ForgetVerificationTitle}>Forget Password</Text>
                
                </View>                

                {/* Mobilenumber information  */}
                
                <Text style={ForgetVerificationStyle.MobileInformation}>Mobilenumber: {Mobilenumber}</Text>
            
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
                        <Text style={ForgetVerificationStyle.SendCode_Text}>Update Password</Text>
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
