import { View, StyleSheet, 
Pressable, StatusBar, Image, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from '../Information/ColorCode'; 
import * as Font from 'expo-font'; 

export default function AdminOption({navigation}){

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

    let OptionData = [
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

    const Navigation_handler = (option) => {

        if (option == "Set gold price"){
            navigation.navigate("UploadPrice"); 
        }
        else if (option == "Update gold price"){
            navigation.navigate("UpdatePrice"); 
        }
        else if (option == "Create category"){
            navigation.navigate("CreateCategory"); 
        }
        else if (option == "Upload product"){
            navigation.navigate('SelectCategory', {"Option": "upload product"}) ; 
        }
        else if (option == "Delete product"){
            navigation.navigate("SelectCategory", {"Option": "delete product"}); 
        }
    }
    if(loadFontValue){

        return(
            <ScrollView style={{backgroundColor:'white'}}>
    
                <View style={AdminOptionStyle.AdminOptionScreen}>
    
                    <StatusBar
                        backgroundColor='white'
                    />
                     
                    {OptionData.map((element) => {
                        return(

                            <Pressable style={AdminOptionStyle.AdminOptionLayout}
                                key={element.Title}
                                onPress={() => Navigation_handler(element.Title)}>
    
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
        width: '35%',
        paddingTop: 20, 
        paddingBottom: 20,
        shadowColor:'#000000',
        elevation: 10, 
        marginTop: 15, 
        marginBottom: 15,
        marginLeft: '5%', 
        marginRight: '5%',
        borderRadius: 5
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