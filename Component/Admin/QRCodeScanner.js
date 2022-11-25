import { useEffect, useState } from "react";
import { View, StatusBar, Text, StyleSheet, Alert, Pressable } from "react-native";
import * as Font from 'expo-font' ; 
import * as colorCode from '../Information/ColorCode' ; 
import * as URL from '../Information/RequestURL' ; 
import { BarCodeScanner } from 'expo-barcode-scanner';
import BlurViewLayout from "../OtherComponent/BlurViewLayout";

export default function QrCodeScanner(){
   
    // == Check Font loaded or not
    const [loadFontValue, setLoadFontValue] = useState(false) ; 
    
    // == Camera permission value 
    const [hasPermission, setHasPermission] = useState(null);
    const [barcode_layout, set_barcode_layout] = useState(true) ; 

    // == Barcode Data 
    const [Order_id, Set_Order_id] = useState(''); 
    const [Mobile_number, set_Mobile_number] = useState('') ; 
    const [Table_name, set_Table_name] = useState('') ; 

    // == Navigation color 
    const [status_bar_color, set_status_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ;

    // == Loading Layout 
    const [Loading_layout, set_Loading_layout] = useState(false) ; 

    useEffect(() => {
        
        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../../assets/Font/SourceSansPro-Regular.ttf'), 
                "Ubuntu": require('../../assets/Font/Ubuntu-Medium.ttf')
            })

            setLoadFontValue(true); 
            
        }; 

        loadFont() ;

        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
          };
      
          getBarCodeScannerPermissions();

    }, []) ; 

    // == Read BarCode Data 
    const handleBarCodeScanned = ({ type, data }) => {
        set_barcode_layout(false) ;  
        
        try{
           
            let Result = String(data).split("**") ; 
            Set_Order_id(Result[1]); 
            set_Mobile_number(Result[2]) ; 

        }catch{}
    };

    // == Again QR Code Opener 
    const Again_qr_code_opener = () => {

        set_barcode_layout(true) ; 

    } ; 

    const Complete_Order_Handler = () => {

        set_Loading_layout(true) ; 
        set_status_bar_color("#ececec") ; 

        try{

        }catch{

        }
    }

    if(loadFontValue){
        return(
            <View style={BarCodeScannerStyle.ScannerScreen}>

                <StatusBar
                    backgroundColor={status_bar_color}
                />
                
                {Loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}

                <Pressable style={{backgroundColor:colorCode.HomeScreenColor.PriceLayoutColor, 
                    width:"90%", marginLeft:"auto", marginRight: "auto", alignItems: "center", 
                    marginTop:20, paddingTop:12, paddingBottom:10, borderRadius:8 }}
                    android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}>

                    <Text style={{fontFamily:"Ubuntu", fontSize: 18, color:"white"}}>Close scanner</Text>
                
                </Pressable>

                {barcode_layout?<>

                    <View style={{height: "50%", width:"100%", marginTop:"auto", marginBottom: "auto"}}>

                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{height:"100%", width:"100%", borderRadius: 8}}
                        />

                    </View>

                </>:<>
                    <View>

                        <Pressable style={{backgroundColor:colorCode.HomeScreenColor.PriceInformationTitleColor, 
                            width:"90%", marginLeft:"auto", marginRight: "auto", alignItems: "center", 
                            marginTop:20, paddingTop:12, paddingBottom:10, borderRadius:8 }}
                            android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                            onPress = {Again_qr_code_opener}
                            >

                            <Text style={{fontFamily:"Ubuntu", fontSize: 18, color:"white"}}>Open Scanner again</Text>
                    
                        </Pressable>

                        <Text style={{fontFamily: "Ubuntu", fontSize:19, 
                            marginLeft: "auto", marginRight: "auto",
                            marginTop: 80 , marginBottom: 12}}>Order id  = {Order_id}</Text>

                        <Text style={{fontFamily: "Ubuntu", fontSize:19, 
                            marginLeft: "auto", marginRight: "auto",
                            marginTop: 12 , marginBottom: 12}}>Mobilenumber = {Mobile_number}</Text>

                        <Pressable style={{backgroundColor:colorCode.HomeScreenColor.PriceLayoutColor, 
                            width:"90%", marginLeft:"auto", marginRight: "auto", alignItems: "center", 
                            marginTop:20, paddingTop:15, paddingBottom:15, borderRadius:8 }}
                            android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}>

                            <Text style={{fontFamily:"Ubuntu", fontSize: 18, color:"white"}}>Complete Order</Text>
                    
                        </Pressable>
                        

                    </View>
                </>}

            </View>
        )
    }
}

const BarCodeScannerStyle = StyleSheet.create({
    ScannerScreen: {
        height: "100%", 
        width: "100%", 
        backgroundColor: "#ececec"
    }
})