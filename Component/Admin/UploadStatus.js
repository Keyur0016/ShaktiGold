import { View, StyleSheet, StatusBar, ScrollView, Pressable, Text, Image, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import * as ImagePicker from 'expo-image-picker' ; 
import BlurViewLayout from '../OtherComponent/BlurViewLayout' ; 
import * as Notifications from 'expo-notifications';
import {WebView} from 'react-native-webview' ; 

// === Notification Object === // 

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function UploadStatus({navigation}){
    
    // === Status image data === //

    const [Status_image_data, set_Status_image_data] = useState([]) ; 
    
    // == Loading Layout value 
    
    const [loading_layout, set_loading_layout] = useState(false); 
    
    // == Disable Navigation bar color
    
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 
    
    // === Load font === // 

    const [loadFontValue, setLoadFontValue] = useState(false);

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

    }, []) ;

    // *** Start Fetch notification id request handler *** //

    const [fetch_notification_layout, set_fetch_notification_layout] = useState(true) ; 
    const [fetch_notification_web_url, set_fetch_notification_web_url] = useState('') ;  
    const [fetch_notification_value, set_fetch_notification_value] = useState(0) ; 

    const Fetch_notification_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        Disable_loading_layout_handler() ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Temp_notification_data = Temp_data.Notification ;
            let Temp_info = [] ; 
            
            Temp_notification_data.map((element)=>{
                
                Temp_info.push(element.Notification_id) ; 
            }) ; 

            let Notification_body = "New product arrival. Check it out ! " ;

            for(let i = 0; i<Temp_info.length; i++){
                sendPushNotification(Temp_info[i], Notification_body); 
            }
            
            navigation.goBack() ; 

        }catch{

        }
    }

    // *** Stop Fetch notification id request handler *** // 
    
    // *** Start Insert status image request handler *** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ; 
    const [webview_insert_count, set_webview_insert_count] = useState(0) ; 

    const Message_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ;
        set_webview_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Insert_status"){
                set_webview_insert_count(webview_insert_count + 1) ; 
                ToastAndroid.show("Insert status image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

            if (webview_insert_count + 1 == Status_image_data.length){

                let Fetch_notification_data = {
                    'Check_status': "Fetch_notification_id"
                } ; 

                // Set URL to webview 
                set_fetch_notification_web_url("") ;
                set_fetch_notification_layout(false) ; 
                set_fetch_notification_value( fetch_notification_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_notification_data) ; 
                set_fetch_notification_web_url(web_url) ; 

            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

    }

    // **** Stop Insert status image Request Handler **** // 


    // **** Start Upload Status image Request Handler **** // 

    const [delete_webview_layout, set_delete_webview_layout] = useState(true); 
    const [delete_webview_url, set_delete_webview_url] = useState('') ; 
    const [delete_webview_value, set_delete_webview_value] = useState(0) ; 

    const Delete_status_handling = async (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_delete_webview_layout(true) ; 

        try{
           
            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Delete_status"){

                for(let i = 0; i<Status_image_data.length; i++){
                       
                    let Temp_data = {uri: Status_image_data[i],
                        type: `test/${Status_image_data[i].split('.')[1]}`,
                        name: `test.${Status_image_data[i].split('.')[1]}`
                    } ; 

                    let Image_temp_data = new FormData() ; 
                    Image_temp_data.append('file', Temp_data); 
                    Image_temp_data.append('upload_preset', 'Shaktigold'); 
                    Image_temp_data.append('cloud_name', 'smartinfo') ; 

                    let Upload_image = await fetch('https://api.cloudinary.com/v1_1/smartinfo/image/upload', {
                        method : 'post', 
                        body   : Image_temp_data
                    }); 

                    let Upload_image_response = await Upload_image.json() ; 

                    if (Upload_image_response != null){

                        ToastAndroid.show("Upload status image successfully", ToastAndroid.BOTTOM, ToastAndroid.SHORT ) ; 

                        try {
                            
                            let Insert_status_image_data = {
                                "Check_status":"Status_image_insert",
                                "Status_image": Upload_image_response.url 
                            }; 

                            // Set URL to webview 
                            set_web_view_url("") ;
                            set_webview_layout(false) ; 
                            set_webview_value(webview_value + 1) ; 
                            
                            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_status_image_data) ; 
                            set_web_view_url(web_url) ; 

                        } catch{
                            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                        }

                    }
                }

            }

            
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 
    }

    // --- First Delete all status than start upload status image --- // 

    const Status_image_upload_handler = async () => {
        
        Set_loading_layout_handler() ; 

        if (Status_image_data.length == 0 ){
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Select at least one status image", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
        else{

            try{

                let Status_image_request_data = {
                    "Check_status":"Status_image_delete"
                }; 

                // Set URL to webview 
                set_delete_webview_url("") ;
                set_delete_webview_layout(false) ; 
                set_delete_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Status_image_request_data) ; 
                
                set_delete_webview_url(web_url) ; 

            }catch{

                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
        
        }

    }

    
    // == Status image picker from Gallery image == // 
    
    const Status_image_picker_handler = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6,
        });

        if ( 'uri' in result){

            if (Status_image_data.length > 7){
                ToastAndroid.show("You can not upload more than 6 images for Status", ToastAndroid.BOTTOM, ToastAndroid.LONG) ; 
            }
            else{

                set_Status_image_data([...Status_image_data, result.uri]) ; 
            }
        }
    }

    // == Status image remover == // 

    const Status_image_close_handler = (element) => {

        for (let i = 0 ; i<Status_image_data.length; i++){
            if(Status_image_data[i] == element){
                Status_image_data.splice(i, 1) ; 
            }
        }

        set_Status_image_data([...Status_image_data]) ; 
    }
    
    const Set_loading_layout_handler = () => {
        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }
    
    const Disable_loading_layout_handler = () => {
        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    
    // === Layout === // 
    
    if(loadFontValue){
        return(
            <View style={UploadStatusStyle.UploadProductScreen}>

                {loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}
                
                <StatusBar
                    backgroundColor={navigation_bar_color}
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
                
                {!fetch_notification_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {fetch_notification_value}
                            source={{uri:fetch_notification_web_url}}
                            onMessage={Fetch_notification_handling}
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
                            onMessage={Delete_status_handling}
                            ></WebView>
                    </View>
                </>:<></>}
                 
                {/* All Status image layout  */}

                <View style={{height: "90%", width:"100%", marginTop: 10}}>

                    <ScrollView>
        
                        {Status_image_data.map((element, index) => {
                            return(
                                <View style={{height:300, width: "98%", marginTop: 6, marginBottom: 6, 
                                    backgroundColor: "white", paddingTop:12 , paddingBottom: 12, 
                                    marginLeft: "auto", marginRight: "auto" }}
                                    key={index}>


                                    {/* Status image close Handler  */}

                                    <View style={{display: "flex", flexDirection:"row", position:"absolute", zIndex:15, 
                                        width:"100%"}}>
                                        
                                        <Pressable style={{backgroundColor:"#2f2f2f71", marginLeft:"auto", marginRight:20, 
                                            marginTop:15 }}
                                            onPress={() => Status_image_close_handler(element)}>

                                            <Image
                                                source={require('../../assets/Image/Close.png')}
                                                style={{height:30, width:30, zIndex:20}}
                                            />
                                        
                                        </Pressable>

                                    </View>
                                    
                                    {/* Status image  */}

                                    <Image
                                        source={{uri:element}}   
                                        style={{height: "100%", width: "96%", marginLeft:"auto", 
                                        marginRight: "auto", resizeMode:"contain"}}
                                    />

                                </View>
                            )

                        })}
                    </ScrollView>
                
                </View>

                <View style={UploadStatusStyle.UploadStatusButtonLayout}>
                    
                    <Pressable style={UploadStatusStyle.UploadStatusPressableButton}
                        android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                        onPress={Status_image_picker_handler}>
                     
                        <Text allowFontScaling={false} style={UploadStatusStyle.UploadStatusButtonText}>Select Status</Text>
                    
                    </Pressable>

                    <Pressable style={UploadStatusStyle.UploadStatusPressableButton}
                        android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                        onPress={Status_image_upload_handler}>
                    
                        <Text allowFontScaling={false} style={UploadStatusStyle.UploadStatusButtonText}>Upload Status</Text>
                    
                    </Pressable>

                </View>

            </View>
        )
    }
}

