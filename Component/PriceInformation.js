import { View, StyleSheet, StatusBar, Text, Image, Pressable, ToastAndroid, 
ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import * as colorCode from './Information/ColorCode' ; 
import * as URL from './Information/RequestURL'; 
import * as Font from 'expo-font'; 

export default function PriceInformation({navigation, route}){

    // == Today date 
    const Day = new Date().getDate() ;
    const Month = new Date().getMonth() + 1 ; 
    const Year = new Date().getFullYear() ; 
    const Date_data = Day + "-" + Month + '-' + Year ; 

    // == Other Price

    const [price_24K, set_price_24K] = useState('') ; 
    const [price_22K, set_price_22K] = useState('') ;
    const [price_18K, set_price_18K] = useState('') ;
    const [price_916, set_price_916] = useState('') ;
    const [silver_price, set_silver_price] = useState(''); 
    const [load_today_price, set_today_price] = useState(false); 
    const [load_yesterday_price, set_yesterday_price] = useState(false) ; 
    const [date_information, set_date_information] = useState(''); 

    // == Check Font loaded or not 

    const [loadFontValue, setLoadFontValue] = useState(false);

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../assets/Font/Ubuntu-Medium.ttf')
            })

            setLoadFontValue(true); 
              
            set_price_24K(route.params.Price[0][0]["24K_price"]) ;
            set_price_22K(route.params.Price[0][0]["22K_price"]) ; 
            set_price_18K(route.params.Price[0][0]["18K_price"]) ; 
            set_price_916(route.params.Price[0][0]["916_price"]) ; 
            set_silver_price(route.params.Price[0][0]['Silver_price']) ;  
            set_date_information(Date_data) ; 
        }; 

        loadFont() ; 


    }, []);

    // == Previous data Price loader 

    const Previous_day_price_handler = async () => {
        
        // == Set ActivityIndicator 
        set_yesterday_price(true) ; 

        // == Today date
        const Day = new Date().getDate() - 1 ;
        const Month = new Date().getMonth() + 1 ; 
        const Year = new Date().getFullYear() ; 
        const Date_data = Day + "-" + Month + '-' + Year ; 
        set_date_information(Date_data) ; 

        try{

            let Fetch_price_url = URL.RequestAPI ; 
            let Fetch_price_data = {
                'Check_status': 'Get_gold_price',
                'Date': Date_data
            }; 
            let Fetch_price_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Fetch_price_data)
            }; 

            let Fetch_price_request = await fetch(Fetch_price_url, Fetch_price_option); 
            let Fetch_price_response = await Fetch_price_request.json() ; 

            if (Fetch_price_response.Status == "Fetch"){
                set_price_24K(Fetch_price_response.Price[0]["24K_price"]); 
                set_price_22K(Fetch_price_response.Price[0]["22K_price"]); 
                set_price_18K(Fetch_price_response.Price[0]['18K_price']); 
                set_price_916(Fetch_price_response.Price[0]['916_price']); 
                set_silver_price(Fetch_price_response.Price[0]['Silver_price']); 
            }
            else{
                set_price_24K("Not available");
                set_price_22K("Not available");  
                set_price_18K("Not available"); 
                set_price_916("Not available"); 
                set_silver_price("Not available"); 
                set_yesterday_price(false) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

        set_yesterday_price(false) ; 
    }

    // == Today Price loader 

    const Today_price_handler = async () => {

        // == SetActivity Indicator
        set_today_price(true) ; 

        // == Today date

        const Day = new Date().getDate() ;
        const Month = new Date().getMonth() + 1 ; 
        const Year = new Date().getFullYear() ; 
        const Date_data = Day + "-" + Month + '-' + Year ; 

        set_date_information(Date_data) ; 

        try{

            let Fetch_price_url = URL.RequestAPI ; 
            let Fetch_price_data = {
                'Check_status': 'Get_gold_price',
                'Date': Date_data
            }; 
            let Fetch_price_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Fetch_price_data)
            }; 

            let Fetch_price_request = await fetch(Fetch_price_url, Fetch_price_option); 
            let Fetch_price_response = await Fetch_price_request.json() ; 
            
            if (Fetch_price_response.Status == "Fetch"){
                set_price_24K(Fetch_price_response.Price[0]["24K_price"]);
                set_price_22K(Fetch_price_response.Price[0]['22K_price']);  
                set_price_18K(Fetch_price_response.Price[0]['18K_price']); 
                set_price_916(Fetch_price_response.Price[0]['916_price']); 
                set_silver_price(Fetch_price_response.Price[0]['Silver_price']); 
            }
            else{
                set_price_24K("Not available");
                set_price_22K("Not available");  
                set_price_18K("Not available"); 
                set_price_916("Not available"); 
                set_silver_price("Not available"); 
                set_today_price(false); 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

        // == Remove SetActivity Indicator 
        set_today_price(false) ; 
    }

    const Back_Handler = () => {
        navigation.navigate("Home") ; 
    }

    if (loadFontValue){
        return(
            <View style={PriceInformationStyle.PriceInformationScreen}>
          
                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />
                
                {/* == Back Option Layout ==  */}

                <View style={PriceInformationStyle.BackImageContainer}>

                    <Pressable style={[PriceInformationStyle.BackImageContainer, 
                        {paddingLeft: 10 , paddingTop: 10 ,paddingBottom: 10, paddingRight: 12, marginLeft: 3 }]}
                        onPress = {Back_Handler}
                        android_ripple={{color: colorCode.SignupColorCode.ButtonRippleColor}}>

                        <Image
                            source={require('../assets/arrow.png')}
                            style={PriceInformationStyle.BackImage}
                        />

                        <Text style={PriceInformationStyle.BackText}>Price</Text>

                    </Pressable>
                   
                </View>

                {/* Gold Price title layout  */}

                <View style={PriceInformationStyle.Gold_Silver_Layout}>
                      
                    <Image
                        source={require('../assets/Image/Gold.png')}
                        style={PriceInformationStyle.Gold_Silver_Image}
                    />

                    <Text style={PriceInformationStyle.Gold_Silver_Title}> Gold Price</Text>
                    <Text style={PriceInformationStyle.Gold_Silver_date}>{date_information}</Text>
                
                </View>

                {/* 24K Price Information  */}

                <View style={PriceInformationStyle.PriceInformationLayout}>

                    <Text style={PriceInformationStyle.PriceInformationTitle} >24K Price </Text>
                    <Text style={PriceInformationStyle.PriceInformationData}>₹{price_24K}/10gm</Text>
                
                </View>

                {/* 22K Price Information  */}

                <View style={PriceInformationStyle.PriceInformationLayout}>

                    <Text style={PriceInformationStyle.PriceInformationTitle} >22K Price </Text>
                    <Text style={PriceInformationStyle.PriceInformationData}>₹{price_22K}/10gm</Text>
                
                </View>

                {/* 18K Price Information  */}
                
                <View style={PriceInformationStyle.PriceInformationLayout}>
                
                    <Text style={PriceInformationStyle.PriceInformationTitle}>18K Price</Text>
                    <Text style={PriceInformationStyle.PriceInformationData}>₹{price_18K}/10gm</Text>
                
                </View>

                {/* 916 Price Information  */}

                <View style={PriceInformationStyle.PriceInformationLayout}>

                    <Text style={PriceInformationStyle.PriceInformationTitle}>916 Price</Text>
                    <Text style={PriceInformationStyle.PriceInformationData}>₹{price_916}/10gm</Text>
                
                </View>

                {/* Silver Price title layout  */}

                <View style={PriceInformationStyle.Gold_Silver_Layout}>
                        
                    <Image
                        source={require('../assets/Image/Silver.png')}
                        style={[PriceInformationStyle.Gold_Silver_Image, {height:35, width: 35}]}
                    /> 

                    <Text style={PriceInformationStyle.Gold_Silver_Title}>Silver Price</Text>
                    <Text style={PriceInformationStyle.Gold_Silver_date}>{date_information}</Text>

                </View>

                {/* Silver Price Information  */}

                <View style={PriceInformationStyle.PriceInformationLayout}>
                    
                    <Text style={PriceInformationStyle.PriceInformationTitle}>Silver Price</Text>
                    <Text style={PriceInformationStyle.PriceInformationData}>₹{silver_price}/1Kg</Text>
                
                </View>

                {/* Today Price information option  */}

                {load_today_price?<>

                    <View style={[PriceInformationStyle.PreviousPriceLayout, {padding:0, backgroundColor: 'transparent'}]}>
                        <ActivityIndicator
                            color = "black"
                            size= "large"
                        />
                    </View>
                </>:<>

                    <Pressable style={PriceInformationStyle.PreviousPriceLayout}
                        android_ripple={{color: '#a6b2fd'}}
                        onPress={Today_price_handler}>

                        <Text style={PriceInformationStyle.PreviousPriceTitle}> Today price</Text>
                    
                    </Pressable>

                </>}
                
                {load_yesterday_price?<>
                    <View style={[PriceInformationStyle.PreviousPriceLayout, {padding:0, backgroundColor: 'transparent'}]}>
                        <ActivityIndicator
                            color = "black"
                            size= "large"
                        />
                    </View>
                </>:<>

                    <Pressable style={PriceInformationStyle.PreviousPriceLayout}
                        android_ripple={{color: '#a6b2fd'}}
                        onPress={Previous_day_price_handler}>

                        <Text style={PriceInformationStyle.PreviousPriceTitle}> Yesterday price</Text>
                    
                    </Pressable>
                </>}

                {/* Show Price day price information option  */}
                

            </View>
        )
    }

}

