import { View, StyleSheet, StatusBar, ScrollView, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font';
import * as URL from '../Information/RequestURL' ; 
import * as colorCode from '../Information/ColorCode'; 

export default function SelectCategory({navigation, route}){
    
    const Option_title = route.params.Option; 

    const [loadFontValue, setLoadFontValue] = useState(false); 

    const [gold, set_gold] = useState([]); 
    const [silver, set_silver] = useState([]); 
       
    useEffect(() => {

        const Load_category_data = async() => {
            
            // Fetch Gold option related Product category 

            set_gold([]) ; 

            let Get_category_url = URL.RequestAPI ; 
            let Get_category_data = {
                'Check_status': 'Get_gold_category'
            }; 
            let Get_category_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Get_category_data)
            }; 

            let Get_category_request = await fetch(Get_category_url, Get_category_option); 
            let Get_category_response = await Get_category_request.json() ; 
            let Get_category_STATUS = Get_category_response.Status ; 
            
            if (Get_category_STATUS == "Fetch"){

                set_gold([...Get_category_response.Data]); 
            }

            // Fetch Silver option related Product category 

            set_silver([]) ; 

            let Silver_category_url = URL.RequestAPI ; 
            let Silver_category_data = {
                'Check_status': 'Get_silver_category'
            }; 
            let Silver_category_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Silver_category_data)
            }; 

            let Silver_category_request = await fetch(Silver_category_url, Silver_category_option); 
            let Silver_category_response = await Silver_category_request.json() ; 
            let Silver_category_STATUS = Silver_category_response.Status ; 
            
            if (Silver_category_STATUS == "Fetch"){

                set_silver([...Silver_category_response.Data]); 
            }

        }; 

        Load_category_data() ; 

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
            
        }; 

        loadFont() ; 

    }, []);

    const Category_press_Handle = (access_category_name, access_category_table, access_category_option) => {

        if (Option_title == "upload product"){

            navigation.navigate("UploadProduct", {"Category_name": access_category_name, 
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

    }

    if (loadFontValue){

        return(
            <View style={SelectCategoryStyle.SelectCategoryScreen}>
    
                <StatusBar
                    backgroundColor="#6e6e6e"
                />
                 
                <Text style={SelectCategoryStyle.SelectCategoryTitle}>Select category for {Option_title} </Text>
 
                <ScrollView style={SelectCategoryStyle.SelectCategoryOptionLayout}>
                    
                    {/* Gold Option category  */}

                    <Text style={SelectCategoryStyle.Gold_silver_product_title}>Gold Product category</Text>

                    {gold.map((element) => {
                        return(

                            <Pressable key={element.Category_id}
                                style = {SelectCategoryStyle.SelectPressOption}
                                android_ripple={{color:'#60d8c6'}}
                                onPress={() => Category_press_Handle(element.Category_name, element.Category_table, element.Category_option )}>
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
                                android_ripple={{color:'#60d8c6'}}>
                                <Text style={[SelectCategoryStyle.SelectCategory]}>{element.Category_name}</Text>
                            </Pressable>
                        )
                    })}
                </ScrollView>

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
        backgroundColor: colorCode.SignupColorCode.OtherButtonColor,
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
        fontSize: 20, 
        color: "#292929", 
        marginTop: 8,
        marginBottom:8
    }, 
    SelectPressOption:{
        backgroundColor:'#f5f5f5',
        marginTop: 8,
        marginBottom:8,
        elevation:5,
        borderRadius: 5,
        shadowColor: colorCode.SignupColorCode.OtherButtonColor
    }, 
    SelectCategory: {
        fontFamily:"Mukta",
        fontSize: 19,
        textAlign: 'center', 
        paddingTop: 10,
        paddingBottom:10,
    }
})