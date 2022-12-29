import { View, StyleSheet, Text, Image, StatusBar, 
    Pressable, Alert, ScrollView, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL' ; 
import { useIsFocused } from "@react-navigation/native";
import {WebView} from 'react-native-webview' ; 
import LoadData from '../OtherComponent/LoadingData' ; 

export default function DeleteUpdateProduct({navigation, route}){

    const focus = useIsFocused() ; 

    let CategoryId = route.params.Category_id ; 
    let CategoryName = route.params.Category_name ; 

    // Check font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    // Store Product Data 
    const [productData, set_productData] = useState([]); 

    // **** Start Fetch category product Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 
    const [load_product_layout, set_load_product_layout] = useState(true) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 
        set_load_product_layout(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Fetch_product_STATUS = Temp_data.Status ; 

            if (Fetch_product_STATUS == "Fetch"){
                set_productData([...Temp_data.Product]) ; 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

    }

    // **** Stop Fetch category product Request Handler **** // 

    // **** Start Delete product from category Request Handler **** // 

    const [delete_product_view_layout, set_delete_product_view_layout] = useState(true) ; 
    const [delete_product_web_url, set_delete_product_web_url] = useState('') ; 
    const [delete_product_view_value, set_delete_product_view_value] = useState(0) ; 
    const [delete_product_index, set_delete_product_index] = useState(0) ; 

    const Delete_product_handling = (event) => {
       
        let Temp_data = event.nativeEvent.data ; 
        set_delete_product_view_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Delete_product_STATUS = Temp_data.Status ; 
    
            if (Delete_product_STATUS == "Delete Product"){
             
                productData.splice(delete_product_index, 1) ;
                set_productData([...productData]) ; 
                
                ToastAndroid.show("Delete Product successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Stop Delete product from category Request Handler **** // 

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
            
        }; 

        loadFont() ; 

        const FetchProductData = async () => {
            
            // Reset Category Product Data 
            set_productData([]) ; 

            let Fetch_product_data = {
                "Check_status": "Get_category_product",
                "CategoryId" : CategoryId 
            }; 
            
            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_product_data) ; 

            set_web_view_url(web_url) ; 
        }

        if (focus == true){

            setTimeout(() => {
                FetchProductData() ; 
            }, 500);
        }


    }, [focus]);

    // Delete Product request 
    const DeleteProduct_request = async (Product_id, index) => {
        
        try{
            let Delete_product_data = {
                'Check_status' : "Delete_product",
                "CategoryId": CategoryId, 
                "ProductId": Product_id
            }; 

            // Set URL to webview 
            set_delete_product_web_url("") ;
            set_delete_product_view_layout(false) ; 
            set_delete_product_view_value(delete_product_view_value + 1) ; 
            set_delete_product_index(index) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Delete_product_data) ; 

            set_delete_product_web_url(web_url) ; 

        }catch{
            
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
    } ; 

    // Delete Product Function 
    const DeleteProduct =  (Product_id, index) => {

        Alert.alert("Delete Product", "Are you sure you want to Delete this Product?", 
        [
            {
                text: 'Yes',
                onPress:() =>  DeleteProduct_request(Product_id, index)
            }, 
            {
                text: 'No'
            }
        ]); 

    }

    // Update Product Function 
    const UpdateProduct = (ProductData) => {
        navigation.navigate("UpdateProduct", {"ProductData":ProductData,
            "Category_name":CategoryName,
            "Category_id":CategoryId}) ; 
    }

    if (loadFontValue){
        return(
            <View style={Product_list_Style.ProductListScreen}>
               
                <StatusBar
                    backgroundColor= {colorCode.SignupColorCode.ButtonColor}
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

                {!delete_product_view_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {delete_product_view_value}
                            source={{uri:delete_product_web_url}}
                            onMessage={Delete_product_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {load_product_layout?<>
                    <LoadData/>
                </>:<>
                    <ScrollView>
                        
                        {productData.map((element, index) => {
                            return(

                                <View style={Product_list_Style.ProductViewContainer}
                                    key={element.Product_key}>

                                    <View style={Product_list_Style.ProductImageInfoLayout}>

                                        <Image
                                            style={Product_list_Style.ProductImage} 
                                            source={{uri:element.Product_image1}}
                                        />

                                        <View style={Product_list_Style.ProductData}>
                                            
                                            {/* Product Information  */}
    
                                            <Text allowFontScaling={false} style={[Product_list_Style.ProductInfo, {marginTop:0}]} >
                                                {element.Product_information}
                                            </Text>

                                            {/* Product Tag number  */}
                                            
                                            <Text allowFontScaling={false} style={[Product_list_Style.ProductInfo, {marginTop:0}]}>
                                                Tag number = {element.Product_tag_number}
                                            </Text>

                                            {/* Product Weight  */}

                                            <Text allowFontScaling={false} style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}>
                                                Weight = {element.Product_weight}
                                            </Text>
                                            
                                            {/* Product size  */}

                                            <Text allowFontScaling={false} style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}>
                                                Size = {element.Product_size}
                                            </Text>
                                            
                                            {/* Product discount price  */}

                                            <Text allowFontScaling={false} style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]} 
                                                 numberOfLines={1}>
                                                Discount price = {element.Product_discount_price}
                                            </Text>

                                            {/* Product retail price  */}
                                            
                                            <Text allowFontScaling={false} style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}
                                                numberOfLines={1}>
                                                Retail price = {element.Product_retail_price}
                                            </Text>

                                        </View>

                                    </View>

                                    <View style={Product_list_Style.DeleteUpdateLayout}>

                                        {/* Delete Product Option  */}
                                        
                                        <Pressable style={Product_list_Style.DeleteButtonLayout}
                                            android_ripple={{color:'#ff2f37'}}
                                            onPress={() => DeleteProduct(element.Product_id, index)}>
                                        
                                            <Text allowFontScaling={false} style={Product_list_Style.DeleteButtonText}>
                                                Delete
                                            </Text>
                                        
                                        </Pressable>

                                        {/* Update Product Option  */}
                                        
                                        <Pressable style={[Product_list_Style.DeleteButtonLayout, Product_list_Style.UpdateButtonLayout]}
                                            android_ripple={{color:colorCode.SignupColorCode.OtherButtonRipplerColor}}
                                            onPress={() => UpdateProduct(element)}>
                                            
                                            <Text allowFontScaling={false} style={[Product_list_Style.DeleteButtonText, {color:'white'}]}>
                                                Update
                                            </Text>
                                        
                                        </Pressable>

                                    </View>
                                    

                                </View>

                            )
                        })}
                    </ScrollView>
                </>}

            </View>
        )
    }
}

