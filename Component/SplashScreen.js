import { View, StyleSheet, Image , StatusBar} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function SplashScreen({navigation}){
    
    const ScreenFocused = useIsFocused() ; 

    // Check User Tablename 

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