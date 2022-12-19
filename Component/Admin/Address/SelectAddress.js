import { ScrollView, View, StyleSheet, StatusBar, Pressable, 
    Text, ToastAndroid, Image } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL' ; 
import BlurViewLayout from "../OtherComponent/BlurViewLayout";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {WebView} from 'react-native-webview' ; 
import LoadData from '../OtherComponent/LoadingData' ; 

export default function SelectAddress({navigation, route}){
   
    // == Table name 

    const {Table_name} = route.params ; 
   
    // == Screen Focus attributes 

    const isScreenFocus = useIsFocused() ; 
    
    // == Address data

    const [addressData, setAddressData] = useState([]) ; 

    // == Loading Layout 

    const [loading_layout, set_loading_layout] = useState(false) ; 

    // == Disable Navigation bar color

    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 
    
    // == Select address Option attributes 

    const [select_address_option, set_select_address_option] = useState(true); 

    // **** Start Fetch address data Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 
    const [load_select_address_layout, set_load_select_address_layout] = useState(true) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 
        set_load_select_address_layout(false) ; 
        
        try{
            Temp_data = JSON.parse(Temp_data) ; 
            
            if (Temp_data.Status == "Fetch"){
                setAddressData([...Temp_data.Address].reverse()) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

    }

    // **** Close Fetch address data Request Handler **** // 

    // === Load font ==== // 

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

        // --- Start request --- // 

        const Load_address_data = async () => {

            try{

                let Fetch_address_data = {
                    "Check_status": "Fetch_address", 
                    "Table_name": Table_name
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                set_load_select_address_layout(true) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_address_data) ; 
                set_web_view_url(web_url) ; 

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;  
            }
        }

        if (isScreenFocus == true){

            setTimeout(() => {
                Load_address_data() ; 
            }, 500);
        }

        // === Close load address request ==== // 

    }, [isScreenFocus]);

    // **** Start Delete address Request Handler **** //

    const [delete_webview_layout, set_delete_webview_layout] = useState(true) ; 
    const [delete_webview_url, set_delete_webview_url] = useState('') ;
    const [delete_webview_value, set_delete_webview_value] = useState(0) ; 
    const [delete_address_id, set_delete_address_id] = useState('') ; 

    const Delete_address_handling = (event) => {
        
        let Temp_data  = event.nativeEvent.data ; 
        set_delete_webview_layout(true) ;; 
      
        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Delete"){
                
                Disable_loading_layout_handler() ; 

                ToastAndroid.show("Delete address", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                for (let i = 0; i<addressData.length; i++){
                    if (addressData[i].Option == delete_address_id){
                        addressData.splice(i, 1); 
                    }
                }

                setAddressData([...addressData]); 
            }
            else{

                Disable_loading_layout_handler() ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 
    }

    const Delete_address_Handler = async (address_id) => {
       
        Set_loading_layout_handler() ; 

        try{

            Set_loading_layout_handler() ; 

            let Delete_address_data = {
                "Check_status": "Delete_address", 
                "Table_name": Table_name, 
                "Delete_address_id": address_id
            } ;
             
            set_delete_address_id(address_id) ; 

            set_delete_webview_url('') ; 
            set_delete_webview_layout(false) ; 
            set_delete_webview_value(delete_webview_value + 1) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Delete_address_data) ;

            set_delete_webview_url(web_url);             
            

        }catch{

            Disable_loading_layout_handler() ;

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

    }
    
    // ***** Stop Delete address Request Handler **** // 


    const Update_address_Handler = (element) => {
        navigation.navigate("UpdateAddress", {"Address":element, "Table_name":Table_name}) ; 
    }
    
    const Set_loading_layout_handler = () => {
    
        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }

    const Disable_loading_layout_handler = () => {
    
        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    const Back_press_Handler = () => {
        navigation.goBack(); 
    }

    const Add_new_address_handler = () => {
        navigation.navigate("InsertAddress", {"Table_name":Table_name}); 
    }

    const Select_address_option = async (element) => {

        let Order_data = await AsyncStorage.getItem("Order"); 
        Order_data = JSON.parse(Order_data) ; 
        Order_data['Address'] = {
            'Username': element.Data1,
            "Street_address": element.Data2, 
            "Area": element.Data3, 
            "Landmark": element.Data4,
            "Pincode": element.Data5 
        }; 
         
        await AsyncStorage.removeItem("Order") ; 
        await AsyncStorage.setItem("Order", JSON.stringify(Order_data)) ; 

        navigation.navigate("PaymentOption", {"Table_name":Table_name}) ;  
    }

    // === layout === // 

    if (loadFontValue){
        return(
            <View style={SelectAddressStyle.SelectAddressScreen}>

                <StatusBar
                    backgroundColor={navigation_bar_color}
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

                {!delete_webview_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                    }}>
                        <WebView
                        key = {delete_webview_value}
                        source={{uri:delete_webview_url}}
                        onMessage={Delete_address_handling}
                        ></WebView>
                    </View>

                </>:<></>}

                {loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}

                {/* ==== Start back option layout ====  */}

                <View style={SelectAddressStyle.BackImageContainer}>
                                
                    <Pressable style={[SelectAddressStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress = {Back_press_Handler}
                        >
                    
                        <Image
                            source={require('../../assets/arrow.png')}
                            style={SelectAddressStyle.BackImage}
                        />
                    
                        <Text style={SelectAddressStyle.BackText}>Select Address</Text>
                    
                    </Pressable>
        
                </View>

                {/* ==== Close back option layout ====  */}
                 
                {load_select_address_layout?<>
                    <LoadData/>
                </>:<>
                    <ScrollView>

                        {/* == Add new address option ==  */}

                        <Pressable style={SelectAddressStyle.Add_new_address_option}
                            android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                            onPress = {Add_new_address_handler}>
                        
                            <Text style={SelectAddressStyle.SelectAddressText}> Add new address</Text>
                        
                        </Pressable>

                        {addressData.length>0?<>

                            {addressData.map((element, index) => {
                                return(
                                
                                    <View style={SelectAddressStyle.AddressLayout}
                                        key={index}>
                                        
                                        {/* Username information  */}

                                        <Text style={SelectAddressStyle.AddressUsername}>{element.Data1}</Text>
                                        
                                        {/* Street address information  */}
                                        
                                        <Text style={SelectAddressStyle.AddressOtherData}>{element.Data2}</Text>
                                    
                                        {/* Area information  */}
                                        
                                        <Text style={SelectAddressStyle.AddressOtherData}>{element.Data3}, {element.Data4}</Text>
                                        
                                        {/* Pincode information   */}
                                        
                                        <Text style={SelectAddressStyle.AddressOtherData}>Pincode - {element.Data5}</Text>
                                        
                                        {/* == Address Layout option ==  */}

                                        <View style={SelectAddressStyle.AddressOption}>
                                        
                                            {/* Edit Address Option  */}

                                            <Pressable style={[SelectAddressStyle.AddressOptionLayout, 
                                                {marginLeft:0}]}
                                                android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                onPress={() => Update_address_Handler(element)}>

                                                <Text style={SelectAddressStyle.AddressOptionLayoutText}>Edit</Text>
                                            
                                            </Pressable>
                                        
                                            {/* Remove address option  */}

                                            <Pressable style={SelectAddressStyle.AddressOptionLayout}
                                                android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                onPress={() => Delete_address_Handler(element.Option)}>
                                            
                                                <Text style={SelectAddressStyle.AddressOptionLayoutText}>Remove</Text>
                                            
                                            </Pressable>

                                        </View> 

                                        {/* == Select this address option ==  */}

                                        {select_address_option?<>

                                            <Pressable style={SelectAddressStyle.SelectAddressLayout}
                                                android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor}}
                                                onPress = {() => Select_address_option(element)}>

                                                <Text style={SelectAddressStyle.SelectAddressOptionText}>Select this address</Text>
                                            
                                            </Pressable>

                                        </>:<></>}


                                    </View>
                                )
                            } )}
                            </>:<>
                            
                            <Text style={{fontFamily:"Ubuntu", fontSize:19, width:"90%", 
                                marginLeft:"auto", marginRight:"auto", marginTop:"2%", textAlign:"center"}}>Not available any address</Text>

                            </>}


                    </ScrollView>  
                </>}

            </View>
        )
    }
}

