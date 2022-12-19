import { View, StyleSheet, StatusBar, Text, ActivityIndicator, Pressable, TextInput, ToastAndroid } from "react-native";
import * as colorCode from './Information/ColorCode'; 
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL'; 
import { useState, useEffect } from "react";
import {WebView} from 'react-native-webview' ; 

export default function AdminLogin({navigation, route}){

    // === Load font === // 
    
    const [loadFontValue, setLoadFontValue] = useState(false);

    const {Back} = route.params ; 

    useEffect(() => {

        const loadFont = async () => {

            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 

            if (Back == "1"){
                navigation.goBack() ; 
            }
        }; 

        loadFont() ; 

    }, []);

    // 

    const [passwordBorder, set_passwordBorder] = useState(false) ; 

    // Input value 

    const [password, set_password] = useState(''); 

    // Activity Indicator 
    
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    const OnFocusHandle = (x) => {

        set_passwordBorder(true); 
    }

    // *** Start Admin Password check Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;      

    const Message_handling = async (event) => {

        let Temp_data =  (event.nativeEvent.data)   ;
        set_webview_layout(true) ; 
        setActivityIndicator(false) ; 

        try{
            
            Temp_data = JSON.parse(Temp_data) ; 

            let Admin_request_STATUS = Temp_data.Status ; 

                if (Admin_request_STATUS == "Invalid Password"){

                    ToastAndroid.show(Admin_request_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }
                else if (Admin_request_STATUS == "Valid Password"){
                  
                    ToastAndroid.show("Login success", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;  
                    
                    navigation.navigate("AdminOption") ; 
                }

        }catch{
            
        }

    }

    const Admin_password_check_handler = async () => {


        if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{

            setActivityIndicator(true) ; 
            try {
                
                let Admin_pas_check_data = {
                    'Check_status': 'Admin_password', 
                    'AdminPassword': password
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Admin_pas_check_data) ; 
                set_web_view_url(web_url) ; 

                

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }

    }

    // *** Stop Admin Password check Request Handler *** // 

    // *** Stop Admin Password check Request Handler *** // 

    if (loadFontValue){

        return(
            <View style={AdminStyle.AdminScreen}>
                  
                <StatusBar
                   backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />
    
                <Text style={AdminStyle.AdminTitle}>Admin Access</Text>

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

                {/* Input Layout  */}

                <View style={AdminStyle.InputLayout}>
                    
                    <TextInput style={[AdminStyle.InputStyle, {borderColor: passwordBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Admin password"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={password}
                        cursorColor="black"
                        onChangeText={(value) => set_password(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {activityIndicator ? 
                    <View style={[AdminStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[AdminStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={Admin_password_check_handler}>
                        <Text style={AdminStyle.SendCode_Text}>Login to control panel</Text>
                    </Pressable>
                    }
 
                </View>
    
            </View>
        )
    }
}

const AdminStyle = StyleSheet.create({
    AdminScreen : {
        backgroundColor: 'white', 
        height: '100%',
        width: '100%'
    }, 
    AdminTitle: {
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
    },
})