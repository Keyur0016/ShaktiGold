import { View, StyleSheet, StatusBar, Pressable, Image, Text, 
    ToastAndroid, Dimensions, Linking, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import {FlatListSlider} from 'react-native-flatlist-slider';
import StatusPreview from "./StatusPreview";
import {WebView} from 'react-native-webview' ; 
import LoadingData from "./LoadingData";

export default function StatusView({navigation}){

    // --- Calculate Status Image Height  ---- // 

    const WindowHeight = parseInt((Dimensions.get('window').height) - 90) ; 

    // ---- Status image list ---- // 
    
    const [Status_image, set_Status_image_data] = useState([]) ; 
    
    // ==== Load font ==== // 

    const [loadFontValue, setLoadFontValue] = useState(false); 

    // **** Start Load Status Image Request Handler **** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;
    const [status_image_load, set_status_image_load] = useState(true) ; 
    
    const Load_banner_data = (event) => {

        let Temp_data = event.nativeEvent.data ; 

        // -- Close webview and Status image load layout -- // 

        set_webview_layout(true) ; 
        set_status_image_load(false) ; 

        try{
            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Fetch"){
                set_Status_image_data([...Temp_data.Data]); 
            }

        }catch{
            ToastAndroid.show("Unable to load Product Image", ToastAndroid.BOTTOM, ToastAndroid.LONG) ; 
        }

    }
    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../../assets/Font/Ubuntu-Medium.ttf')
            })
           
            setLoadFontValue(true); 
        }; 

        loadFont() ; 


        // --- Call Load Banner Request --- // 

        const Status_image_data = () => {

            try{

                let Status_fetch_data = {
                    "Check_status" : "Fetch_banner", 
                    "Option" : "Status"
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                set_status_image_load(true) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Status_fetch_data) ; 

                set_web_view_url(web_url) ; 

                
            }catch{
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }; 

        setTimeout(() => {
            Status_image_data() ; 
        }, 500);

        
    }, []);

    // **** Close Load Status Image load Request **** // 
    

    // ==== Back Handler ==== // 

    const Back_Handler = () => {
        navigation.navigate("Home") ; 
    }; 

    // ==== Status image click Handler ==== // 

    const Status_image_opener = (element) => {

        Linking.openURL(element.image) ; 
    }

    // === Layout === // 

    if (loadFontValue){

        return(
            
            <View style={StatusStyle.StatusScreen}>

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
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
                            onMessage={Load_banner_data}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* == Back Option Container ==  */}

                <View style={[StatusStyle.BackImageContainer, {backgroundColor:colorCode.SignupColorCode.ButtonColor}]}>

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

                {status_image_load?<>
                    
                    <LoadingData/>

                </>:<>

                    <View style={StatusStyle.StatusImageLayout}>

                    
                        {Status_image.length > 0?<>

                            <FlatListSlider
                                data = {Status_image}
                                component = {<StatusPreview/>}
                                autoscroll = {false}
                                onPress = {(item) => Status_image_opener(item)} 
                            />

                        </>:
                        <>
                            <Text style={StatusStyle.NotAvailableProduct}>Not available any product</Text>

                        </>}

                    
                    </View>     
                </>}


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
    }, 

    NotAvailableProduct:{
        fontFamily: 'Ubuntu',
        fontSize: 18, 
        marginLeft: "auto", 
        marginRight: "auto",
        marginTop: "2%"
    },
    LoadingLayout:{
        display: "flex", 
        height: "100%", 
        width: "100%",
        flex: 1,
        justifyContent: 'center'
    }
})