const SelectAddressStyle = StyleSheet.create({
    SelectAddressScreen: {
        backgroundColor: '#ebebeb',
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

    Add_new_address_option:{
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        paddingTop: 15,
        paddingBottom: 15 ,
        paddingLeft: 8,
        borderBottomColor: '#a7a7a7',
        borderBottomWidth: 1,
    }, 

    SelectAddressText:{
        fontFamily: 'Ubuntu',
        fontSize: 18,
        color: 'white'
    },

    AddressLayout:{
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        elevation: 10,
        shadowColor: '#c8c8c8'
    },

    AddressUsername:{
        fontFamily: 'Ubuntu',
        fontSize: 17
    },

    AddressOtherData:{
        fontFamily: "Sans",
        fontSize: 17,
        marginTop: 7
    },

    AddressOption:{
        display: "flex",
        flexDirection: "row"
    },

    AddressOptionLayout:{
        backgroundColor: colorCode.HomeScreenColor.PriceInformationTitleColor, 
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 10,
        borderRadius: 5
    }, 
    
    AddressOptionLayoutText:{
        fontFamily: 'Ubuntu',
        fontSize: 15,
        color: 'white'
    }, 

    SelectAddressLayout:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
        alignItems: "center", 
        marginTop: 15 ,
        marginBottom: 8, 
        paddingTop: 10,
        paddingBottom: 10, 
        borderRadius: 8  
    },

    SelectAddressOptionText:{
        fontFamily: "Ubuntu",
        fontSize: 17, 
        color: "black"
    }
})