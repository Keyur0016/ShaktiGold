import { View, StyleSheet, StatusBar, Text, TextInput, Pressable, 
Image, ActivityIndicator, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 
import * as Font from 'expo-font'; 
import * as ImagePicker from 'expo-image-picker'; 
import {WebView} from 'react-native-webview' ; 

export default function CreateCategory({navigation, route}){

    // === Set Route attributes === // 
    
    const {Update, Name, Option, Table, ImageURL} = route.params ; 
    
    // === ImagePicker Premission === //  
    
    ImagePicker.getMediaLibraryPermissionsAsync() ; 

    // === Load font === // 

    const [loadFontValue, setLoadFontValue] = useState(false);

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 

            if (Update == "1"){

                // Set Category name 

                set_categoryName(Name) ; 
                set_previousName(Name) ; 
                
                // Set Category Option 

                if (Option == "Gold"){

                    set_goldBorder(true); 
                    set_silverBorder(false) ; 
                    set_selectCategory("Gold"); 
                }
                else{
                    set_goldBorder(false) ; 
                    set_silverBorder(true) ; 
                    set_selectCategory("Silver"); 
                }

                // Set Category Image 

                set_categoryImage(ImageURL) ; 
                set_previous_image(ImageURL) ; 
            }
            
        }; 

        loadFont() ; 

    }, []);

    // === Input focus attributes === // 
    
    const [createBorder, set_CreateBorder] = useState(false); 
    const [goldBorder, set_goldBorder] = useState(false); 
    const [silverBorder, set_silverBorder] = useState(false); 
    
    // **** Start create category Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ;         
        setActivityIndicator(false) ; 
        set_webview_layout(true) ; 


        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Create_category_STATUS = Temp_data.Status ; 
    
            if (Create_category_STATUS == "Network request failed"){

                ToastAndroid.show(Create_category_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
            else if (Create_category_STATUS == "Already create this category"){

                ToastAndroid.show(Create_category_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
            else if (Create_category_STATUS == "Create successfully"){

                ToastAndroid.show("Create category successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                
                if (Update == "1"){
                    navigation.navigate("AdminOption") ; 
                }else{
                    navigation.goBack() ; 
                }
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    // **** Stop create category Request Handler **** // 

    // **** Start check category Request Handler **** // 

    const [category_check_layout, set_category_check_layout] = useState(true) ; 
    const [category_check_url, set_category_check_url] = useState('') ; 
    const [category_check_value, set_category_check_value] = useState(0) ; 

    const Category_check_message = async (event) => {
        let Temp_data = event.nativeEvent.data ; 
        
        try{
           
            Temp_data = JSON.parse(Temp_data) ; 
            let Check_category_STATUS = Temp_data.Status ; 
                
            set_category_check_layout(true) ; 
            setActivityIndicator(false) ; 

            if (Check_category_STATUS == "Already create category"){

                ToastAndroid.show("Already create this category", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
            else{
                
                if (Update == "0"){

                    try {
                        
                        const ImageData = new FormData() ; 
                        ImageData.append('file', ImagefileData); 
                        ImageData.append('upload_preset', 'Shaktigold'); 
                        ImageData.append('cloud_name', 'smartinfo'); 
                        
                        let Upload_image = await fetch('https://api.cloudinary.com/v1_1/smartinfo/image/upload', {
                            method : 'post', 
                            body   : ImageData
                        }); 
    
                        let Upload_image_response = await Upload_image.json() ; 

                        ToastAndroid.show("Image upload successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                        
                        if (Upload_image_response != null){

                            let Upload_image_url = Upload_image_response.url ; 
                            
                            let Create_category_data = {
                                'Check_status': 'Create_category', 
                                'CategoryName' : categoryName, 
                                'CategoryOption' : selectCategory,
                                'CategoryImage': Upload_image_url, 
                                'Update': '0',
                                'last_name': 'None'
                            }; 
                                
                            // Set URL to webview 
                            set_web_view_url("") ;
                            set_webview_layout(false) ; 
                            set_webview_value(webview_value + 1) ; 
                            
                            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Create_category_data) ; 
                            console.log(web_url);
                            
                            set_web_view_url(web_url) ; 
                            
                        }
                    
                    } catch (error) {
                        
                        ToastAndroid.show("Error in image uploading", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                    }
                }
                else{
                    try {
                     
                        let Image_url = "" ; 

                        if (previous_image != categoryImage){
                            const ImageData = new FormData() ; 
                            ImageData.append('file', ImagefileData); 
                            ImageData.append('upload_preset', 'Shaktigold'); 
                            ImageData.append('cloud_name', 'smartinfo'); 
                            
                            let Upload_image = await fetch('https://api.cloudinary.com/v1_1/smartinfo/image/upload', {
                                method : 'post', 
                                body   : ImageData
                            }); 
        
                            let Upload_image_response = await Upload_image.json() ; 
                            Image_url = Upload_image_response.url ; 
    
                            ToastAndroid.show("Image upload successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                        }
                            
                        setActivityIndicator(true) ; 
                        
                        let Create_category_data = {
                            'Check_status': 'Create_category', 
                            'CategoryName' : categoryName, 
                            'CategoryOption' : selectCategory,
                            'CategoryImage': previous_image!=categoryImage?Image_url:previous_image,
                            'Update': '1',
                            'last_name': previousName
                        }; 
                            
                        // Set URL to webview 
                        set_web_view_url("") ;
                        set_webview_layout(false) ; 
                        set_webview_value(webview_value + 1) ; 
                        
                        let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Create_category_data) ; 
                        
                        set_web_view_url(web_url) ;
                            
                    
                    } catch (error) {
                        
                        ToastAndroid.show("Error in image uploading", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                    }
                }
                    

                
            }
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Close check category Request Handler **** // 

    // === Input value === // 

    const [categoryName, set_categoryName] = useState('') ; 
    const [previousName, set_previousName] = useState('') ; 
    const [selectCategory, set_selectCategory] = useState(''); 
    const [categoryImage, set_categoryImage] = useState('') ;
    const [previous_image, set_previous_image] = useState('') ;  
    const [ImagefileData, set_ImagefileData] = useState() ; 
    const [activityIndicator, setActivityIndicator] = useState(false); 

    // === Input focus handler === // 

    const OnFocusHandle = (x) => {
        set_CreateBorder(true); 
    }

    // === Category option select handler === // 
    
    const CategorySelect_Handler = (category) => {
       
        if (category == "Gold"){
            set_goldBorder(true); 
            set_silverBorder(false);
            set_selectCategory("Gold"); 
        }
        else{
            set_goldBorder(false) ; 
            set_silverBorder(true); 
            set_selectCategory("Silver"); 
        }
    }

    // === Category Image picker === // 

    const CategoryImage_Handler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6,
        });

        if ( 'uri' in result){
            let ImageFile = { uri: result.uri, 
                type: `test/${result.uri.split('.')[1]}`,
                name: `test.${result.uri.split(".")[1]}`}
            
            set_ImagefileData(ImageFile) ; 
            set_categoryImage(result.uri); 
        }
    }

    // === Create category request handler === // 

    const CreateCategory_Handler = async () => {
        
        
        if (categoryName == ""){
            
            ToastAndroid.show("Enter category name", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (selectCategory == ""){
            
            ToastAndroid.show("Please, Select category", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else if (categoryImage == ""){
            
            ToastAndroid.show("Select category image", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
        else{
            
            try {
                
                setActivityIndicator(true) ; 

                let Check_category_data = {
                    "Check_status" : "Check_category", 
                    "CategoryName" : categoryName, 
                    "CategoryOption" : selectCategory
                }; 

                // Set URL to webview 
                set_category_check_url("") ;
                set_category_check_layout(false) ; 
                set_category_check_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Check_category_data) ; 
                
                set_category_check_url(web_url) 


            } catch (error) {
                
            }
        }

    }

    // === Layout === // 
    
    if (loadFontValue){

        return(
            <View style={CreateCategoryStyle.CreateCategoryScreen}>
                  
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

               {!category_check_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {category_check_value}
                            source={{uri:category_check_url}}
                            onMessage={Category_check_message}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* Create Category Title   */}

                <Text style={CreateCategoryStyle.CreateCategoryTitle}>{Update == "1"?"Update":"Create"} Category</Text>
                 
                {/* Input Option layout   */}

                <View style={CreateCategoryStyle.InputLayout}>
                    
                    {/* Mobilenumber input  */}

                    <TextInput style={[CreateCategoryStyle.InputStyle, {borderColor: createBorder ? colorCode.SignupColorCode.InputBorderColor : 'transparent'}]}
                        placeholder="Category name"
                        placeholderTextColor = {colorCode.SignupColorCode.InputPlaceholderColor} 
                        keyboardType="default"
                        value={categoryName}
                        cursorColor="black"
                        onChangeText={(value) => set_categoryName(value)}
                        onFocus = {() => OnFocusHandle(0)}
                    />
                    
                    {/* Select Category option  */}

                    <View style={CreateCategoryStyle.SelectCategoryLayout}>

                        {/* Select category Title  */}
 
                        <Text style={CreateCategoryStyle.SelectCategoryTitle}>Select Category</Text>
                          
                        {/* Gold and Silver selection option  */}

                        <View style={CreateCategoryStyle.SelectOption}>
                            
                            {/* Gold option  */}

                            <Pressable style={[CreateCategoryStyle.SelectionOptionLayout, {borderWidth: goldBorder? 1:0}]}
                                onPress={() => CategorySelect_Handler("Gold")}>
                                <Text style={CreateCategoryStyle.SelectionOptionText}>Gold</Text>
                            </Pressable>
                        
                            {/* Silver Option  */}

                            <Pressable style={[CreateCategoryStyle.SelectionOptionLayout, {marginLeft:15, borderWidth: silverBorder ? 1:0}]}
                                onPress={() => CategorySelect_Handler("Silver")}>
                                <Text style={CreateCategoryStyle.SelectionOptionText}>Sliver</Text>
                            </Pressable>

                        </View>
                    
                    </View>
                    
                    {/* Select Category Image Title  */}
     
                    <Text style={CreateCategoryStyle.SelectCategoryTitle}>Select Category Image</Text>
                    
                    {categoryImage != ""?
                    <Image
                        source={{uri:categoryImage}}
                        style={CreateCategoryStyle.CategoryImage}
                    />
                    :<></>}
                    
                    
                    {/* Category Image Picker  */}

                    <Pressable style={[CreateCategoryStyle.SelectionOptionLayout, 
                        {width:'25%', alignItems:'center', backgroundColor:colorCode.SignupColorCode.OtherButtonColor}]}
                        android_ripple={{color:colorCode.SignupColorCode.OtherButtonRipplerColor}}
                        onPress={() => CategoryImage_Handler()}>

                        <Text style={[CreateCategoryStyle.SelectionOptionText, {color:'white'}]}>Select</Text>
                    
                    </Pressable>
                    
                    {/* Create Category Button  */}

                    {activityIndicator ? 
                    <View style={[CreateCategoryStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[CreateCategoryStyle.SendCode_Layout]}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor,foreground:false}}
                        onPress={CreateCategory_Handler}>
                        <Text style={CreateCategoryStyle.SendCode_Text}>{Update == "1"?"Update":"Create"} category</Text>
                    </Pressable>
                    }

                </View>

               

            </View>
        )
    }
}

const CreateCategoryStyle = StyleSheet.create({
    CreateCategoryScreen:{
        backgroundColor:'white',
        height: '100%',
        width: '100%'
    },
    CreateCategoryTitle:{
        fontFamily: 'Mukta',
        fontSize: 24,
        color: 'black',
        marginLeft:'4%',
        marginTop:'5%'
    },
    InputLayout:{
        width: '94%',
        marginLeft:'auto',
        marginRight:'auto', 
        marginTop: '1%'
    }, 
    InputStyle:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor,
        width: '100%', 
        fontFamily: 'Sans', 
        fontSize: 17,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginTop: 8,
        marginBottom: 8
    }, 
    SelectCategoryLayout:{
        width:'100%',
        marginTop: '1%',
        marginBottom: '3%'
    }, 
    SelectCategoryTitle:{
        fontFamily: 'Mukta',
        fontSize: 18
    }, 
    SelectOption:{
        width: '100%',
        display: 'flex', 
        alignItems:'center',
        textAlign: 'center', 
        flexDirection:'row',
        marginTop: '1%',
        marginBottom: '1%'
    },
    SelectionOptionLayout:{
        backgroundColor: colorCode.SignupColorCode.InputBackgroundColor, 
        paddingTop: 10,
        paddingBottom: 10, 
        paddingLeft: 15,
        paddingRight: 15, 
        marginTop: 8, 
        borderColor: colorCode.SignupColorCode.InputBorderColor
    }, 
    SelectionOptionText:{
        fontFamily: 'Sans', 
        fontSize: 18
    }, 
    CategoryImage:{
        height: 150,
        width: 150, 
        marginTop: 10, 
        marginBottom: 10
    }, 
    SendCode_Layout:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor,
        borderRadius: 5, 
        marginTop:40, 
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