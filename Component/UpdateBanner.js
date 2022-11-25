import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, StatusBar, 
ActivityIndicator,  Text, Image, Pressable, ToastAndroid } from "react-native";
import * as colorCode from './Information/ColorCode'; 
import * as URL from './Information/RequestURL' ; 
import * as Font from 'expo-font'; 
import * as ImagePicker from 'expo-image-picker';

export default function UpdateBanner(){
    
    // BannerImage data 
    const [BannerImageData, set_BannerImageData] = useState([]); 

    // ActivityIndicator 
    const [activityIndicator, setActivityIndicator] = useState(false); 

    // Load require font 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    ImagePicker.requestMediaLibraryPermissionsAsync(); 
       
    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ; 

        const FetchBannerImage = async () => {
            
            try {
                let FetchBanner_url = URL.RequestAPI ; 
                let FetchBanner_data = {
                    "Check_status" : "Fetch_banner", 
                    "Option": "Banner"
                }; 
                let FetchBanner_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(FetchBanner_data)
                }; 
    
                let FetchBanner_request = await fetch(FetchBanner_url, FetchBanner_option); 
                let FetchBanner_response = await FetchBanner_request.json() ; 

                if (FetchBanner_response.Status == "Fetch"){
                    set_BannerImageData(FetchBanner_response.Data); 
                }
                
            } catch (error) {
                
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
            
        }; 

        FetchBannerImage() ; 

    }, []);

    const ImageUpload_Handler = async (Banner_id) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        let ImageURL = result.uri; 
        let Temp_BannerData = [] ; 

        for(let i = 0 ; i<BannerImageData.length; i++){
            let Temp_data = {} ; 
            if (BannerImageData[i].Banner_id == Banner_id){
                Temp_data.Banner_id = Banner_id ; 
                Temp_data.Image = ImageURL ; 
                Temp_BannerData.push(Temp_data) ; 
            }
            else{
                Temp_BannerData.push(BannerImageData[i]); 
            }
        }

        set_BannerImageData([]); 
        set_BannerImageData(Temp_BannerData) ; 
    }; 

    if(loadFontValue){

        return(
            <View style={UpdateBannerStyle.UpdateBannerScreen}>
                
                <StatusBar
                    backgroundColor='white'
                />
    
                <ScrollView style={UpdateBannerStyle.BannerLayout} >
                   
                    {BannerImageData.map((element) => {
                        return(

                            <View style={UpdateBannerStyle.ImageLayout} key={element.Banner_id}>

                                <Image
                                    source={{uri:element.Image}}
                                    style = {UpdateBannerStyle.Image} />
    

                                <Pressable style={UpdateBannerStyle.UpdateBannerLayout}
                                    android_ripple={{color:'#2c2c2c'}}
                                    onPress={() => ImageUpload_Handler(element.Banner_id)}>
                                    <Text style={UpdateBannerStyle.ImagePicker}>Update Banner</Text>
                                </Pressable>

                            </View>
                        )
                    })}
                      

                </ScrollView>
                
                {activityIndicator ? 
                    <View style={[UpdateBannerStyle.SendCode_Layout]}>
                        <ActivityIndicator
                            color='white'
                            size="large"
                        />
                    </View>:
                    <Pressable style={[UpdateBannerStyle.SendCode_Layout]}
                        android_ripple={{color:'#ffd100',foreground:false}}
                        onPress={ImageUpload_Handler}>
                        <Text style={UpdateBannerStyle.SendCode_Text}>Verify</Text>
                    </Pressable>
                }
    
                
            </View>
        )
    }
}

const UpdateBannerStyle = StyleSheet.create({
    UpdateBannerScreen: {
        backgroundColor: 'white'
    }, 
    BannerLayout: {
        height: '95%', 
        width: '100%', 
        backgroundColor:'white'
    },
    SendCode_Layout:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor,
        borderRadius: 5, 
        alignItems:'center',
        paddingTop:10, 
        paddingBottom:10,
        marginTop: -5
    }, 
    SendCode_Text:{
        fontFamily:"Mukta",
        fontSize:18, 
        color:'black'
    }, 
    ImageLayout:{
        marginTop: 10, 
        marginBottom: 10,
        marginLeft: 'auto', 
        marginRight: 'auto', 
        paddingTop: 10,
        paddingBottom: 10,
        width: '95%',
        backgroundColor: '#f2f2f2',
        borderRadius : 5
    }, 
    Image: {
        width: '95%',
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode:'cover'
    }, 
    UpdateBannerLayout:{
        backgroundColor: "#4a4a4a" ,
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10, 
        flex: 1, 
        alignItems: 'center',
        borderRadius: 5
    }, 
    ImagePicker: {
        color: 'white', 
        fontFamily: 'Sans', 
        fontSize: 16
    }

})