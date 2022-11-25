import { View, StyleSheet, TextInput, Pressable, Text, Image, StatusBar, ActivityIndicator, ToastAndroid, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL';
import * as colorCode from './Information/ColorCode' ; 

export default function CancelOrder({navigation, route}){

    // == Cancel order reason 
    const [cancel_order_reason, set_cancel_order_reason] = useState('') ; 
    const [cancel_order_border, set_cancel_order_border] = useState(false) ; 

    // == ActivityIndicator attributes
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // == Checkout Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../assets/Font/Ubuntu-Medium.ttf')
            })
           
            setLoadFontValue(true); 
        }; 

        loadFont() ; 
    }); 

    // == Back Handler 
    const Back_Handler = () => {
        navigation.goBack() ; 
    }

    // Focus Handler 
    const OnFocusHandle = (x) => {
       set_cancel_order_border(true) ;    
    }

    // Cancel order process 
    const Cancel_order_process = async ()  => {
        setActivityIndicator(true) ; 
        try{

        }catch{

        }

        setActivityIndicator(false) ; 
    }

    // Cancel order Handler
    const Cancel_order = () => {
        if (cancel_order_reason == ""){
            ToastAndroid.show("Enter order cancel reason", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{

            Alert.alert(
                "Cancel order",
                "Are you sure you want to cancel your order ?",
                [
                  {
                    text: "Yes",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "No", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
    }

    if(loadFontValue){
        return(
            <View style={CancelOrderStyle.CancelOrderScreen}>

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />
                
                {/* == Back Option Container ==  */}

                <View style={CancelOrderStyle.BackImageContainer}>
                
                    <Pressable style={[CancelOrderStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress={Back_Handler}>
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={CancelOrderStyle.BackImage}
                        />
                    
                        <Text style={CancelOrderStyle.BackText}>
                            Cancel order </Text>
                    
                    </Pressable>
            
                </View>

                {/* Mobilenumber input  */}

                <TextInput style={[CancelOrderStyle.InputStyle, {borderColor: cancel_order_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                    placeholder="Enter cancel order reason"
                    placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                    keyboardType="default"
                    value={cancel_order_reason}
                    cursorColor="black"
                    onChangeText={(value) => set_cancel_order_reason(value)}
                    onFocus = {() => OnFocusHandle(0)}
                    />

                {activityIndicator ? 
                    <View style={[CancelOrderStyle.SendCode_Layout]}> <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[CancelOrderStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor,foreground:false}}
                        onPress={Cancel_order}>
                        <Text style={CancelOrderStyle.SendCode_Text}>Cancel order</Text>
                    </Pressable>
                }

            </View>
        )
    }
}

const CancelOrderStyle = StyleSheet.create({
    CancelOrderScreen:{
        backgroundColor:"white", 
        height: "100%", 
        width: "100%"
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

    InputStyle:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor,
        width: '98%', 
        fontFamily: 'Sans', 
        fontSize: 18,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginTop: 15,
        marginBottom: 8, 
        marginLeft: "auto", 
        marginRight:"auto"
    }, 

    SendCode_Layout:{
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        borderRadius: 5, 
        marginTop:15, 
        alignItems:'center',
        paddingTop:6, 
        paddingBottom:6, 
        width: "96%", 
        marginLeft:"auto", 
        marginRight:"auto"
    }, 
    
    SendCode_Text:{
        fontFamily:"Mukta",
        fontSize:19, 
        color:'white'
    }
})