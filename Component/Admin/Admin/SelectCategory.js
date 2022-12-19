 import { View, StyleSheet, StatusBar, ScrollView, Text, Pressable, Alert, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as URL from '../Information/RequestURL' ; 
import * as colorCode from '../Information/ColorCode'; 
import {WebView} from 'react-native-webview' ; 
import LoadData from '../OtherComponent/LoadingData' ; 

export default function SelectCategory({navigation, route}){
    
    // === Set route attributes === // 
    
    const Option_title = route.params.Option; 
    
    // === Gold category data === // 

    const [gold, set_gold] = useState([]);

    // === Silver category data === // 

    const [silver, set_silver] = useState([]); 

    // === Load font === // 

    const [loadFontValue, setLoadFontValue] = useState(false); 

    // *** Start gold category product fetch Request Handler *** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;      

    const Message_handling = async (event) => {

        let Temp_data =  (event.nativeEvent.data)   ;
        set_webview_layout(true) ; 
        try{
            

            set_gold([]) ; 

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Fetch"){
                set_gold([...Temp_data.Data]) ; 
            }

        }catch{
            
        }

    }

    // *** Stop gold category product fetch Request Handler *** // 

    // *** Start silver category fetch Request Handler *** // 

    const [silver_webview_layout, set_silver_webview_layout] = useState(true) ; 
    const [silver_webview_url, set_silver_webview_url] = useState('') ; 
    const [silver_webview_value, set_silver_webview_value] = useState(0) ; 
    const [load_category_fetch_layout, set_load_category_fetch_layout] = useState(true) ; 

    const Silver_webview_handing = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_silver_webview_layout(true) ; 
        set_load_category_fetch_layout(false) ; 

        try{

            set_silver([]) ; 

            Temp_data = JSON.parse(Temp_data) ; 
            
            if (Temp_data.Status == "Fetch"){

                set_silver([...Temp_data.Data]) ; 
            }
            
        }catch{}
    }

    // *** Stop silver category fetch Request Handler *** // 

    // *** Start Delete category fetch Request Handler *** // 

    const [delete_webview_layout, set_delete_webview_layout] = useState(true) ; 
    const [delete_webview_url, set_delete_webview_url] = useState('') ; 
    const [delete_webview_value, set_delete_webview_value] = useState(0) ; 

    const Delete_webview_handling = (event) => {
                
        let Temp_data = event.nativeEvent.data ; 
        set_delete_webview_layout(true) ; 

        try{


            Temp_data = JSON.parse(Temp_data) ; 

            let Delete_category_Status = Temp_data.Status ; 
            
            if (Delete_category_Status == "Delete"){
                
                ToastAndroid.show("Delete category successfully",ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                navigation.goBack() ; 
            }
            else{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    const Delete_category_handler = async (category_id) => {
        try{

            let Delete_category_data = {
                "Check_status":"Delete_category",
                "Category_id": category_id
            } ; 

            // Set URL to webview 
            set_delete_webview_url("") ;
            set_delete_webview_layout(false) ; 
            set_delete_webview_value(delete_webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Delete_category_data) ; 
            set_delete_webview_url(web_url) ; 
           

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // *** Stop Delete category fetch Request Handler *** // 
       
    useEffect(() => {

        const Load_category_data = async() => {
            
            // === Fetch gold product list === // 

            let Get_category_data = {
                'Check_status': 'Get_gold_category'
            }; 
            
            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            
            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Get_category_data) ; 
            set_web_view_url(web_url) ; 

            // // === Fetch silver product list === // 

            let Silver_category_data = {
                'Check_status': 'Get_silver_category'
            }; 

            // Set URL to Silver webview 
            set_silver_webview_url("") ; 
            set_silver_webview_layout(false) ; 
            set_silver_webview_value(silver_webview_value + 1); 

            let Silver_webview_url = URL.RequestAPI + "?data=" + JSON.stringify(Silver_category_data) ; 
            set_silver_webview_url(Silver_webview_url) ; 

        }; 

        setTimeout(() => {
            
            Load_category_data() ; 

        }, 500);

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
            
        }; 

        loadFont() ; 

    }, []);


    // === Category option press request handler === // 

    const Category_press_Handle = (access_category_name, access_category_table, access_category_option, access_category_image) => {

        if (Option_title == "upload product"){

            navigation.navigate("UploadProduct", {"Category_name": access_category_name, 
                "Category_option": access_category_option,
                "Category_id": access_category_table}
            ) ; 
        
        }

        else if (Option_title == "update product"){
            navigation.navigate("DeleteUpdateProduct", {"Category_name": access_category_name, 
            "Category_option": access_category_option,
            "Category_id": access_category_table}
        ) ; 

        }

        else if (Option_title == "delete product"){
            navigation.navigate("DeleteUpdateProduct", {"Category_name": access_category_name, 
            "Category_option": access_category_option,
            "Category_id": access_category_table}
            ) ; 
        }

        else if (Option_title == "Update category"){
            navigation.navigate("CreateCategory", {"Update":"1", "Name":access_category_name, "Option":access_category_option, "Table":access_category_table, "ImageURL":access_category_image})
        }

        else if (Option_title == "delete category"){
            Alert.alert("Delete category", 
                'Are you sure you want to Delete this category?',
                [ 
                    {
                        text: "Yes", 
                        onPress: () => Delete_category_handler(access_category_table)
                    }, 
                    {
                        text: "No"
                    }
                ]
            )
        }

    }

    // === Layout === // 

    if (loadFontValue){

        return(
            <View style={SelectCategoryStyle.SelectCategoryScreen}>
    
                <StatusBar
                    backgroundColor={colorCode.HomeScreenColor.PriceInformationTitleColor}
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

                {!silver_webview_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {silver_webview_value}
                            source={{uri:silver_webview_url}}
                            onMessage={Silver_webview_handing}
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
                            onMessage={Delete_webview_handling}
                            ></WebView>
                    </View>
                </>:<></>}
                 
                <Text style={SelectCategoryStyle.SelectCategoryTitle}>Select category for {Option_title} </Text>
               
                {load_category_fetch_layout?<>
                    <LoadData/>
                </>:<>
                    <ScrollView style={SelectCategoryStyle.SelectCategoryOptionLayout} showsVerticalScrollIndicator={false}>
                        
                        {/* Gold Option category  */}

                        <Text style={SelectCategoryStyle.Gold_silver_product_title}>Gold Product category</Text>

                        {gold.map((element) => {
                            return(

                                <Pressable key={element.Category_id}
                                    style = {SelectCategoryStyle.SelectPressOption}
                                    android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                    onPress={() => Category_press_Handle(element.Category_name, element.Category_table, element.Category_option, element.Category_image )}>
                                    <Text style={[SelectCategoryStyle.SelectCategory]}>{element.Category_name}</Text>
                                </Pressable>
                            )
                        })}
                        
                        {/* Silver Option category  */}

                        <Text style={SelectCategoryStyle.Gold_silver_product_title}>Silver Product category </Text> 

                        {silver.map((element) => {
                            return(
                                <Pressable key={element.Category_id}
                                    style = {SelectCategoryStyle.SelectPressOption}
                                    android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                    onPress={() => Category_press_Handle(element.Category_name, element.Category_table, element.Category_option, element.Category_image )}>
                                    <Text style={[SelectCategoryStyle.SelectCategory]}>{element.Category_name}</Text>
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                </>}

            </View>
        )
    }
}

const SelectCategoryStyle = StyleSheet.create({
    SelectCategoryScreen: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    
    SelectCategoryTitle:{
        fontFamily: 'Mukta',
        fontSize: 22,
        color: '#ffffff',
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        textAlign:'center',
        paddingTop: 10,
        paddingBottom:10
    },
    
    SelectCategoryOptionLayout:{
        width: '95%',
        marginLeft:"auto",
        marginRight:"auto"
    },
    
    Gold_silver_product_title:{
        fontFamily: 'Mukta', 
        fontSize: 22, 
        color: "#292929", 
        marginTop: 8,
        marginBottom:8
    }, 

    SelectPressOption:{
        backgroundColor:'#f5f5f5',
        marginTop: 8,
        marginBottom:8,
        borderRadius: 5
    }, 
    
    SelectCategory: {
        fontFamily:"Mukta",
        fontSize: 19,
        textAlign: 'center', 
        paddingTop: 10,
        paddingBottom:10,
    }
})