const PriceInformationStyle = StyleSheet.create({
    PriceInformationScreen:{
        backgroundColor: '#ebebeb',
        height: '100%',
        width: '100%'
    }, 

    BackImageContainer:{
        display: "flex",
        flexDirection: 'row',
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
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

    Gold_Silver_Layout:{
        display: "flex",
        flexDirection: "row",
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        width: '96%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 15,
        borderRadius: 10
    },

    Gold_Silver_Image:{
        height: 40,
        width: 40
    }, 

    Gold_Silver_Title:{
        fontFamily: "Ubuntu",
        fontSize: 19,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 15,
        color: 'white'
    },

    Gold_Silver_date:{
        fontFamily: "Sans", 
        fontSize: 19, 
        color: 'white', 
        marginTop: "auto", 
        marginBottom: "auto", 
        marginLeft: "auto", 
        marginRight: 15
    }, 

    PriceInformationLayout:{
        backgroundColor: "white",
        width: '96%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
        paddingRight: 10,
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#ececec",
        display: "flex",
        flexDirection: "row"
    },

    PriceInformationTitle:{
        fontFamily: "Ubuntu",
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        backgroundColor: colorCode.HomeScreenColor.PriceInformationTitleColor,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        color: 'black'
    },

    PriceInformationData:{
        fontFamily: 'Sans',
        fontSize: 20,
        color: '#626262', 
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 8
    },

    PreviousPriceLayout:{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10
    }, 

    PreviousPriceTitle:{
        fontFamily: "Ubuntu",
        fontSize: 18,
        color: "#296dff"
    }
}) ; 
