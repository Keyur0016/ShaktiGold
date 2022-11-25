import { Text,StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import * as Font from 'expo-font' ;
import {BlurView} from 'expo-blur' ; 

export default function BlurViewLayout(){

    // == Check Font loaded or not 
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
 
    }, []); 

    if (loadFontValue){
        return(
            <BlurView intensity={100} tint="dark" style={BLurViewStyle.BlurViewLayout}>
                <Text style={BLurViewStyle.LoadingText}>Loading</Text>
            </BlurView>
        )
    }
}

const BLurViewStyle = StyleSheet.create({
    BlurViewLayout:{
        position: "absolute", 
        height: "100%", 
        width: "100%", 
        zIndex: 10, 
        display: "flex", 
        flexDirection: "row", 
        textAlign: "center", 
        justifyContent: "center",
        alignItems: "center"
    }, 

    LoadingText:{
        fontFamily: "Ubuntu", 
        fontSize: 18, 
        backgroundColor: "white", 
        zIndex: 15, 
        paddingTop: 10, 
        paddingBottom: 10 , 
        paddingLeft: 20,
        paddingRight: 20, 
        borderRadius: 8
    }
})