import { View, ScrollView,Pressable, ActivityIndicator, 
    Text, StyleSheet, KeyboardAvoidingView, TextInput, StatusBar, Image, ToastAndroid  } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL' ; 
import * as ImagePicker from 'expo-image-picker'; 
import { useIsFocused } from "@react-navigation/native";
import {WebView} from 'react-native-webview' ; 

export default function UpdateProduct({navigation, route}){
    
    const {ProductData} = route.params ; 
     
    const focus = useIsFocused() ; 

    let Category_name = route.params.Category_name ; 
    let Category_id = route.params.Category_id ; 

    // --- Input value --- // 

    // View1 Image
    const [Image1, set_Image1] = useState(''); 
    const [Image1Data, set_Image1Data] = useState(null); 
    const [Image1url, set_Image1url] = useState('None'); 
    
    // View2 Image 
    const [Image2, set_Image2] = useState(''); 
    const [Image2Data, set_Image2Data] = useState(null); 
    const [Image2url, set_Image2url] = useState('None'); 
    
    // View3 Image 
    const [Image3, set_Image3] = useState(''); 
    const [Image3Data, set_Image3Data] = useState(null) ; 
    const [Image3url, set_Image3url] = useState('None'); 
     
    // ProductInformation data
    const [ProductInformation, set_ProductInformation] = useState('') ; 
    const [ProductWeight, set_ProductWeight] = useState(''); 
    const [ProductSize, set_ProductSize] = useState(''); 
    const [ProductTag, set_ProductTag] = useState(''); 
    const [Product_discount_price, set_Product_discount_price] = useState(''); 
    const [Product_retail_price, set_Product_retail_price] = useState(''); 

    // Check Font loaded or not 
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

        const Set_product_data = () => {
            
            // Set Product view1 Image 
            set_Image1(ProductData.Product_image1); 

            // Set Product view2 Image 
            set_Image2(ProductData.Product_image2); 

            // Set Product view3 Image 
            set_Image3(ProductData.Product_image3) ; 

            // Product Data
            set_ProductInformation(ProductData.Product_information); 
            set_ProductWeight(ProductData.Product_weight); 
            set_ProductSize(ProductData.Product_size); 
            set_ProductTag(ProductData.Product_tag_number) ; 
            set_Product_retail_price(ProductData.Product_retail_price) ; 
            set_Product_discount_price(ProductData.Product_discount_price) ; 
        }; 
  
        if (focus == true){

            Set_product_data() ; 
        }

    }, [focus]);

    // --- Border value --- // 

    const [ProductInformation_border, set_ProductInformation_border] = useState(false); 
    const [ProductWeight_border, set_ProductWeight_border] = useState(false); 
    const [ProductSize_border, set_ProductSize_border] = useState(false); 
    const [ProductTag_border, set_ProductTag_border] = useState(false); 
    const [ProductRetailPrice_border, set_ProductRetailPrice_border] = useState(false); 
    const [ProductDiscountPrice_border, set_ProductDiscountPrice_border] = useState(false); 

    // --- Input widget for focus handler --- //

    const OnFocusHandle = (x) => {
        set_ProductInformation_border(false);
        set_ProductWeight_border(false);
        set_ProductSize_border(false); 
        set_ProductTag_border(false); 
        set_ProductRetailPrice_border(false); 
        set_ProductDiscountPrice_border(false); 

        if (x == 0){
            set_ProductInformation_border(true); 
        }
        else if (x == 1){
            set_ProductWeight_border(true); 
        }
        else if (x == 2){
            set_ProductSize_border(true);
        }
        else if (x == 3){
            set_ProductTag(true); 
        }
        else if (x == 4){
            set_ProductDiscountPrice_border(true);
        }
        else{
            set_ProductRetailPrice_border(true); 
        }
    }

    // --- Product view Image Picker  --- // 

    const Select_ProductImage_Selector = async (Image_selector) => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6,
        });

        if ( 'uri' in result){
            let TempData = {uri: result.uri,
                type: `test/${result.uri.split('.')[1]}`,
                name: `test.${result.uri.split(".")[1]}`}
            
            if (Image_selector == 0){
                 
                set_Image1(result.uri);
                set_Image1Data(TempData); 
            }    
            else if (Image_selector == 1){

                set_Image2(result.uri);
                set_Image2Data(TempData);  
            }
            else{
              
                set_Image3(result.uri);
                set_Image3Data(TempData);  
            }
        }
    }

    // === Webview layout === // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 
        setActivityIndicator(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Update_product_STATUS = Temp_data.Status ; 
                
            if (Update_product_STATUS == "Update Product"){

                navigation.navigate("DeleteUpdateProduct", {"Category_id":Category_id, 'Category_name': Category_name});

                ToastAndroid.show("Update Product successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }


    // Activity Indicator 
    const [activityIndicator, setActivityIndicator] = useState(false); 

    const Update_product_Handler = async () => {
        
        
        if (Image1 == "" && Image2 == "" && Image3 == ""){
            
            ToastAndroid.show("Please, Select at least one Product image", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (Image1 == ""){
            
            ToastAndroid.show("Please, Select Product view1 image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else if (ProductInformation == ""){

            ToastAndroid.show("Enter Product Information", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (ProductWeight == ""){

            ToastAndroid.show("Enter Product Weight", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (ProductSize == ""){
            
            ToastAndroid.show("Enter Product Size", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (ProductTag == ""){
            
            ToastAndroid.show("Enter Product Tag number", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (Product_discount_price == ""){
            
            ToastAndroid.show("Enter Product Discount Price", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (Product_retail_price == ""){
            
            ToastAndroid.show("Enter Product Retail Price", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
            setActivityIndicator(true); 

            let Image1_response_url = "None" ; 
            let Image2_response_url = "None" ; 
            let Image3_response_url = "None" ; 

            // ==== Upload Image1 ==== // 
            
            if (Image1Data != null){
                 
                try {
                    
                    const Image1SendData = new FormData(); 
                    Image1SendData.append('file', Image1Data); 
                    Image1SendData.append('upload_preset', 'Shaktigold'); 
                    Image1SendData.append('cloud_name', 'smartinfo'); 
    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/smartinfo/image/upload', {
                        method : 'post', 
                        body   : Image1SendData
                    }); 
    
                    let Upload_image_response = await Upload_image.json() ; 
    
                    if (Upload_image_response != null){
    
                        Image1_response_url = Upload_image_response.url ; 

                        ToastAndroid.show("View1 image update successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
                    }
                    
                } catch (error) {
                    
                    ToastAndroid.show("View1 image uploading failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                }
            }

            // === Upload Image2  === // 
               
            if (Image2Data != null){

                try {
                    
                    const Image2SendData = new FormData(); 
                    Image2SendData.append('file', Image2Data); 
                    Image2SendData.append('upload_preset', 'Shaktigold'); 
                    Image2SendData.append('cloud_name', 'smartinfo'); 
    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/smartinfo/image/upload', {
                        method : 'post', 
                        body   : Image2SendData
                    }); 
    
                    let Upload_image_response = await Upload_image.json() ;
    
                    if (Upload_image_response != null){
    
                        Image2_response_url = Upload_image_response.url ; 

                        ToastAndroid.show("View2 image update successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
                    }
                } catch (error) {
                    
                    ToastAndroid.show("View2 image uploading failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                    
                }
            }
            
            // === Upload Image3 === // 

            if (Image3Data != null){

                try {
                    
                    const Image3SendData = new FormData(); 
                    Image3SendData.append('file', Image3Data); 
                    Image3SendData.append('upload_preset', 'Shaktigold'); 
                    Image3SendData.append('cloud_name', 'smartinfo'); 
                    
                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/smartinfo/image/upload', {
                        method : 'post', 
                        body   : Image3SendData
                    }); 
                    
                    let Upload_image_response = await Upload_image.json() ;
                    
                    if (Upload_image_response != null){
    
                        Image3_response_url = Upload_image_response.url ; 

                        ToastAndroid.show("View3 image update successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                    }
                } catch (error) {
                    
                    ToastAndroid.show("View3 image uploading failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
                }
            }

            try {
                
                let Update_product_data = {
                    "Check_status": "Update_product",
                    "CategoryId": Category_id,
                    "Product_id": route.params.ProductData.Product_id,
                    "View1":  Image1Data!=null? Image1_response_url:Image1,
                    "View2": Image2Data!=null? Image2_response_url:Image2,
                    "View3": Image3Data!=null? Image3_response_url:Image3,
                    "ProductInformation": ProductInformation,
                    "ProductWeight": ProductWeight,
                    "ProductSize": ProductSize,
                    "ProductTag": ProductTag,
                    "Product_discount_price": Product_discount_price,
                    "Product_retail_price": Product_retail_price
                } ; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Update_product_data) ; 
                
                set_web_view_url(web_url) ;
                
            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }

    }

    if (loadFontValue){

        return(
            <KeyboardAvoidingView style={UpdateProductStyle.UploadProductScreen}>
                 
                <StatusBar
                    backgroundColor = {colorCode.SignupColorCode.ButtonColor}
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

                <Text allowFontScaling={false} style={UpdateProductStyle.UploadProductTitle}>Update Product in {Category_name}</Text>
                
                <ScrollView>
                    
                    {/* Select View1 Image  */}

                    <View style={UpdateProductStyle.uploadImageMainLayout}>
                        
                        {Image1 != ""?
                            <Image
                                source={{uri:Image1}}
                                style={UpdateProductStyle.UploadProductImage}
                            />
                        :<></>}

                        <Pressable style={UpdateProductStyle.UploadProductImageSelect}
                            android_ripple={{color:colorCode.SignupColorCode.OtherButtonRipplerColor}}
                            onPress={() => Select_ProductImage_Selector(0)}>
                            <Text allowFontScaling={false} style={UpdateProductStyle.UploadImageSelectText}>Select Product View1</Text>
                        </Pressable>

                    </View>
                
                    {/* Select View2 Image  */}

                    <View style={UpdateProductStyle.uploadImageMainLayout}>
                        
                        {Image2 != "None"?
                            <Image
                                source={{uri:Image2}}
                                style={UpdateProductStyle.UploadProductImage}
                            />
                        :<></>}

                        <Pressable style={UpdateProductStyle.UploadProductImageSelect}
                            android_ripple={{color:colorCode.SignupColorCode.OtherButtonRipplerColor}}
                            onPress={() => Select_ProductImage_Selector(1)}>
                            <Text allowFontScaling={false} style={UpdateProductStyle.UploadImageSelectText}>Select Product View2</Text>
                        </Pressable>

                    </View>

                    {/* Select View3 Image  */}
                    
                    <View style={UpdateProductStyle.uploadImageMainLayout}>
                        
                        {Image3 != "None"?
                            <Image
                                source={{uri:Image3}}
                                style={UpdateProductStyle.UploadProductImage}
                            />
                        :<></>}

                        <Pressable style={UpdateProductStyle.UploadProductImageSelect}
                            android_ripple={{color:colorCode.SignupColorCode.OtherButtonRipplerColor}}
                            onPress={() => Select_ProductImage_Selector(2)}>
                            <Text allowFontScaling={false} style={UpdateProductStyle.UploadImageSelectText}>Select Product View3</Text>
                        </Pressable>

                    </View>

                    {/* Product Information input  */}

                    <Text allowFontScaling={false} style={UpdateProductStyle.ProductOtherSubtitle}>Product information</Text>

                    <TextInput allowFontScaling={false} style={[UpdateProductStyle.ProductInputStyle, {borderColor: ProductInformation_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Product information"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={ProductInformation}
                        cursorColor="black"
                        onChangeText={(value) => set_ProductInformation(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />

                    {/* Product Weight input  */}

                    <Text allowFontScaling={false} style={UpdateProductStyle.ProductOtherSubtitle}>Product Weight in gm</Text>

                    <TextInput allowFontScaling={false} style={[UpdateProductStyle.ProductInputStyle, {borderColor: ProductWeight_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Product Weight"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={ProductWeight}
                        cursorColor="black"
                        onChangeText={(value) => set_ProductWeight(value)}
                        onFocus = {() => OnFocusHandle(1)}
                    />
                     
                    {/* Product size input  */}

                    <Text allowFontScaling={false} style={UpdateProductStyle.ProductOtherSubtitle}>Product size</Text>

                    <TextInput allowFontScaling={false} style={[UpdateProductStyle.ProductInputStyle, {borderColor: ProductSize_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Product size"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={ProductSize}
                        cursorColor="black"
                        onChangeText={(value) => set_ProductSize(value)}
                        onFocus = {() => OnFocusHandle(2)}
                    />

                    {/* Product tag name information  */}
                  
                    <Text allowFontScaling={false} style={UpdateProductStyle.ProductOtherSubtitle}>Tag number</Text>
                    
                    <TextInput allowFontScaling={false} style={[UpdateProductStyle.ProductInputStyle, {borderColor: ProductTag_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Tag name"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={ProductTag}
                        cursorColor="black"
                        autoCapitalize="characters"
                        onChangeText={(value) => set_ProductTag(value)}
                        onFocus = {() => OnFocusHandle(3)}
                    />

                    {/* Product retail price information  */}

                    <Text allowFontScaling={false} style={UpdateProductStyle.ProductOtherSubtitle}>Product retail price</Text>
 
                    <TextInput allowFontScaling={false} style={[UpdateProductStyle.ProductInputStyle, {borderColor: ProductRetailPrice_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Product retail price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={Product_retail_price}
                        cursorColor="black"
                        onChangeText={(value) => set_Product_retail_price(value)}
                        onFocus = {() => OnFocusHandle(5)}
                    />
                    {/* Product discount information  */}

                    <Text allowFontScaling={false} style={UpdateProductStyle.ProductOtherSubtitle}>Product discount price</Text>
 
                    <TextInput allowFontScaling={false} style={[UpdateProductStyle.ProductInputStyle, {borderColor: ProductDiscountPrice_border ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Product discount price"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="number-pad"
                        value={Product_discount_price}
                        cursorColor="black"
                        onChangeText={(value) => set_Product_discount_price(value)}
                        onFocus = {() => OnFocusHandle(4)}
                    />

                    
                    {activityIndicator ? 
                    <View style={[UpdateProductStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[UpdateProductStyle.SendCode_Layout]}
                        android_ripple={{color:'#ffd100',foreground:false}}
                        onPress={Update_product_Handler}>
                        <Text allowFontScaling={false} style={UpdateProductStyle.SendCode_Text}>Upload product</Text>
                    </Pressable>
                    }

                </ScrollView>


            </KeyboardAvoidingView>
        )
    }
}

const UpdateProductStyle = StyleSheet.create({
    UploadProductScreen: {
        backgroundColor: 'white', 
        height: '100%', 
        width: '100%'
    }, 
    UploadProductTitle:{
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'4%',
        marginTop:'3%'
    }, 
    uploadImageMainLayout:{
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#f4f4f4',
        paddingTop: 10,
        paddingBottom: 10, 
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    UploadProductImage:{
        height: 180,
        width: '95%', 
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'stretch'
    }, 
    UploadProductImageSelect:{
        backgroundColor: colorCode.SignupColorCode.OtherButtonColor,
        display: 'flex',
        alignItems: 'center', 
        paddingTop: 10,
        paddingBottom: 10,
        marginTop:8,
        marginBottom:8,
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5
    }, 
    UploadImageSelectText:{
        fontFamily: "Mukta",
        fontSize:18,
        color: 'white'
    }, 
    ProductOtherSubtitle:{
        fontFamily: 'Mukta', 
        fontSize: 19, 
        color: "#464646", 
        marginLeft: '4%'
    }, 
    ProductInputStyle:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor,
        width: '100%', 
        fontFamily: 'Sans', 
        fontSize: 18,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginTop: 8,
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
        paddingBottom:10
    }, 
    SendCode_Text:{
        fontFamily:"Mukta",
        fontSize:18, 
        color:'black',
    }
})