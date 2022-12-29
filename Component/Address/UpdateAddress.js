import { View, Pressable, StyleSheet, Text, 
StatusBar, TextInput, ScrollView, ActivityIndicator, ToastAndroid, Image } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 
import {WebView} from 'react-native-webview' ; 

export default function UpdateAddress({navigation, route}){
    
    // == Table name 
    const {Table_name} = route.params ; 
        
    // == ActivityIndicator attributes 
    const [activityIndicator, setActivityIndicator] = useState(false); 
    
    // ==  Input value 
    const [username, set_username] = useState('') ; 
    const [street_address, set_street_address] = useState('') ; 
    const [area, set_area] = useState('') ; 
    const [landmark, set_landmark] = useState('') ; 
    const [pincode, set_pincode] = useState('') ; 
    const [address_id, set_address_id] = useState('') ; 
    
    // == Input Focus attributes 
    const [username_border, set_username_border] = useState(false); 
    const [street_address_border, set_street_address_border] = useState(false); 
    const [area_border, set_area_border] = useState(false);
    const [landmark_border, set_landmark_border] = useState(false); 
    const [pincode_border, set_pincode_border] = useState(false) ;  
    
    // == Check Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false);

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../../assets/Font/Ubuntu-Medium.ttf')
            })

            // == Set Input value 
            
            set_username(route.params.Address.Data1) ;
            set_street_address(route.params.Address.Data2) ;
            set_area(route.params.Address.Data3) ; 
            set_landmark(route.params.Address.Data4) ; 
            set_pincode(route.params.Address.Data5) ;  
            set_address_id(route.params.Address.Option) ; 

            setLoadFontValue(true); 
        }; 

        loadFont() ; 
    }, []);
    
    // == Input border Focus Handler 

    const OnFocusHandle = (x) => {

        set_username_border(false); 
        set_street_address_border(false); 
        set_area_border(false); 
        set_landmark_border(false); 
        set_pincode_border(false); 
        
        if (x == 0){
            set_username_border(true)
        }
        else if (x == 1){
            set_street_address_border(true); 
        }
        else if (x == 2){
            set_area_border(true); 
        }
        else if (x == 3){
            set_landmark_border(true); 
        }
        else{
            set_pincode_border(true);
        }
    }

    // **** Start Update Address Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 
        setActivityIndicator(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Update"){
                    
                navigation.goBack() ;

                ToastAndroid.show("Update address successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }
   
    const Update_address_Handler = async () => {
        
        if (username == ""){
            ToastAndroid.show("Enter Username", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (street_address == ""){
            ToastAndroid.show("Enter Street address", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (area == ""){
            ToastAndroid.show("Enter address Area", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (landmark == ""){
            ToastAndroid.show("Enter landmark of area", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (pincode == ""){
            ToastAndroid.show("Enter Pincode", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (pincode.length != 6){
            ToastAndroid.show("Invalid Pincode", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{

            setActivityIndicator(true) ; 


            try{
                
                // --- Update address webview request --- // 

                let Insert_address_data = {
                    "Check_status": "Update_address",
                    "Table_name": Table_name ,
                    "Username":  username,
                    "Street_address": street_address,
                    "Area": area ,
                    "Pincode": pincode ,
                    "Landmark": landmark, 
                    "address_id": address_id
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_address_data) ; 
                
                set_web_view_url(web_url) ; 
                

            }catch{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                setActivityIndicator(false) ; 
            }
        }

    }

    // ***** Close Update Address Request Handler **** // 

    // == Back Press Handler 
    const Back_press_Handler = () => {
        navigation.goBack() ; 
    }
    
    if (loadFontValue){
        return(
            <ScrollView style={InsertAddressStyle.InsertAddressScreen}
                >

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

                {/* == Back Option Container ==  */}

                <View style={InsertAddressStyle.BackImageContainer}>
                                
                    <Pressable style={[InsertAddressStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress = {Back_press_Handler}
                        >
                    
                        <Image
                            source={require('../../assets/arrow.png')}
                            style={InsertAddressStyle.BackImage}
                        />
                    
                        <Text allowFontScaling={false} style={InsertAddressStyle.BackText}>Update Address</Text>
                    
                    </Pressable>
        
                </View>


                <View>
                        
                    {/* Username input   */}

                    <Text allowFontScaling={false} style={InsertAddressStyle.AddressTitle}>Username</Text>
                    
                    <TextInput allowFontScaling={false} style={[InsertAddressStyle.AddressInput, {borderColor: username_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Username"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={username}
                        cursorColor="black"
                        onChangeText={(value) => set_username(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    /> 
                    
                    {/* Street address input  */}

                    <Text allowFontScaling={false} style={InsertAddressStyle.AddressTitle}>Flat, House no, Building, Apartment</Text>
                    
                    <TextInput allowFontScaling={false} style={[InsertAddressStyle.AddressInput, {borderColor: street_address_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor}
                        placeholder = "Street address " 
                        keyboardType="default"
                        value={street_address}
                        cursorColor="black"
                        onChangeText={(value) => set_street_address(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    /> 
                    
                    {/* Area input  */}

                    <Text allowFontScaling={false} style={InsertAddressStyle.AddressTitle}>Area</Text>
                    
                    <TextInput allowFontScaling={false} style={[InsertAddressStyle.AddressInput , {borderColor: area_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor}
                        placeholder = "Eg. Mota varachha " 
                        keyboardType="default"
                        value={area}
                        cursorColor="black"
                        onChangeText={(value) => set_area(value)}
                        onFocus = {() => OnFocusHandle(2)}
                    /> 
                    
                    {/* Landmark input  */}

                    <Text allowFontScaling={false} style={InsertAddressStyle.AddressTitle}>Landmark</Text>
                    
                    <TextInput allowFontScaling={false} style={[InsertAddressStyle.AddressInput , {borderColor: landmark_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        placeholder="Eg. near ABC circle"
                        value={landmark}
                        cursorColor="black"
                        onChangeText={(value) => set_landmark(value)}
                        onFocus = {() => OnFocusHandle(3)}
                    /> 
                    
                    {/* Pincode input  */}

                    <Text allowFontScaling={false} style={InsertAddressStyle.AddressTitle}>Pincode</Text>
                    
                    <TextInput allowFontScaling={false} style={[InsertAddressStyle.AddressInput , {borderColor: pincode_border
                     ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="6 digits [0-9] PIN Code "
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={pincode}
                        cursorColor="black"
                        onChangeText={(value) => set_pincode(value)}
                        onFocus = {() => OnFocusHandle(4)}
                    /> 

                    {activityIndicator ? 
                    <View style={[InsertAddressStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[InsertAddressStyle.SendCode_Layout]}
                        android_ripple={{color:'#ffd100',foreground:false}}
                        onPress={Update_address_Handler}>
                        <Text allowFontScaling={false} style={InsertAddressStyle.SendCode_Text}>Update address</Text>
                    </Pressable>
                    }

                </View>

            </ScrollView>
        )
    }
}   

const InsertAddressStyle = StyleSheet.create({
    InsertAddressScreen: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    }, 

    BackImageContainer:{
        display: "flex",
        flexDirection: 'row',
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    }, 

    BackImage:{
        height: 30,
        width: 30, 
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    BackText:{
        fontFamily: 'Ubuntu',
        fontSize: 19,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    },

    AddressTitle:{
        fontFamily: 'Mukta', 
        fontSize: 19, 
        color: "#464646", 
        marginLeft: '4%', 
        marginTop: 8,
    },

    AddressInput:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor,
        width: '100%', 
        fontFamily: 'Sans', 
        fontSize: 18,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginTop: 5,
        marginBottom: 8,
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto"
    },

    SendCode_Layout:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor,
        borderRadius: 5, 
        marginTop:15, 
        alignItems:'center',
        paddingTop:10, 
        paddingBottom:10,
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto",
    }, 

    SendCode_Text:{
        fontFamily:"Mukta",
        fontSize:18, 
        color:'black',
    }
})