async function sendPushNotification(expoPushToken, notification_body) {
    const message = {
        to: expoPushToken,
        priority: "normal",
        notification:{
            title: ' 🔶🔷 Shree Shakti Gold Jewellers 🔶🔷 ',
            body: notification_body,
            data: { Data : 'Status' },
        }
    };
  
    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":
          "key=AAAA6GxAfPM:APA91bGxKuNUheg83H4kLEhWYiEfid0aL_3En5nThJTNlugbTPh6oi5vtDpgS_1O5cy52DlSmeUtfHvjBzj1JvmC7VSWWQJFdecrRGhpozrb5h6KxSCh79eYlVWdzk0cyTNhvhilBGgB",
        },
        body: JSON.stringify(message),
    });
}

const UploadStatusStyle = StyleSheet.create({
    UploadProductScreen: {
        backgroundColor: "#ececec", 
        height: "100%", 
        width: "100%"
    }, 

    UploadStatusButtonLayout:{
        display: "flex", 
        flexDirection: "row", 
        textAlign: "center", 
        justifyContent: "center",
        alignItems: "center", 
        position: "absolute", 
        bottom: 0 , 
        marginLeft: "auto", 
        marginRight: "auto", 
        width: "100%", 
        marginBottom: 10
    }, 

    UploadStatusPressableButton:{
        width: "45%", 
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        marginLeft: "2%", 
        marginRight: "2%", 
        alignItems: "center", 
        paddingTop: 10 ,
        paddingBottom: 10, 
        borderRadius: 5  
    }, 

    UploadStatusButtonText:{
        fontFamily: "Ubuntu", 
        fontSize: 18, 
        color: "white"
    }
})