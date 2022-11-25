import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Text, View, StyleSheet, StatusBar, 
TextInput, Pressable, ActivityIndicator, ToastAndroid } from 'react-native'; 
import * as Font from 'expo-font';
import * as URL from '../Information/RequestURL'; 
import * as colorCode from '../Information/ColorCode'; 

export default function UpdatePassword({navigation, route}) {
  
  const {Mobilenumber} = route.params ; 

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

  const [Password,setPassword] = useState(''); 
  const [rePassword, setRePassword] = useState(''); 
  const [activityIndicator, setActivityIndicator] = useState(false) ; 

  // Input Focus Attributes 
  
  const [PasswordBorder, setPasswordBorder] = useState(false); 
  const [RePasswordBorder, setRePasswordBorder] = useState(false); 

  const OnFocusHandle = (x) => {

    setPasswordBorder(false); 
    setRePasswordBorder(false); 

    if (x == 0){

      setPasswordBorder(true);

    }
    else{

      setRePasswordBorder(true) ; 

    }
  }

  const UpdatePasswordHandle = async () => {
      
    setActivityIndicator(true); 

    if (Password == ""){

      ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
    }
    else if (Password.length <8){

      ToastAndroid.show("Password length must be greater than 8", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
    }
    else if (rePassword == ""){

      ToastAndroid.show("Re-Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
    }
    else if (Password != rePassword){

      ToastAndroid.show("Both Password must be same", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
    }
    else{

      try {
        
        let Update_password_url = URL.RequestAPI; 
        let Update_password_data = {
          "Check_status": "Update_password", 
          "Mobilenumber": Mobilenumber, 
          "Password": Password
        }; 
        let Update_password_option = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Update_password_data)
        }; 

        let Update_password_request = await fetch(Update_password_url, Update_password_option); 
        let Update_password_response = await Update_password_request.json() ; 
        let Update_password_STATUS = Update_password_response.Status; 

        if (Update_password_STATUS == "Update password"){

          ToastAndroid.show("Update Password successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        
          navigation.navigate("Signin"); 

        }

      } catch (error) {
        
        ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
      }
      
    }

    setActivityIndicator(false); 
  }

  if (loadFontValue){
    
    return (

      <KeyboardAvoidingView style={UpdatePasswordStyle.UpdatePasswordScreen}
        behavior="height">
        
        <StatusBar
          backgroundColor={colorCode.SignupColorCode.ScreenColor}
        />
  
        {/* Update Password Title  */}

        <Text style={UpdatePasswordStyle.UpdatePasswordTitle}>Update Password</Text>
  
        {/* Input option layout  */}
        
        <View style={UpdatePasswordStyle.InputLayout} >
          
          {/* Password Input  */}
          
          <TextInput style={[UpdatePasswordStyle.InputStyle, {borderColor: PasswordBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
            placeholder="Password"
            placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
            keyboardType="default"
            value = {Password}
            secureTextEntry={true}
            cursorColor="black"
            onChangeText = {(value) => setPassword(value)}
            onFocus= {() => OnFocusHandle(0)}
          />
          
          {/* RePassword Input  */}
          
          <TextInput style={[UpdatePasswordStyle.InputStyle, {borderColor: RePasswordBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
            placeholder="Re-Password"
            placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
            keyboardType="default"
            value = {rePassword}
            secureTextEntry={true}
            cursorColor="black"
            onChangeText = {(value) => setRePassword(value)}
            onFocus= {() => OnFocusHandle(1)}
          />

          {activityIndicator ? 
            <View style={[UpdatePasswordStyle.SendCode_Layout]}>
              <ActivityIndicator
                color='white'
                size="large"
              />
              </View>:
              <Pressable style={[UpdatePasswordStyle.SendCode_Layout]}
                android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                onPress={UpdatePasswordHandle}>
                  <Text style={UpdatePasswordStyle.SendCode_Text}>Update Password</Text>
              </Pressable>
            }
  
        </View>

      </KeyboardAvoidingView>
    
    )
  }
} 

const UpdatePasswordStyle = StyleSheet.create({
  UpdatePasswordScreen: {
    backgroundColor: colorCode.SignupColorCode.ScreenColor, 
    height: '100%', 
    width: '100%',
  },

  UpdatePasswordTitle:{
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
  }
}); 
