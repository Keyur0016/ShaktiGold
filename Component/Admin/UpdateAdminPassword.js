import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Pressable, StatusBar, TextInput, ToastAndroid } from "react-native";
import * as Font from 'expo-font' ; 
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import {WebView} from 'react-native-webview' ; 

export default function UpdateAdminPassword({navigation}){
    
    // === Load font === // 

    const [loadFontValue, setLoadFontValue] = useState(false) ; 

    useEffect(() => {

        const loadFont = async () => {
                  
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../../assets/Font/Ubuntu-Medium.ttf')
            })
           
            setLoadFontValue(true); 
        }; 
    
        loadFont() ;
    }, []); 
    
    // === Input value === // 

    const [password, set_password] = useState(''); 
    const [re_password, set_re_password] = useState('') ; 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 


    // === Input focus attributes === // 

    const [password_border, set_password_border] = useState(false) ; 
    const [re_password_border, set_re_password_border] = useState(false) ; 

    // === Input focus handler === // 

    const OnFocusHandle = (x) => {
        set_password_border(false) ; 
        set_re_password_border(false) ; 

        if (x == 0 ){
            set_password_border(true) ; 
        }
        else{
            set_re_password_border(true) ; 
        }
        
    }

    // **** Start Update admin password Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 
        setActivityIndicator(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Update_password"){

                ToastAndroid.show("Update Password successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

                navigation.goBack() ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    const Update_admin_password_handler = async () => {
     
        if (password == ""){
            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (re_password == ""){
            ToastAndroid.show("Re-enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if( password != re_password){
            ToastAndroid.show("Both password must be same", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{
            setActivityIndicator(true) ; 

            try{

                let Update_password_data = {
                    "Check_status": "Update_admin_password", 
                    "Update_password": password
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Update_password_data) ; 
                set_web_view_url(web_url) ; 
            
            }catch{
                 
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        }

    }

    // **** Close Update admin password Request Handler **** // 


    // === layout === // 

    if(loadFontValue){
        return(
            <View style={AdminPasswordUpdate.AdminPasswordScreen}>
                 
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
                 
                {/* Title   */}

                <Text style={AdminPasswordUpdate.AdminPasswordTitle}>Admin password update</Text>

                {/* Input Layout  */}

                <View style={AdminPasswordUpdate.InputLayout}>
                    
                    <TextInput style={[AdminPasswordUpdate.InputStyle, {borderColor: password_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Enter Password"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={password}
                        cursorColor="black"
                        onChangeText={(value) => set_password(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />
                    
                    <TextInput style={[AdminPasswordUpdate.InputStyle, {borderColor: re_password_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Re-enter Password"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={re_password}
                        cursorColor="black"
                        onChangeText={(value) => set_re_password(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    />

                    {activityIndicator ? 
                    <View style={[AdminPasswordUpdate.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[AdminPasswordUpdate.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={Update_admin_password_handler}>
                        <Text style={AdminPasswordUpdate.SendCode_Text}>Update admin password</Text>
                    </Pressable>
                    }
 
                </View>
            </View>
        )
    }
}

const AdminPasswordUpdate = StyleSheet.create({
    AdminPasswordScreen: {
        backgroundColor: "#ffffff", 
        height: "100%", 
        width: "100%"
    }, 

    AdminPasswordTitle:{
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
})