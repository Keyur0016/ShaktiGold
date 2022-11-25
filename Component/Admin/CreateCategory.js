import { View, StyleSheet, StatusBar, Text, TextInput, Pressable, 
Image, ActivityIndicator, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode'; 
import * as URL from '../Information/RequestURL'; 
import * as Font from 'expo-font'; 
import * as ImagePicker from 'expo-image-picker'; 

export default function CreateCategory(){
    
    // Ask MediaLibrary Permission
    ImagePicker.getMediaLibraryPermissionsAsync() ; 

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

    }, []);

    // ActivityIndicator 
    const [activityIndicator, setActivityIndicator] = useState(false); 

    // Border value 
    const [createBorder, set_CreateBorder] = useState(false); 
    const [goldBorder, set_goldBorder] = useState(false); 
    const [silverBorder, set_silverBorder] = useState(false); 

    // Input value
    const [categoryName, set_categoryName] = useState('') ; 
    const [selectCategory, set_selectCategory] = useState(''); 
    const [categoryImage, set_categoryImage] = useState('') ; 
    const [ImagefileData, set_ImagefileData] = useState() ; 

    // Focus Handler 
    const OnFocusHandle = (x) => {
        set_CreateBorder(true); 
    }

    // Select Category Option Handler 
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

    // Show Image for Category Image Handler 

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

    const CreateCategory_Handler = async () => {

        setActivityIndicator(true) ; 

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
                
                let Check_category_url = URL.RequestAPI ; 
                let Check_category_data = {
                    "Check_status" : "Check_category", 
                    "CategoryName" : categoryName, 
                    "CategoryOption" : selectCategory
                }; 
                let Check_category_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Check_category_data)
                }; 

                let Check_category_request = await fetch(Check_category_url, Check_category_option); 
                let Check_category_response = await Check_category_request.json() ; 
                let Check_category_STATUS = Check_category_response.Status ; 

                if (Check_category_STATUS == "Already create category"){

                    ToastAndroid.show("Already create this category", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                }
                else{
                    
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
                           
                            let Create_category_url = URL.RequestAPI ; 
                            let Create_category_data = {
                                'Check_status': 'Create_category', 
                                'CategoryName' : categoryName, 
                                'CategoryOption' : selectCategory,
                                'CategoryImage': Upload_image_url
                            }; 
                            let Create_category_option = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(Create_category_data)
                            } ; 

                            let Create_category_request = await fetch(Create_category_url, Create_category_option) ; 
                            let Create_category_response = await Create_category_request.json() ; 
                            let Create_category_STATUS = Create_category_response.Status ; 

                            if (Create_category_STATUS == "Network request failed"){

                                ToastAndroid.show(Create_category_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                            }
                            else if (Create_category_STATUS == "Already create this category"){

                                ToastAndroid.show(Create_category_STATUS, ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                            }
                            else if (Create_category_STATUS == "Create successfully"){

                                ToastAndroid.show("Create category successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                            }
                            
                        }
                    
                    } catch (error) {
                        
                        ToastAndroid.show("Error in image uploading", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                    }
                       

                    
                }


            } catch (error) {
                
            }
        }

        setActivityIndicator(false) ; 
    }

    if (loadFontValue){

        return(
            <View style={CreateCategoryStyle.CreateCategoryScreen}>
                  
                <StatusBar
                    backgroundColor='white'
                />

                {/* Create Category Title   */}

                <Text style={CreateCategoryStyle.CreateCategoryTitle}>Create Category</Text>
                 
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
                        <Text style={CreateCategoryStyle.SendCode_Text}>Create category</Text>
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