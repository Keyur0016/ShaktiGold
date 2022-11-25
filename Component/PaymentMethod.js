import { View, StyleSheet, StatusBar, Image, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from './Information/ColorCode' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentOption({navigation, route}){

    // == Table name 
    const {Table_name} = route.params ; 

    // == Check Font loaded or not 
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

    }, []);

    // == Back Press Handler 
    const Back_press_handler = () => {
        navigation.goBack() ; 
    }

    // == Payment method Selector 
    const Payment_method_selector = async (payment_method) => {

        let Order_data = await AsyncStorage.getItem("Order"); 
        Order_data = JSON.parse(Order_data) ;
        Order_data["Payment_method"] = payment_method ; 

        await AsyncStorage.removeItem("Order") ; 
        await AsyncStorage.setItem("Order", JSON.stringify(Order_data)) ;

        navigation.navigate("BillLayout", {"Table_name":Table_name}) ; 
    }
     
    if (loadFontValue){
        return(

            <View style={PaymentOptionStyle.PaymentOptionScreen}>
                    
                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />

                {/* Back Image container */}

                <View style={PaymentOptionStyle.BackImageContainer}>

                    <Pressable style={[PaymentOptionStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress = {Back_press_handler}
                        >

                        <Image
                            source={require('../assets/arrow.png')}
                            style={PaymentOptionStyle.BackImage}
                        />

                        <Text style={PaymentOptionStyle.BackText}>Select Payment Option</Text>
                    
                    </Pressable>
                    
                </View>

                {/* Cash on delivery option  */}

                <Pressable style={PaymentOptionStyle.PaymentOptionLayout}
                    android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                    onPress = {() => Payment_method_selector("Cash on delivery")}>

                    <Image
                        source={require('../assets/Image/CashOnDelivery.png')}
                        style={PaymentOptionStyle.PaymentOptionImage}
                    />
                    <Text style={PaymentOptionStyle.PaymentOptionText}>Cash on delivery</Text>

                </Pressable>

                {/* Make Online payment option  */}

                <Pressable style={PaymentOptionStyle.PaymentOptionLayout}
                    android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                    onPress = {() => Payment_method_selector("Online payment")}>

                    <Image
                        source={require('../assets/Image/OnlinePayment.png')}
                        style={PaymentOptionStyle.PaymentOptionImage}
                    />
                    <Text style={PaymentOptionStyle.PaymentOptionText}>Make online payment</Text>

                </Pressable>

            </View>
        
        )
    }
}

const PaymentOptionStyle = new StyleSheet.create({
    PaymentOptionScreen: {
        backgroundColor: "#ebebeb",
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
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    },

    PaymentOptionLayout:{
        display: "flex", 
        flexDirection: "row", 
        backgroundColor: "white", 
        width: '95%', 
        marginLeft: "auto", 
        marginRight: "auto", 
        elevation: 10,
        shadowColor: "#505050", 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    }, 

    PaymentOptionImage:{
        width: 75, 
        height: 75, 
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    PaymentOptionText:{
        fontFamily: "Ubuntu",
        fontSize: 19, 
        marginTop: "auto", 
        marginBottom: "auto",
        marginLeft: 17
    }

})