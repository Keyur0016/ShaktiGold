import {View, ActivityIndicator, StyleSheet} from "react-native";
import * as colorCode  from '../Information/ColorCode' ; 
import { SkypeIndicator } from "react-native-indicators";

export default function LoadingData(){

    return(
        <View style={LoadingDataStyle.LoadingLayout}>
            <SkypeIndicator
                color= {colorCode.HomeScreenColor.PriceLayoutColor}
            />
        </View>
    )
}

const LoadingDataStyle = StyleSheet.create({
    LoadingLayout:{
        display: "flex", 
        height: "100%", 
        width: "100%",
        flex: 1,
        justifyContent: 'center'
    }
})