import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Text, View, StyleSheet, StatusBar, 
TextInput, Pressable, ActivityIndicator, ToastAndroid } from 'react-native'; 
import * as Font from 'expo-font';
import * as URL from '../Information/RequestURL'; 
import * as colorCode from '../Information/ColorCode'; 
import {WebView} from 'react-native-webview' ; 

export default function UpdatePassword({navigation, route}) {
  
  // ==== Route attribute ==== // 

  const {Mobilenumber} = route.params ; 

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

  // ==== Input value ==== // 

  const [Password,setPassword] = useState(''); 
  const [rePassword, setRePassword] = useState(''); 
  const [activityIndicator, setActivityIndicator] = useState(false) ; 

  // ==== Input focus attribute ==== // 
  
  const [PasswordBorder, setPasswordBorder] = useState(false); 
  const [RePasswordBorder, setRePasswordBorder] = useState(false); 

  // ==== Focus Handler ==== // 

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

  // **** Start Update Password Request Handler **** // 

  const [webview_layout, set_webview_layout] = useState(true) ; 
  const [web_view_url, set_web_view_url] = useState('') ;
  const [webview_value, set_webview_value] = useState(0) ;

  // -- Webview Request -- // 

  const Message_handling = (event) => {

    let Temp_data = event.nativeEvent.data ; 
    set_webview_layout(true) ; 
    
    try{
      
      Temp_data = JSON.parse(Temp_data) ; 

      let Update_password_STATUS = Temp_data.Status; 

      if (Update_password_STATUS == "Update password"){

        ToastAndroid.show("Update Password successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
      
        navigation.navigate("Signin"); 
      }

    }catch{

      ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
    }

    setActivityIndicator(false);
  }

  // -- Update Password Button Handler -- // 

  const UpdatePasswordHandle = async () => {

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

      // -- Webview request -- // 

      let Update_password_data = {
        "Check_status": "Update_password", 
        "Mobilenumber": Mobilenumber, 
        "Password": Password
      }; 
      
      // Set URL to webview 
      setActivityIndicator(true) ; 
      set_web_view_url("") ;
      set_webview_layout(false) ; 
      set_web_view_url(webview_value + 1) ; 
      let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Update_password_data) ; 
      set_web_view_url(web_url ) ;
    }
  }

  // *** Stop Update Password Request Handler *** // 
  

  // ==== Layout ==== // 

  if (loadFontValue){
    
    return (

      <KeyboardAvoidingView style={UpdatePasswordStyle.UpdatePasswordScreen}
        behavior="height">
        
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
