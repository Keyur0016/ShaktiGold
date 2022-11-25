import { View, StyleSheet, Text, Image, StatusBar, 
    Pressable, Alert, ScrollView, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL' ; 
import { useIsFocused } from "@react-navigation/native";

export default function DeleteUpdateProduct({navigation, route}){

    const focus = useIsFocused() ; 

    let CategoryId = route.params.Category_id ; 
    let CategoryName = route.params.Category_name ; 

    // Check font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    // Store Product Data 
    const [productData, set_productData] = useState([]); 

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

            let Fetch_product_url = URL.RequestAPI ; 
            let Fetch_product_data = {
                "Check_status": "Fetch_product",
                "CategoryId" : CategoryId 
            }; 
            let Fetch_product_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Fetch_product_data)
            }; 

            let Fetch_product_request = await fetch(Fetch_product_url, Fetch_product_option); 
            let Fetch_product_response = await Fetch_product_request.json() ; 
            let Fetch_product_STATUS = Fetch_product_response.Status ; 

            if (Fetch_product_STATUS == "Fetch"){
                set_productData([...Fetch_product_response.Product]) ; 
            }
        }

        if (focus == true){
            FetchProductData() ; 
        }


    }, [focus]);

    // Delete Product request 
    const DeleteProduct_request = async (Product_id, index) => {
        
        let Delete_product_url = URL.RequestAPI ; 
        let Delete_product_data = {
            'Check_status' : "Delete_product",
            "CategoryId": CategoryId, 
            "ProductId": Product_id
        }; 
        let Delete_product_option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Delete_product_data)
        }; 

        let Delete_product_request = await fetch(Delete_product_url, Delete_product_option); 
        let Delete_product_response = await Delete_product_request.json() ; 
        let Delete_product_STATUS = Delete_product_response.Status ; 

        if (Delete_product_STATUS == "Delete Product"){
         
            set_productData(productData.splice(index, index)); 

            ToastAndroid.show("Delete Product successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
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
                    backgroundColor="white"
                />

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
 
                                        <Text style={[Product_list_Style.ProductInfo, {marginTop:0}]} >
                                            {element.Product_information}
                                        </Text>

                                        {/* Product Tag number  */}
                                        
                                        <Text style={[Product_list_Style.ProductInfo, {marginTop:0}]}>
                                            Tag number = {element.Product_tag_number}
                                        </Text>

                                        {/* Product Weight  */}

                                        <Text style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}>
                                            Weight = {element.Product_weight}
                                        </Text>
                                        
                                        {/* Product size  */}

                                        <Text style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}>
                                            Size = {element.Product_size}
                                        </Text>
                                        
                                        {/* Product discount price  */}

                                        <Text style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}>
                                            Discount price = {element.Product_discount_price}
                                        </Text>

                                        {/* Product retail price  */}
                                        
                                        <Text style={[Product_list_Style.ProductInfo, {fontFamily:"Sans"}]}>
                                            Retail price = {element.Product_retail_price}
                                        </Text>

                                    </View>

                                </View>

                                <View style={Product_list_Style.DeleteUpdateLayout}>

                                    {/* Delete Product Option  */}
                                    
                                    <Pressable style={Product_list_Style.DeleteButtonLayout}
                                        android_ripple={{color:'#ff2f37'}}
                                        onPress={() => DeleteProduct(element.Product_id, index)}>
                                    
                                        <Text style={Product_list_Style.DeleteButtonText}>
                                            Delete
                                        </Text>
                                    
                                    </Pressable>

                                    {/* Update Product Option  */}
                                    
                                    <Pressable style={[Product_list_Style.DeleteButtonLayout, Product_list_Style.UpdateButtonLayout]}
                                        android_ripple={{color:colorCode.SignupColorCode.OtherButtonRipplerColor}}
                                        onPress={() => UpdateProduct(element)}>
                                        
                                        <Text style={[Product_list_Style.DeleteButtonText, {color:'white'}]}>
                                            Update
                                        </Text>
                                    
                                    </Pressable>

                                </View>
                                  

                            </View>

                        )
                    })}
                </ScrollView>

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
        width: "35%"
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
        marginRight: '5%'
    },
    DeleteButtonText:{
        fontFamily:"Mukta",
        fontSize: 18,
        textAlign: 'center'
    },
    UpdateButtonLayout:{
        backgroundColor: colorCode.SignupColorCode.OtherButtonColor,
    }
})