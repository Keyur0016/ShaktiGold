import { View, StyleSheet, StatusBar, ActivityIndicator, Pressable, Text, TextInput, ToastAndroid, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 
import * as Font from 'expo-font' ; 
import {WebView} from 'react-native-webview' ; 

export default function UpdatePrice({navigation}){

    // Check, Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    // Border value 
    const [price1Border, set_price1Border] = useState(false) ; 
    const [price2Border, set_price2Border] = useState(false) ; 
    const [price3Border, set_price3Border] = useState(false) ; 
    const [price4Border, set_price4Border] = useState(false) ;  
    const [price5Border, set_price5Border] = useState(false) ; 
    
    // InputValue
    const [price1, set_price1] = useState('') ; 
    const [price2, set_price2] = useState('') ; 
    const [price3, set_price3] = useState('') ; 
    const [price4, set_price4] = useState('') ; 
    const [price5, set_price5] = useState('') ; 

    // === Webview layout === // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 
            set_webview_layout(true) ; 

            let Fetch_price_STATUS = Temp_data.Status ; 

            if (Fetch_price_STATUS == "Fetch"){

                let Fetch_price_information = Temp_data.Price ;

                set_price1(Fetch_price_information[0]['22K_price']); 
                set_price2(Fetch_price_information[0]['18K_price']); 
                set_price3(Fetch_price_information[0]['916_price']);
                set_price4(Fetch_price_information[0]['Silver_price']); 
                set_price5(Fetch_price_information[0]['24K_price']) ; 
            }
            else if (Fetch_price_STATUS == "Not set price"){

                ToastAndroid.show("Today Gold Price not inserted", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                navigation.navigate("UploadPrice") ; 
            }                   

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    // === Update Price layout === // 

    const [update_price_view_layout, set_update_price_view_layout] = useState(true) ; 
    const [update_price_view_url, set_update_price_view_url] = useState('') ; 
    const [update_price_view_value, set_update_price_view_value] = useState(0) ; 

    const Update_price_handling = (event) => {
        
        let Temp_data = event.nativeEvent.data; 
        set_update_price_view_layout(true) ; 
        setActivityIndicator(false) ;  

        try{
            
            Temp_data = JSON.parse(Temp_data) ;

            let Gold_price_STATUS = Temp_data.Status ; 

            if (Gold_price_STATUS == "Update price"){

                ToastAndroid.show("Update price successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                navigation.goBack() ; 

            }
            else{

                ToastAndroid.show("Update price successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                navigation.goBack() ; 

            }




        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

 
    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ; 

        const GetPrice = async () => {

            const date = new Date(); 
            let day = date.getDate() ;
            let month = date.getMonth() + 1 ; 
            let Year = date.getFullYear() ; 

            let Today_date = day + '-' + month + '-' + Year ; 

            let Fetch_price_data = {
                'Check_status': 'Get_gold_price', 
                'Date' : Today_date
            }; 

            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_price_data) ; 
            
            set_web_view_url(web_url) ; 
            
             
        }

        setTimeout(() => {
            
            GetPrice() ; 
        }, 500);

    }, []);

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
        else if (x == 4){
            set_price5Border(true) ;    
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
 
 
        const date = new Date(); 
        let day = date.getDate() ;
        let month = date.getMonth() + 1 ; 
        let Year = date.getFullYear() ; 
 
        let Today_date = day + '-' + month + '-' + Year ; 
 
        if (price5 == ""){
            ToastAndroid.show("Enter 24K gold price", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (price1 == ""){
 
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
 
            setActivityIndicator(true) ; 

            try {
                
                let Gold_price_data = {
                    "Check_status": "Insert_gold_price",
                    'Date': Today_date, 
                    "22K_price": price1, 
                    "18K_price": price2, 
                    "916_price": price3, 
                    "Silver_price": price4, 
                    "24K_price": price5
                }; 

                // Set URL to webview 
                set_update_price_view_url("") ;
                set_update_price_view_layout(false) ; 
                set_update_price_view_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Gold_price_data) ; 
                
                set_update_price_view_url(web_url) ; 
 
                
 
            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }
 
    }

    if (loadFontValue){

        return(
            <ScrollView style={UpdatePriceStyle.UpdatePriceScreen}>
                
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
                
                {!update_price_view_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {update_price_view_value}
                            source={{uri:update_price_view_url}}
                            onMessage={Update_price_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* Update Price Title   */}
                <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceTitle}>Update Gold/Sliver Price</Text>
     
                <View style={UpdatePriceStyle.InputLayout}>
                    
                    {/* 24K gold price title  */}

                    <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceSubtitle}>24K Gold price</Text>

                    {/* 24K gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price5Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="24K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price5}
                        cursorColor="black"
                        onChangeText={(value) => set_price5(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />
                     
                    {/* 22K gold price title  */}

                    <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceSubtitle}>22K Gold price</Text>

                    {/* 22K gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price1Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="22K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price1}
                        cursorColor="black"
                        onChangeText={(value) => set_price1(value)}
                        onFocus = {() => OnFocusHandle(4)}
                    />
                     
                    {/* 18K gold price title   */}

                    <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceSubtitle}>18K Gold price</Text>

                    {/* 18K gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price2Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="18K gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price2}
                        cursorColor="black"
                        onChangeText={(value) => set_price2(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    />
                
                    {/* 916 gold price title  */}

                    <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceSubtitle}>916 Gold price</Text>
                    
                    {/* 916 gold price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price3Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="916 gold price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={price3}
                        cursorColor="black"
                        onChangeText={(value) => set_price3(value)}
                        onFocus = {() => OnFocusHandle(2)}
                    />

                    {/* Silver price title  */}

                    <Text allowFontScaling={false} style={UpdatePriceStyle.UpdatePriceSubtitle}>Silver price</Text>

                    {/* Silver price input  */}

                    <TextInput allowFontScaling={false} style={[UpdatePriceStyle.InputStyle, {borderColor: price4Border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
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
                        <Text allowFontScaling={false} style={UpdatePriceStyle.SendCode_Text}>Update Price</Text>
                    </Pressable>
                    }

                </View>
          
            </ScrollView>
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
    UpdatePriceSubtitle:{
        fontFamily: 'Mukta', 
        fontSize: 18, 
        color: "#464646", 
        marginLeft: 3
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