const Product_list_Style = StyleSheet.create({
    ProductListScreen: {
        backgroundColor:"#f0f0f0",
        height: '100%',
        width: '100%'
    },

    ProductViewContainer:{
        width: '96%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:10,
        paddingRight:10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5, 
        elevation: 5, 
        shadowColor: colorCode.SignupColorCode.OtherButtonColor
    }, 

    ProductImageInfoLayout:{
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#c3c3c3',
        paddingBottom: 8
    },

    ProductImage:{
        height: 180,
        width: "35%", 
        resizeMode: 'contain'
    }, 

    ProductData:{ 
        marginLeft: '5%',
    },

    ProductInfo:{
        fontFamily: "Mukta", 
        fontSize: 18, 
        marginTop: 4,
        marginBottom: 4
    }, 

    DeleteUpdateLayout:{
        display: "flex", 
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 8
    }, 

    DeleteButtonLayout:{
        width: "40%", 
        backgroundColor: '#ff6368', 
        display: "flex",
        alignItems:'center',
        paddingTop: 5,
        paddingBottom: 5, 
        marginLeft: '5%',
        marginRight: '5%', 
    },

    DeleteButtonText:{
        fontFamily:"Mukta",
        fontSize: 18,
        textAlign: 'center', 
        color: "white"
    },

    UpdateButtonLayout:{
        backgroundColor: colorCode.SignupColorCode.OtherButtonColor,
    }
})