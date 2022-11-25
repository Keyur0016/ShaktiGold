import { View, Pressable, StyleSheet, Text, 
StatusBar, TextInput, ScrollView, ActivityIndicator, ToastAndroid, Image } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 

export default function InsertAddress({navigation, route}){
    
    // == Table name 
    const {Table_name} =  route.params; 
    
    // == Activity Indicator
    const [activityIndicator, setActivityIndicator] = useState(false); 
    
    // == Input value 
    const [username, set_username] = useState(''); 
    const [street_address, set_street_address] = useState(''); 
    const [area, set_area] = useState(''); 
    const [landmark, set_landmark] = useState(''); 
    const [pincode, set_pincode] = useState(''); 
    
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

            setLoadFontValue(true); 
        }; 

        loadFont() ; 
    }, []);
 
    // == Input widget set border Handler 
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
    
    // == Insert address Handler
    const Insert_address_Handler = async () => {
       
        setActivityIndicator(true) ; 

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
        else if (pincode.length > 6){
            ToastAndroid.show("Invalid Pincode", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{

            try{

                let Insert_address_url = URL.RequestAPI ; 
                let Insert_address_data = {
                    "Check_status": "Insert_address",
                    "Table_name": Table_name ,
                    "Username":  username,
                    "Street_address": street_address,
                    "Area": area ,
                    "Pincode": pincode ,
                    "Landmark": landmark
                }; 
                let Insert_address_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Insert_address_data)
                }; 

                let Insert_address_request = await fetch(Insert_address_url, Insert_address_option) ; 
                let Insert_address_response = await Insert_address_request.json() ; 

                if (Insert_address_response.Status == "Insert"){
                     
                    ToastAndroid.show("Insert address successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                    navigation.goBack() ; 
                }

            }catch{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }

        setActivityIndicator(false) ; 
    }

    // == Back Press Handler 
    const Back_press_Handler = () => {
        navigation.goBack(); 
    }
    
    if (loadFontValue){
        return(
            <ScrollView style={InsertAddressStyle.InsertAddressScreen}
                >

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />

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
                    
                        <Text style={InsertAddressStyle.BackText}>Insert Address</Text>
                    
                    </Pressable>
        
                </View>
 
                {/* == Input widget layout ==  */}

                <View>
                     
                    {/* Username input   */}

                    <Text style={InsertAddressStyle.AddressTitle}>Username</Text>
                    
                    <TextInput style={[InsertAddressStyle.AddressInput, {borderColor: username_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Username"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={username}
                        cursorColor="black"
                        onChangeText={(value) => set_username(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    /> 
                    
                    {/* Street address input  */}

                    <Text style={InsertAddressStyle.AddressTitle}>Flat, House no, Building, Apartment</Text>
                    
                    <TextInput style={[InsertAddressStyle.AddressInput, {borderColor: street_address_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor}
                        placeholder = "Street address " 
                        keyboardType="default"
                        value={street_address}
                        cursorColor="black"
                        onChangeText={(value) => set_street_address(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    /> 
                    
                    {/* Area input  */}

                    <Text style={InsertAddressStyle.AddressTitle}>Area</Text>
                    
                    <TextInput style={[InsertAddressStyle.AddressInput , {borderColor: area_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor}
                        placeholder = "Eg. Mota varachha " 
                        keyboardType="default"
                        value={area}
                        cursorColor="black"
                        onChangeText={(value) => set_area(value)}
                        onFocus = {() => OnFocusHandle(2)}
                    /> 
                    
                    {/* Landmark input  */}

                    <Text style={InsertAddressStyle.AddressTitle}>Landmark</Text>
                    
                    <TextInput style={[InsertAddressStyle.AddressInput , {borderColor: landmark_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        placeholder="Eg. near ABC circle"
                        value={landmark}
                        cursorColor="black"
                        onChangeText={(value) => set_landmark(value)}
                        onFocus = {() => OnFocusHandle(3)}
                    /> 
                    
                    {/* Pincode input  */}

                    <Text style={InsertAddressStyle.AddressTitle}>Pincode</Text>
                    
                    <TextInput style={[InsertAddressStyle.AddressInput , {borderColor: pincode_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
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
                        onPress={Insert_address_Handler}>
                        <Text style={InsertAddressStyle.SendCode_Text}>Add address</Text>
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