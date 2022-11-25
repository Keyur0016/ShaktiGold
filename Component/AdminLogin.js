import { View, StyleSheet, StatusBar, Text, ActivityIndicator, Pressable, TextInput, ToastAndroid } from "react-native";
import * as colorCode from './Information/ColorCode'; 
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL'; 
import { useState, useEffect } from "react";

export default function AdminLogin(){

    // Check Font loaded or not 
    
    const [loadFontValue, setLoadFontValue] = useState(false);

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ; 

    }, []);

    // Border value 

    const [passwordBorder, set_passwordBorder] = useState(false) ; 

    // Input value 

    const [password, set_password] = useState(''); 

    // Activity Indicator 
    
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    const OnFocusHandle = (x) => {

        set_passwordBorder(true); 
    }

    const Admin_password_check_handler = async () => {

        if (password == ""){

            ToastAndroid.show("Enter Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{

            try {
                
                let Admin_pas_check_url = URL.RequestAPI ; 
                let Admin_pas_check_data = {
                    'Check_status': 'Admin_password', 
                    'AdminPassword': password
                }; 
                let Admin_pas_check_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Admin_pas_check_data)
                }; 

                let Admin_pas_request = await fetch(Admin_pas_check_url, Admin_pas_check_option); 
                let Admin_pas_response = await Admin_pas_request.json(); 
                let Admin_request_STATUS = Admin_pas_response.Status ; 

                if (Admin_request_STATUS == "Invalid Password"){

                    ToastAndroid.show(Admin_request_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }
                else if (Admin_request_STATUS == "Valid Password"){
                  
                    ToastAndroid.show("Valid Password", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;   
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }
    }

    if (loadFontValue){

        return(
            <View style={AdminStyle.AdminScreen}>
                  
                <StatusBar
                   backgroundColor='white'
                />
    
                <Text style={AdminStyle.AdminTitle}>Admin Access</Text>

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
                        <Text style={AdminStyle.SendCode_Text}>Signin</Text>
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