import { View, StyleSheet, StatusBar, Pressable, Image, Text, 
    ToastAndroid, Dimensions, Linking } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import {FlatListSlider} from 'react-native-flatlist-slider';
import StatusPreview from "./StatusPreview";

export default function StatusView({navigation}){

    // Status Image Layout Height 
    const WindowHeight = parseInt((Dimensions.get('window').height) - 90) ; 

    // == Status image data 
    const [Status_image, set_Status_image_data] = useState([]) ; 

    // == Check font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    // == Status bar color 
    const [status_bar_color, set_status_bar_color] = useState("#ffebbd") ; 

    useEffect(() => {

        // -- Load Font 

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../../assets/Font/Ubuntu-Medium.ttf')
            })
           
            setLoadFontValue(true); 
        }; 

        loadFont() ; 

        const Status_image_data = async () => {

            try{

                let Status_fetch_url = URL.RequestAPI ; 
                let Status_fetch_data = {
                    "Check_status" : "Fetch_banner", 
                    "Option" : "Status"
                }; 
                let Status_fetch_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Status_fetch_data)
                }; 

                let Status_fetch_request = await fetch(Status_fetch_url, Status_fetch_option) ; 
                let Status_fetch_response = await Status_fetch_request.json() ; 

                if (Status_fetch_response.Status == "Fetch"){
                    set_Status_image_data([...Status_fetch_response.Data]); 
                }
            }catch{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }; 

        Status_image_data() ; 

    }, []); 
    

    // == Back Button Handler 

    const Back_Handler = () => {
        navigation.navigate("Home") ; 
    }; 

    // ==  Status image onPress Handler 

    const Status_image_opener = (element) => {
        Linking.openURL(element.image) ; 
    }

    if (loadFontValue){

        return(
            
            <View style={StatusStyle.StatusScreen}>

                <StatusBar
                    backgroundColor={status_bar_color}
                />

                {/* == Back Option Container ==  */}

                <View style={[StatusStyle.BackImageContainer, {backgroundColor:status_bar_color}]}>

                    <Pressable style={[StatusStyle.BackImageContainer, 
                        {paddingLeft: 10 , paddingTop: 10 ,paddingBottom: 10, paddingRight: 12, 
                        marginLeft: 3}]}
                        onPress = {Back_Handler}
                        android_ripple={{color: colorCode.SignupColorCode.ButtonRippleColor}}>

                        <Image
                            source={require('../../assets/arrow.png')}
                            style={StatusStyle.BackImage}
                        />

                        <Text style={StatusStyle.BackText}>Latest Product</Text>

                    </Pressable>

                </View>

                <View style={StatusStyle.StatusImageLayout}>

                    {Status_image.length > 0?<>

                        <FlatListSlider
                            data = {Status_image}
                            component = {<StatusPreview/>}
                            autoscroll = {false}
                            onPress = {(item) => Status_image_opener(item)} 
                        />

                    </>:
                    <></>}

                
                </View>     

            </View>

        )

    }
}

const StatusStyle = StyleSheet.create({
    StatusScreen: {
        backgroundColor: "#ebebeb", 
        height: "100%", 
        width: "100%"
    }, 

    BackImageContainer:{
        display: "flex",
        flexDirection: 'row',
        paddingTop: 5, 
        paddingBottom: 5
    }, 

    BackImage:{
        height: 25,
        width: 25, 
        marginTop: "auto",
        marginBottom: "auto"
    }, 

    BackText:{
        fontFamily: 'Ubuntu',
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    }, 

    StatusImageLayout:{
        width: "100%", 
        marginLeft: "auto", 
        marginRight: "auto",
        marginTop: 10
    }
})