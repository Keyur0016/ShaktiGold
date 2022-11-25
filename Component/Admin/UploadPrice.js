import { View, StyleSheet, StatusBar, Text, TextInput,
ActivityIndicator, Pressable, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import * as Font from 'expo-font' ; 


export default function UploadPrice(){
    
    // Load require font 
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

    // Border value 
    const [price1Border, set_price1Border] = useState(false) ; 
    const [price2Border, set_price2Border] = useState(false) ; 
    const [price3Border, set_price3Border] = useState(false) ; 
    const [price4Border, set_price4Border] = useState(false) ;                                             

    // InputValue
    const [price1, set_price1] = useState('') ; 
    const [price2, set_price2] = useState('') ; 
    const [price3, set_price3] = useState('') ; 
    const [price4, set_price4] = useState('') ; 

    // ActivityIndicator 
    const [activityIndicator, setActivityIndicator] = useState(false) ; 

    // FocusHandler 

    const OnFocusHandle = (x) => {
        set_price1Border(false) ; 
        set_price2Border(false) ; 
        set_price3Border(false) ; 
        set_price4Border(false) ; 

        if (x == 0){
            set_price1Border(true) ; 
        }
        else if (x == 1){
            set_price2Border(true) ; 
        }
        else if (x == 2){
            set_price3Border(true) ; 
        }
        else{
            set_price4Border(true) ; 
        }
    }

    const PriceInsert_Handler = async () => {

        setActivityIndicator(true); 

        const date = new Date(); 
        let day = date.getDate() ;
        let month = date.getMonth() + 1 ; 
        let Year = date.getFullYear() ; 

        let Today_date = day + '-' + month + '-' + Year ; 

        if (price1 == ""){

            ToastAndroid.show("Enter 22K gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (price2 == ""){

            ToastAndroid.show("Enter 18K gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (price3 == ""){

            ToastAndroid.show("Enter 916 gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (price4 == ""){

            ToastAndroid.show("Enter Silver price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{

            try {
                
                let Gold_price_url = URL.RequestAPI ; 
                let Gold_price_data = {
                    "Check_status": "Insert_gold_price",
                    'Date': Today_date, 
                    "22K_price": price1, 
                    "18K_price": price2, 
                    "916_price": price3, 
                    "Silver_price": price4
                }; 

                let Gold_price_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Gold_price_data)
                }; 
                
                let Gold_price_request = await fetch(Gold_price_url, Gold_price_option); 
                let Gold_price_response = await Gold_price_request.json() ; 
                let Gold_price_STATUS = Gold_price_response.Status; 

                if (Gold_price_STATUS == "Update price"){
                    ToastAndroid.show("Update Price successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }
                else if (Gold_price_STATUS == "Insert price"){
                    ToastAndroid.show("Insert price successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }

            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }

        setActivityIndicator(false) ; 
    }

    if (loadFontValue){

        return(
            <View style={UpdatePriceStyle.UpdatePriceScreen}>
                
                <StatusBar
                    backgroundColor='white'
                />

                {/* Update Price Title   */}
                <Text style={UpdatePriceStyle.UpdatePriceTitle}>Insert Gold/Sliver Price</Text>
     
                <View style={UpdatePriceStyle.InputLayout}>
                    
                    {/* 22K gold price input  */}

                    <TextInput style={[UpdatePriceStyle.InputStyle, {borderColor: price1Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="22K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price1}
                        cursorColor="black"
                        onChangeText={(value) => set_price1(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {/* 18K gold price input  */}

                    <TextInput style={[UpdatePriceStyle.InputStyle, {borderColor: price2Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="18K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price2}
                        cursorColor="black"
                        onChangeText={(value) => set_price2(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    />
                
                    {/* 916 gold price input  */}

                    <TextInput style={[UpdatePriceStyle.InputStyle, {borderColor: price3Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="916 gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price3}
                        cursorColor="black"
                        onChangeText={(value) => set_price3(value)}
                        onFocus = {() => OnFocusHandle(2)}
                    />
                    
                    {/* Silver price input  */}

                    <TextInput style={[UpdatePriceStyle.InputStyle, {borderColor: price4Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Silver price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price4}
                        cursorColor="black"
                        onChangeText={(value) => set_price4(value)}
                        onFocus = {() => OnFocusHandle(3)}
                    />
                    
                    {activityIndicator ? 
                    <View style={[UpdatePriceStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[UpdatePriceStyle.SendCode_Layout]}
                        android_ripple={{color:'#ffd100',foreground:false}}
                        onPress={PriceInsert_Handler}>
                        <Text style={UpdatePriceStyle.SendCode_Text}>Upload price</Text>
                    </Pressable>
                    }

                </View>
          
            </View>
        )
    }
}

const UpdatePriceStyle = StyleSheet.create({
    UpdatePriceScreen: {
        backgroundColor: 'white', 
        height: '100%', 
        width: '100%'
    }, 
    UpdatePriceTitle: {
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'4%',
        marginTop:'5%'
    }, 
    InputLayout: {
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
})