import { View, StyleSheet, Image , StatusBar} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

// ==== Setup Notification ==== // 

import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SplashScreen({navigation}){
    
  const ScreenFocused = useIsFocused() ; 

  // ==== Set Notification listener and Response listener ==== // 

  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);

  // === Check User table name === // 

  useEffect(() => {

  const GetRequireData = async () => {

    const TableName = await AsyncStorage.getItem("Table"); 
    
    if (TableName != null){
          
      setTimeout(() => {
        navigation.navigate("Home"); 
      }, 3000)
    
    }else{
      setTimeout(() => {
        navigation.navigate("Signin"); 
      }, 3000); 
    
    }

  }; 

  GetRequireData() ;

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    let Response_data = JSON.parse(JSON.stringify(response)) ; 
    let Notification_data = Response_data['notification']['request']['content']['data']['Data'] ;
     
    if (Notification_data == "Home"){
      navigation.navigate("Home") ; 
    }
    else if (Notification_data == "Status"){
      navigation.navigate("StatusView") ; 
    }
    else if (Notification_data == "Price"){
      navigation.navigate("Home") ; 
    }
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };

  }, [ScreenFocused]); 
  
  return(

    <View style={SplashScreenStyle.SplashSCreen}>
        
      <StatusBar
        backgroundColor='white'
      />

      <Image
        source={require('../assets/ShaktiGold.png')}
        style={SplashScreenStyle.Logo}
      />


    </View>
  )
}

const SplashScreenStyle = StyleSheet.create({
  SplashSCreen: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%' ,
    display:'flex',
    flex:1,
    alignItems:'center'
  }, 
  Logo:{
    width:'50%',
    resizeMode:'contain', 
    marginTop: 'auto', 
    marginBottom: 'auto'
  }
})