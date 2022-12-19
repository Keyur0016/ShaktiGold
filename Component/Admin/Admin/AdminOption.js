import { View, StyleSheet, 
Pressable, StatusBar, Image, Text, ScrollView, 
Alert, ToastAndroid, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode'; 
import * as Font from 'expo-font'; 
import * as URL from '../Information/RequestURL' ; 
import {WebView} from 'react-native-webview' ; 
import { useIsFocused } from "@react-navigation/native";

export default function AdminOption({navigation}){

    // === Load font === // 

    const [loadFontValue, setLoadFontValue] = useState(false);
    
    // Screen focus or not attributes     
    const isScreenFocus = useIsFocused() ; 

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

    // === All Login Option === // 

    let OptionData = [
        {
            'Title': "Home", 
            'Image': require('../../assets/Image/Home.png')
        },
        {
            'Title': "Upload status", 
            'Image': require('../../assets/Image/Status.png')
        },
        {
            'Title': 'Delete status',
            'Image': require('../../assets/Image/Close_status.png')
        }, 
        {
            'Title': "Update admin password", 
            'Image': require('../../assets/Image/Admin_password.png')
        },
        {
            'Title': "Send notification",
            'Image': require('../../assets/Image/Bell.png')
        },
        {
            'Title': 'Complete order', 
            'Image': require('../../assets/Image/Order.png')
        },
        {
            'Title': 'Create category', 
            'Image': require('../../assets/Image/Create-category.png')
        },
        {
            'Title': 'Update category',
            'Image': require('../../assets/Image/Edit.png')
        },
        {
            'Title': 'Delete category',
            'Image': require('../../assets/Image/Delete.png')
        },
        {
            'Title': 'Set gold price',
            'Image': require('../../assets/Image/Gold_price.png')
        },
        {
            'Title': 'Update gold price',
            'Image': require('../../assets/Image/Gold_price.png')
        },
        {
            'Title': 'Upload product',
            'Image': require('../../assets/Image/Upload_product.png')
        },
        {
            'Title': 'Update product information',
            'Image': require('../../assets/Image/Delete.png')
        },
        {
            'Title': 'Delete product',
            'Image': require('../../assets/Image/Delete_product.png')
        }
    ]
    
    // **** Start Delete status Request Handler **** // 
    
    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 
            set_webview_layout(true) ; 

            if (Temp_data.Status == "Delete_status"){
                ToastAndroid.show("Delete status successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }                     

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    const Delete_status = async () => {
        try{

            let Status_image_request_data = {
                "Check_status":"Status_image_delete"
            }; 

            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Status_image_request_data) ; 
            
            set_web_view_url(web_url) ; 

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // ***** Close Delete status Request Handler ***** // 

    // === Admin Option Navigation Handler === //
     
    const Navigation_handler = (option) => {

        if (option == "Set gold price"){
            navigation.navigate("UploadPrice"); 
        }

        else if (option == "Update gold price"){
            navigation.navigate("UpdatePrice"); 
        }

        else if (option == "Create category"){
            navigation.navigate("CreateCategory", {"Update":"0"}); 
        }

        else if (option == "Upload product"){
            navigation.navigate('SelectCategory', {"Option": "upload product"}) ; 
        }

        else if (option == "Update product information"){
            navigation.navigate('SelectCategory', {"Option": "update product"}) ; 
        }

        else if (option == "Delete product"){
            navigation.navigate("SelectCategory", {"Option": "delete product"}); 
        }

        else if (option == "Update category"){
            navigation.navigate("SelectCategory", {"Option":"Update category"})
        }

        else if (option == "Update admin password"){
            navigation.navigate("UpdateAdminPassword") ; 
        }

        else if (option == "Upload status"){
            navigation.navigate("UploadStatus") ; 
        }

        else if (option == "Delete status"){
            Alert.alert('Delete status',
                'Are you sure you want to delete status ? ', 
                [
                    {
                        text: 'Yes', 
                        onPress: () => Delete_status()
                    }, 
                    {
                        text: "No"
                    }
                ])
        }

        else if (option == "Home"){
            navigation.navigate("Home") ; 
        }

        else if (option == "Delete category"){
            navigation.navigate("SelectCategory", {"Option": "delete category"});
        }

        else if (option == "Send notification"){
            navigation.navigate("SendNotification"); 
        }
        else if (option == "Complete order"){
            navigation.navigate("QrScanner") ; 
        }
    }


    // === Layout === // 

    if(loadFontValue){

        return(
            <ScrollView style={{backgroundColor:'white'}}>
    
                <View style={AdminOptionStyle.AdminOptionScreen}>
    
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
                     
                    {OptionData.map((element) => {
                        return(

                            <Pressable style={AdminOptionStyle.AdminOptionLayout}
                                key={element.Title}
                                onPress={() => Navigation_handler(element.Title)}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}>
    
                                <View style={AdminOptionStyle.AdminOptionSubLayout}>
                                        
                                    <Image
                                        source={element.Image}
                                        style={AdminOptionStyle.AdminOptionImage}
                                    />
    
                                    <Text style={AdminOptionStyle.AdminOptionText}>{element.Title}</Text>
                                
                                </View>
    
                            </Pressable>    

                        )
                    })}
    
                </View>
    
            </ScrollView>
        )

    }

}
const AdminOptionStyle = StyleSheet.create({
    AdminOptionScreen:{
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        flexDirection: 'row'
    }, 

    AdminOptionLayout:{
        backgroundColor: '#f5f5f5',
        width: '40%',
        paddingTop: 20, 
        paddingBottom: 20,
        shadowColor:'#000000',
        elevation: 10, 
        marginTop: 20, 
        marginBottom: 15,
        borderRadius: 5, 
        marginLeft: "5%", 
        marginRight: "5%",
        paddingLeft: 10, 
        paddingRight: 10
    },

    AdminOptionSubLayout:{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems:'center', 
        justifyContent: 'center'
    },
    AdminOptionImage:{
        height: 40,
        width: 40
    }, 
    AdminOptionText:{
        fontFamily: 'Sans',
        fontSize: 17,
        marginTop: 10,
        textAlign:'center'
    }
})