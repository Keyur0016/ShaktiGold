import { View , StyleSheet, StatusBar, Pressable, Image, Text, 
    ScrollView, ToastAndroid, Linking, BackHandler, Alert, PixelRatio } from "react-native";
import { useState, useEffect, useRef} from "react";
import * as colorCode from './Information/ColorCode';
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL' ; 
import {FlatListSlider} from 'react-native-flatlist-slider';
import HomePreview from "./Information/HomePreview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from 'expo-navigation-bar' ; 
import {WebView} from 'react-native-webview' ; 
import { PacmanIndicator } from "react-native-indicators";
import { useIsFocused } from "@react-navigation/native";

export default function Home({navigation}){

    // ==== User Table name ==== // 

    const [TableName, setTableName] = useState("") ; 

    const isScreenFocus = useIsFocused() ; 

    // ==== Fetch today date ==== // 

    const Day = new Date().getDate() ; 
    const Month = new Date().getMonth() + 1 ; 
    const Year = new Date().getFullYear() ; 
    const Today_date = Day + "-" + Month + "-" + Year ;

    // ==== Gold and Sliver Price information ==== // 

    const [gold_price, set_gold_price] = useState('') ; 
    const [silver_price, set_silver_price] = useState('') ; 
    const [price_data, set_price_data] = useState([]); 

    // ==== Banner Image list ==== // 

    const [Banner_data, set_Banner_data] = useState([]) ; 

    // ==== Gold and Sliver Product category list ==== //  
    
    const [Gold_category, set_Gold_category] = useState([]); 
    const [Silver_category, set_Silver_category] = useState([]);

    // ==== Shop location layout ==== //

    const [shop_location_layout, set_shop_location_layout] = useState(false) ; 

    // ==== Status bar color ==== // 

    const [status_bar_color, set_status_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 
    
    // ==== Load font ==== //  
    
    const [loadFontValue, setLoadFontValue] = useState(false); 

    // **** Start Load Banner Request Handler **** //

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;
    
    const Load_banner_data = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            let Fetch_banner_STATUS = Temp_data.Status ; 
    
            if (Fetch_banner_STATUS == "Fetch"){
                set_Banner_data([...Temp_data.Data]); 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    // **** Stop Load Banner Request Handler **** // 


    // **** Start load category Request Handler **** // 
      
    const [load_category_view_layout, set_load_category_view_layout] = useState(true) ; 
    const [load_category_view_url, set_load_category_view_url] = useState('') ; 
    const [load_category_view_value, set_load_category_view_value] = useState(0) ; 
    const [load_gold_product_layout, set_load_gold_product_layout] = useState(true) ; 
    const [load_silver_product_layout, set_silver_product_layout] = useState(true) ; 

    const Load_category_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_load_category_view_layout(true) ; 

        try{
          
            Temp_data = JSON.parse(Temp_data) ; 

            let Fetch_category_STATUS = Temp_data.Status ; 

            if (Fetch_category_STATUS == "Fetch"){
                set_load_gold_product_layout(false) ; 
                set_Gold_category([...Temp_data.Gold_category]);

                set_silver_product_layout(false) ; 
                set_Silver_category([...Temp_data.Silver_category]); 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // ***** Stop load category Request Handler ***** // 

    // ***** Start load price request Handler ***** // 

    const [load_price_view_layout, set_load_price_view_layout] = useState(true) ; 
    const [load_price_view_url, set_load_price_view_url] = useState('') ; 
    const [load_price_view_value, set_load_price_view_value] = useState(0) ; 

    const Load_price_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_load_price_view_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Not set price"){
                set_gold_price("Not available") ; 
                set_silver_price("Not available") ; 
            }
            else{
               set_gold_price(Temp_data.Price[0]["24K_price"]); 
               set_silver_price(Temp_data.Price[0]["Silver_price"]) ; 
               set_price_data([Temp_data.Price]) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // ***** Stop load price request Handler ***** // 

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../assets/Font/Ubuntu-Medium.ttf')
            })
           
            setLoadFontValue(true); 

            const Fetch_tablename = await AsyncStorage.getItem("Table") ; 
            setTableName(Fetch_tablename)
        }; 

        loadFont() ; 


        const Load_other_data = async () => {

            try{
                   
                // --- Start load banner request --- // 

                let Fetch_banner_data = {
                    "Check_status": "Fetch_banner", 
                    "Option": "Banner"                
                }; 

                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 
                
                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_banner_data) ; 
                
                set_web_view_url(web_url) ; 

                
                // --- Start load category request --- // 

                let Fetch_category_data = {
                    "Check_status" : "Get_category"
                }; 

                // Set URL to webview 
                set_load_category_view_url("") ;
                set_load_category_view_layout(false) ; 
                set_load_category_view_value(load_category_view_value + 1) ; 
                
                let category_product_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_category_data) ; 
                
                set_load_category_view_url(category_product_url) ; 

            }catch{
               
                ToastAndroid.show("Check your internet connection", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }
          
            // --- Start load price request --- // 

            try{

                let Fetch_price_data = {
                    'Check_status': "Get_gold_price", 
                    'Date': Today_date
                }; 

                // Set URL to webview 
                set_load_price_view_url("") ;
                set_load_price_view_layout(false) ; 
                set_load_price_view_value(load_price_view_url + 1) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_price_data) ; 

                set_load_price_view_url(web_url) ; 

                
            }catch{
                ToastAndroid.show("Network request failed") ; 
            }

           
        }; 

        setTimeout(() => {
            Load_other_data() ; 
        }, 500);

        Text.allowFontScaling = false
        
    }, []);

    // ==== Banner Image Handler ==== // 

    const Banner_Image_Opener = (element) => {

        Linking.openURL(element.image) ; 
    }

    // ==== Latest product handler ==== // 
    const Status_image_opener = () => {
        navigation.navigate("StatusView")
    }

    // ==== View more price opener ==== // 

    const View_more_price_handler = () => {
        navigation.navigate("PriceInformation", {"Price": price_data}) ; 

    }

    // ==== Category product list opener ==== // 

    const Category_product_opener = (category_id, category_name) => {
        navigation.navigate("HomeProductList", {"Category_id":category_id, "Category_name":category_name, "UserTable":TableName}) ; 
    }

    // == WatchList Product Viewer 

    const Watchlist_product_opener = () => {
        navigation.navigate("WatchListProduct", {"Table_name":TableName}) ; 
    }

    // == Cart Product Opener Handler 

    const Cart_product_Handler = () => {
        navigation.navigate("Cart", {"Table_name":TableName}) ; 
    }

    const [opacity_value, set_opacity_value] = useState(0) ; 

    // == Set Slider menu Layout 

    const Set_Slider_menu_layout = async () => {
        
        set_status_bar_color(colorCode.HomeScreenColor.PriceLayoutColor) ; 
        set_opacity_value(1) ;
        await NavigationBar.setBackgroundColorAsync(colorCode.HomeScreenColor.PriceLayoutColor) ; 
    }

    // == Disable Slider menu layout
    const Disable_slider_menu_layout = async () => {
        
        set_status_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
        set_opacity_value(0); 
        await NavigationBar.setBackgroundColorAsync("white") ;     
    }

    // === Open update mobile number layout 
    
    const Update_mobile_number_layout = () => {
        Disable_slider_menu_layout(); 
        navigation.navigate("UpdateMobile"); 
    }

    // == Slider menu Home option 
    const Slider_menu_home_option = () => {
        Disable_slider_menu_layout() ; 
    }
    
    // == Slider menu Cart Option 
    const Slider_menu_cart_option = () => {
        Disable_slider_menu_layout() ; 
        Cart_product_Handler() ; 
    }

    // == Slider menu Shop location option 
    const Slider_menu_shop_location_option = () => {
        Disable_slider_menu_layout() ; 
        set_shop_location_layout(true) ; 
        set_status_bar_color(colorCode.HomeScreenColor.PriceLayoutColor) ; 
    }

    // == Close Shop location option
    const Close_shop_location_layout = () => {
        set_shop_location_layout(false) ;     
        set_status_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    // == Slider menu Check out order option 
    const Slider_check_out_order_option = () => {
        Disable_slider_menu_layout() ; 
        navigation.navigate("OrderLayout", {"Table_name":TableName}) ; 
    }

    // == Slider menu Admin login option
    const Slider_menu_admin_login = () => {
        Disable_slider_menu_layout() ; 
        navigation.navigate("AdminLogin", {"Back":"0"}); 
    }

    const Shop_location_opener = (url) => {
        Linking.openURL(url) ; 
    }


    const [back_press_value, set_back_press_value] = useState(0) ; 

    useEffect(() => {
        if (isScreenFocus == false){

            set_back_press_value(0) ; 
        }
      
    }, [isScreenFocus, back_press_value])

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            
            if (isScreenFocus == true){

                if (opacity_value == 1){
                    set_back_press_value(0) ; 
                    Disable_slider_menu_layout() ; 
                }
                else if (shop_location_layout == 1){
                    set_back_press_value(0); 
                    Close_shop_location_layout() ; 
                }
                else if ((opacity_value == 0) && (shop_location_layout == 0) && (isScreenFocus == true) && (back_press_value == 1)){
                   set_back_press_value(0) ; 
                    Alert.alert("Exit!!", "Are you sure you want to exit?", 
                        [
                            {
                                text:"Yes",
                                onPress : () => BackHandler.exitApp() 
                            }, 
                            {
                                text: "No", 
                                onPress: () => null
                            }
                        ])
                }
                else if ((back_press_value == 0) && (isScreenFocus == true)){
                    set_back_press_value(1) ; 

                }
            }
        });
    }, [navigation, opacity_value, shop_location_layout, isScreenFocus, back_press_value]);

    
    const Logout_handler = async () => {

        await AsyncStorage.setItem("Table", '') ; 

        // navigation.navigate("SplashScreen") ;  
        BackHandler.exitApp() ; 
    }

    const Logout_premission_asker = () => {
        Alert.alert("Logout",
            "Are you sure you want to logout from this account?", 
            [
                {
                    text: "Yes", 
                    onPress: () => Logout_handler()
                }, 
                {
                    text: "No", 
                    onPress: () => null
                }
            ])
    }

    if (loadFontValue){

        return(
            <View style={HomeStyle.HomeScreen}>
                
                <StatusBar
                    backgroundColor= {status_bar_color}
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

                {!load_category_view_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {load_category_view_value}
                            source={{uri:load_category_view_url}}
                            onMessage={Load_category_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {!load_price_view_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {load_price_view_value}
                            source={{uri:load_price_view_url}}
                            onMessage={Load_price_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {opacity_value?<>

                    <Pressable style={[HomeStyle.SliderMenuLayout]}>

                        <View style={[HomeStyle.SliderOptionLayout, {zIndex:10}]}
                            >
                            
                            {/* Shree Shakti gold information title layout  */}

                            <View style={HomeStyle.SliderOptionTitle}>

                                <Text allowFontScaling={false} style={HomeStyle.SliderOptionTitleText}>Shree Shakti Gold</Text>
                                
                                <Pressable style={{marginLeft:"auto"}}
                                    onPress={Disable_slider_menu_layout}>

                                    <Image
                                        source={require('../assets/Image/Close.png')}
                                        style={HomeStyle.SliderOptionClose}
                                    /> 

                                </Pressable>


                            </View>
                            
                            {/* Home Option layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_home_option}>

                                <Text allowFontScaling={false} style={HomeStyle.SliderPressableOptionText}>Home</Text>

                            </Pressable>
                            
                            {/* Cart Option layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_cart_option}>

                                <Text allowFontScaling={false} style={HomeStyle.SliderPressableOptionText}>Cart</Text>

                            </Pressable>
                            

                            {/* Check it order layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_check_out_order_option}>

                                <Text allowFontScaling={false} style={HomeStyle.SliderPressableOptionText}>Check out Order</Text>

                            </Pressable>

                            {/* Update mobile number option  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={() => Update_mobile_number_layout()}>

                                <Text allowFontScaling={false} style={HomeStyle.SliderPressableOptionText}>Update mobile number</Text>

                            </Pressable>
                            
                            {/* Shop location layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_shop_location_option}>

                                <Text allowFontScaling={false} style={HomeStyle.SliderPressableOptionText}>Shop Location</Text>

                            </Pressable>
                                
                            {/* Admin option  */}

                            <Pressable style={[HomeStyle.LogoutOptionLayout, , {marginBottom: 90}]}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_admin_login}>

                                <Image
                                    source={require('../assets/Image/Admin.png')}
                                    style={HomeStyle.LogoutImage}
                                />

                                <Text allowFontScaling={false} style={HomeStyle.LogoutOptionText}>Admin login</Text>

                            </Pressable>

                            {/* Logout option  */}

                            <Pressable style={[HomeStyle.LogoutOptionLayout]}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress = {Logout_premission_asker}>

                                <Image
                                    source={require('../assets/Image/Logout.png')}
                                    style={HomeStyle.LogoutImage}
                                />

                                <Text allowFontScaling={false} style={HomeStyle.LogoutOptionText}>Logout</Text>

                            </Pressable> 

                            

                        </View>
                    
                    </Pressable>

                </>:<></>}
               
                {/* ShopLocation information layout  */}
                
                {shop_location_layout?<>

                    <View style={HomeStyle.LocationMainLayout}>

                        <View style={HomeStyle.LocationLayout}>
                    
                            <View style={HomeStyle.LocationTitleLayout}>

                                <Text allowFontScaling={false} style={HomeStyle.LocationTitleText}>Our branch</Text>

                                <Pressable style={{marginLeft: "auto" }}
                                    onPress={Close_shop_location_layout}>

                                    <Image
                                        source={require('../assets/Image/Close.png')}
                                        style={HomeStyle.LocationImageClose}     
                                    />
                                </Pressable>

                            </View>        

                            {/* Shop location 1 information layout  */}

                            <View style={HomeStyle.BrachLayout}>
                                
                                <Text allowFontScaling={false} style={{fontFamily:"Mukta", fontSize:20, paddingLeft:10}}>Area = Mota varachha</Text>
                                <Text allowFontScaling={false} style={{fontFamily:"Sans", fontSize:18, paddingLeft:10, color:"#5c5c5c"}}>24,25 ABC central,abc chowk,near sudama chowk, vadi, opp. Khodiyar nagar</Text>

                                <Pressable style={HomeStyle.ShopLocationPressable}
                                    android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                    onPress = {() => Shop_location_opener("https://goo.gl/maps/hek8PSDwFgvYf2QHA")}>
                                    <Text allowFontScaling={false} style={{fontFamily:"Ubuntu", fontSize:18, color:"white"}}>Shop location</Text>
                                </Pressable>

                            </View>

                            {/* Shop location 2 information layout  */}

                            <View style={HomeStyle.BrachLayout}>
                                
                                <Text allowFontScaling={false} style={{fontFamily:"Mukta", fontSize:20, paddingLeft:10}}>Area = Mota varachha</Text>
                                <Text allowFontScaling={false} style={{fontFamily:"Sans", fontSize:18, paddingLeft:10, color:"#5c5c5c"}}>
                                     B-13, Janta Apartment, Lambe Hanuman Road, Gayatri-Ramnagar T.P Road, Opp. Gayatri Society, Janata Nagar Society 
                                </Text>

                                <Pressable style={HomeStyle.ShopLocationPressable}
                                    android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                    onPress = {() => Shop_location_opener("https://goo.gl/maps/oJSWsTjTpVQVK1mD7")}>
                                    <Text allowFontScaling={false} style={{fontFamily:"Ubuntu", fontSize:18, color:"white"}}>Shop location</Text>
                                </Pressable>

                            </View>

                        </View>    
                                    
                    </View>  
                </>:<></>}

                
                {/*  ==== Start Header Layout ====  */}

                <View style={HomeStyle.HomeOption}>
                     
                    {/* ** Menu Option **  */}

                    <Pressable style={HomeStyle.HomeOptionPressable}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor}}
                        onPress={Set_Slider_menu_layout}>
    
                        <Image
                            source={require('../assets/Image/Menu.png')}
                            style={[HomeStyle.HomeOptionImage, {height: 35}]}
                        />
                    
                    </Pressable>
    
                    {/* Shakti gold title  */}
    
                    <Text allowFontScaling={false} style={HomeStyle.HomeScreenTitle}>Shree Shakti Gold</Text>

                    {/* ==== Heart, Cart, Location layout option ==== */}

                    <View style={HomeStyle.Cart_Watchlist_layout}>
                      
                        {/* Cart option  */}

                        <Pressable style={[HomeStyle.HomeOptionPressable, {marginLeft:3, marginRight:3}]}
                            onPress = {Cart_product_Handler}>
                            <Image
                                source={require('../assets/Image/Cart.png')}
                                style = {HomeStyle.HomeOptionImage}
                            />
                        </Pressable>
                     
                        {/* Heart option  */}
 
                        <Pressable style={[HomeStyle.HomeOptionPressable, {marginLeft:3, marginRight:3}]}
                            onPress={Watchlist_product_opener}>
                            <Image
                                source={require('../assets/Image/Heart.png')}
                                style = {HomeStyle.HomeOptionImage}
                            />
                        </Pressable>

                        {/* Location option  */}

                        <Pressable style={[HomeStyle.HomeOptionPressable, {marginLeft:3, marginRight:3}]}
                            onPress= { () => Slider_menu_shop_location_option()}>
                            <Image
                                source={require('../assets/Image/Location.png')}
                                style = {HomeStyle.HomeOptionImage}
                            />
                        </Pressable>
                    
                    </View>
                
                </View>

                {/* ==== Close Header Layout ====  */}
               
                <ScrollView>

                {/* ==== Start Banner Image layout ==== */}

                <View style={HomeStyle.BannerLayout}>

                    {Banner_data.length > 0?

                        <FlatListSlider 
                            data={Banner_data} 
                            component = {<HomePreview/>}
                            autoscroll = {false}
                            onPress = {(item) => Banner_Image_Opener(item)}
                            />
                        :<></>}

                </View>

                {/* ==== Close Banner Image layout ====  */}


                {/* ==== Start latest product option layout ==== */}

                <Pressable style={HomeStyle.LatestProductLayout}
                    android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor}}
                    onPress={Status_image_opener}>

                    <Image
                        source={require('../assets/Image/NewArrivals.png')}
                        style={HomeStyle.NewArrivalsImage}
                    />

                    <Text allowFontScaling={false} style={HomeStyle.NewArrivalsText}>Latest Products</Text>

                </Pressable>

                {/* ==== Close latest product option layout ====  */}


                {/* ==== Start Gold Price Information layout ====  */}
                
                <View style={HomeStyle.PriceInformationLayout}>
                       
                    <View style={HomeStyle.PriceTitleLayout}>
                         
                        <Image
                            source={require('../assets/Image/Gold.png')}
                            style={HomeStyle.PriceTitleOptionImage} />

                        <Text allowFontScaling={false} style={HomeStyle.PriceTitle}>(24K) Gold price </Text>
                        
                        <Text allowFontScaling={false} style={HomeStyle.PriceDate}>{Today_date}</Text>
                    
                    </View>
                     
                    {/* Gold Price */}

                    <View style={HomeStyle.PriceDataLayout}>
                         
                        <Text allowFontScaling={false} style={HomeStyle.CurrentPriceTitle}>Current Price:</Text>
                        <Text allowFontScaling={false} style={HomeStyle.CurrentPrice}>₹{gold_price}/10gm</Text>

                    </View>
                      
                    {/* View other Price information  */}
 
                    <Pressable
                        onPress={View_more_price_handler}>
                        <Text allowFontScaling={false} style={HomeStyle.ViewMorePrice}>View other price</Text>
                    </Pressable>
                
                </View>

                {/* ==== Close Gold Price Information layout ====  */}


                {/* === Gold Product category title === */}

                <View style={HomeStyle.CategoryOptionText}>

                    <Text allowFontScaling={false} style={HomeStyle.CategoryTitle}>Gold Products</Text>

                </View>

                {/* ==== Start Gold product category layout  ==== */}

                <View style={HomeStyle.AllCategoryOptionMainLayout}>
                    
                    {load_gold_product_layout?<>
                        <View style={
                            {height:160,
                            width:'95%', 
                            marginLeft:"auto", 
                            marginRight:"auto", 
                            display:"flex", 
                            flex:1,
                            justifyContent:"center"}} >
                            <PacmanIndicator color={colorCode.HomeScreenColor.PriceLayoutColor}></PacmanIndicator>  
                        </View>
                    </>:<>

                        <ScrollView  horizontal showsHorizontalScrollIndicator={false}>

                            {Gold_category.map((element, index) => {
                                return(
                                    
                                    <View style={HomeStyle.CategoryOptionLayout} 
                                        key={index}>

                                        <Pressable style={HomeStyle.CategoryPressableLayout}
                                            android_ripple={{color:colorCode.SignupColorCode.ButtonColor}}
                                            onPress={() => Category_product_opener(element.Category_table, element.Category_name)}>

                                            <Image
                                                source={{uri:element.Category_image}}
                                                style = {HomeStyle.CategoryImage}
                                            />
                                            
                                            <Text allowFontScaling={false} style={HomeStyle.CategoryOptionTextButton}>{element.Category_name}</Text>
                                    
                                        </Pressable>

                                    </View> 

                                )
                            })} 
                    
                        </ScrollView>
                    
                    </>}


                </View>

                {/* ==== Close Gold product category layout ====  */}
                  

                {/* ==== Start Silver Price information layout ==== */}

                <View style={HomeStyle.PriceInformationLayout}>
                       
                    <View style={HomeStyle.PriceTitleLayout}>
                         
                        <Image
                            source={require('../assets/Image/Silver.png')}
                            style={HomeStyle.PriceTitleOptionImage} />

                        <Text allowFontScaling={false} style={HomeStyle.PriceTitle}>Silver price</Text>
                        
                        <Text allowFontScaling={false} style={HomeStyle.PriceDate}>{Today_date}</Text>
                    
                    </View>

                    <View style={HomeStyle.PriceDataLayout}>
                         
                        <Text allowFontScaling={false} style={HomeStyle.CurrentPriceTitle}>Current Price:</Text>

                        <Text allowFontScaling={false} style={HomeStyle.CurrentPrice}>₹{silver_price}/1KG</Text>

                    </View>
                
                </View>

                {/* ==== Close Silver price information layout ====  */}

          
                {/* ==== Silver product category title ==== */}

                <View style={HomeStyle.CategoryOptionText}>

                    <Text allowFontScaling={false} style={HomeStyle.CategoryTitle}>Silver Products</Text>

                </View>

                {/* ==== Start Silver category product layout ==== */}

                <View style={HomeStyle.AllCategoryOptionMainLayout}>

                    {load_silver_product_layout?<>
                        <View style={
                            {height:160,
                            width:'95%', 
                            marginLeft:"auto", 
                            marginRight:"auto", 
                            display:"flex", 
                            flex:1,
                            justifyContent:"center"}} >
                            <PacmanIndicator color={colorCode.HomeScreenColor.PriceLayoutColor}></PacmanIndicator>  
                        </View>    
                    </>:<>
                        <ScrollView  horizontal showsHorizontalScrollIndicator={false}>

                            {Silver_category.map((element, index) => {
                                return(
                                    
                                    <View style={HomeStyle.CategoryOptionLayout} 
                                        key={index}>

                                        <Pressable style={HomeStyle.CategoryPressableLayout}
                                            android_ripple={{color:colorCode.HomeScreenColor.SliverCategoryLayoutRipple}}
                                            onPress={() => Category_product_opener(element.Category_table, element.Category_name)}>

                                            <Image
                                                source={{uri:element.Category_image}}
                                                style = {HomeStyle.CategoryImage}
                                            />
                                            
                                            <Text allowFontScaling={false} style={HomeStyle.CategoryOptionTextButton}>{element.Category_name}</Text>
                                    
                                        </Pressable>

                                    </View> 

                                )
                            })} 
                    
                        </ScrollView>
                    </>}


                </View>

                {/* ==== Close Silver category product layout ====  */}

                {/* ==== Start contact information layout ==== */}

                <View style={HomeStyle.ContactUsLayout}>
                    
                    <Text allowFontScaling={false} style={HomeStyle.ContactUsTitle}>Contact number : </Text>

                    <Pressable style={HomeStyle.ContactUsInformationLayout}
                        android_ripple={{color:"#ececec"}}>
                    
                        <Image
                            source={require('../assets/Image/Contact.png')}
                            style={HomeStyle.ContactUsImage}
                        />
                        <Text allowFontScaling={false} style={HomeStyle.ContactUsText}>Vipulbhai = 9824113124</Text>
                    
                    </Pressable>

                </View>
               
                {/* ==== Close contact information layout ====  */}

                </ScrollView>

            </View>
        )
    }
}

const HomeStyle = StyleSheet.create({
    HomeScreen: {
        backgroundColor: '#ebebeb',
        height: '100%',
        width: '100%'
    },
    HomeOption: {
        backgroundColor:colorCode.SignupColorCode.ButtonColor,
        display: 'flex',
        flexDirection: 'row',  
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8 
    },
    HomeOptionImage:{
        height: 30,
        width: 30
    },
    HomeOptionPressable:{
        width: 40,
        display: 'flex',
        alignItems: 'center',
        paddingTop:8,
        paddingBottom: 8 ,
        marginTop: "auto",
        marginBottom: "auto"
    }, 
    HomeScreenTitle: {
        fontFamily: 'Ubuntu',
        fontSize: 20,
        color: colorCode.HomeScreenColor.HomeScreenTitle,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 8
    },
    Cart_Watchlist_layout:{
        display: 'flex', 
        flexDirection: 'row-reverse' ,
        alignContent: 'flex-end',
        marginLeft: 'auto'
    },
    BannerLayout:{
        height: 250, 
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        resizeMode: 'cover',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ebebeb"
    }, 

    LatestProductLayout:{
        backgroundColor: "white", 
        display: "flex", 
        flexDirection: "row", 
        width: "95%", 
        marginLeft: "auto", 
        marginRight: "auto", 
        marginTop: 10, 
        borderRadius: 10, 
        elevation: 12, 
        shadowColor: "#bdbdbd", 
        paddingTop: 5,
        paddingBottom: 5 

    }, 

    NewArrivalsImage:{
        height: 50, 
        width: 90,
        resizeMode: "cover", 
        marginLeft: 10
    }, 

    NewArrivalsText:{
        fontFamily: "Ubuntu",
        fontSize: 18,
        marginTop: "auto", 
        marginBottom: "auto", 
        marginLeft: 10
    }, 

    PriceInformationLayout:{
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        borderRadius:10,
        elevation: 10,
        shadowColor: '#8a8a8a',
        marginTop: 15,
        paddingRight: 14,
        paddingLeft: 14,
        paddingTop:8,
        paddingBottom:10
    },

    PriceTitleLayout:{
        display: "flex", 
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4',
        paddingBottom: 8
    }, 

    PriceTitleOptionImage:{
        height: 35,
        width: 35,
        marginTop: "auto",
        marginBottom: "auto"
    },

    PriceTitle:{
        fontFamily: "Ubuntu",
        fontSize: 19,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 13,
        color: "white"
    },

    PriceDate:{
        fontFamily: "Sans",
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        color: 'white'
    },

    PriceDataLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop: 8
    },

    CurrentPriceTitle:{
        fontFamily: "Mukta",
        fontSize: 18,
        color: '#4b4b4b',
        marginTop: "auto",
        marginBottom: "auto",
        color: 'white'
    },

    CurrentPrice:{
        fontFamily: "Sans",
        fontSize: 19,
        color: "#4b4b4b",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 8,
        color:'white'
    }, 

    ViewMorePrice:{
        fontFamily: "Mukta",
        fontSize: 18,
        color: 'hsl(209, 100%, 83%)',
        marginTop:5
    }, 

    CategoryOptionText:{
        display: "flex",
        flexDirection: "row",
        width: "93%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
        marginBottom: 15
    },
    CategoryTitle:{
        fontFamily: "Ubuntu",
        fontSize: 19,
        marginTop: "auto",
        marginBottom: "auto",
        color: '#4b4b4b'
    },
    CategoryViewMore:{
        fontFamily: "Mukta",
        fontSize: 19,
        color: '#3853ff',
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto"
    },
    AllCategoryOptionMainLayout:{
        width: '98%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15
    }, 
    CategoryOptionLayout:{
        borderRadius: 5,
        elevation: 10,
        shadowColor:"#8a8a8a",
        width: 125,
        marginLeft: 4,
        marginRight: 4,
        height: 160
    },

    CategoryPressableLayout:{
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft:6,
        paddingRight:6,
        borderRadius: 5
    },   

    CategoryImage:{
        height: 100,
        width: "98%",
        marginLeft: "auto",
        marginRight: "auto",
        resizeMode: 'contain', 
        borderRadius: 8 
    },

    CategoryOptionTextButton:{
        fontFamily: "Ubuntu",
        fontSize: 15,
        color: '#4b4b4b',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        width : '100%',
        textAlign: 'center'
    }, 

    ContactUsLayout:{
        width: '95%',
        marginLeft: "auto", 
        marginRight: "auto", 
        backgroundColor: "white",
        paddingBottom: 10, 
        marginBottom: 10,
        borderRadius: 8  
    }, 

    ContactUsInformationLayout:{
        display: "flex", 
        flexDirection: "row", 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10 , 
        paddingRight: 10 
    },

    ContactUsTitle:{
        fontFamily: "Ubuntu",
        fontSize: 20, 
        paddingTop: 15, 
        paddingLeft: 10 ,
        paddingRight: 10 ,
        paddingBottom: 15 , 
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor, 
        borderTopLeftRadius: 8 ,
        borderTopRightRadius: 8 , 
        color: "white"
    }, 

    ContactUsImage:{
        height: 30, 
        width: 30
    }, 

    ContactUsText:{
        fontFamily: "Mukta", 
        fontSize: 19, 
        marginTop: "auto", 
        marginBottom: "auto", 
        marginLeft: 10, 
        color: "#4a4a4a"
    }, 

    SliderMenuLayout:{
        height: "100%",
        width: "100%", 
        backgroundColor: "rgba(169, 169, 169, 0.505)", 
        position: "absolute", 
        zIndex: 10
    }, 

    SliderOptionLayout:{
        backgroundColor: "#ebebeb", 
        height: "100%", 
        width: "70%", 
        paddingBottom:15
    }, 
    
    SliderOptionTitle:{
        display: "flex", 
        flexDirection: "row", 
        textAlign: "center",
        justifyContent: "center", 
        width: "100%", 
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor, 
        paddingTop:20, 
        paddingLeft: 10 ,
        paddingRight: 10, 
        paddingBottom:20
    }, 

    SliderOptionClose: {
        height: 30, 
        width: 30, 
        marginLeft: "auto", 
        marginTop: "auto",
        marginBottom: "auto"
    },

    SliderOptionTitleText:{
        fontFamily: "Ubuntu", 
        fontSize: 19, 
        marginTop: "auto", 
        marginBottom: "auto", 
        color:"white"
    }, 

    SliderOptionPressableLayout:{
        width: "90%", 
        backgroundColor: "white", 
        marginLeft: 8, 
        marginTop: 10, 
        marginBottom: 10, 
        paddingTop: 13, 
        paddingBottom: 13, 
        paddingLeft: 13 , 
        borderRadius: 8, 
    },

    SliderPressableOptionText:{
        fontFamily: "Ubuntu", 
        fontSize: 18
    }, 

    LogoutOptionLayout:{
        display: "flex",
        flexDirection: "row", 
        marginLeft: 8,
        marginBottom: 20, 
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor, 
        width: "80%", 
        paddingTop:8 ,
        paddingBottom:8,
        paddingLeft: 10, 
        borderRadius: 8, 
        position: "absolute", 
        bottom: 0  
    }, 
    
    LogoutImage:{
        height: 35, 
        width: 35
    },

    LogoutOptionText:{
        fontFamily: "Ubuntu", 
        fontSize: 17,
        color: "white", 
        marginTop: "auto", 
        marginBottom: "auto", 
        marginLeft: 8 
    },
     
    LocationMainLayout:{
        position: "absolute", 
        height: "100%", 
        width: "100%", 
        backgroundColor: "rgba(44, 44, 44, 0.918)", 
        zIndex: 10, 
        display: "flex", 
        textAlign: "center",
        justifyContent: "center", 
        alignItems: "center"
    }, 
    
    LocationLayout:{
        width: "95%", 
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor, 
        margin: "auto", 
        borderRadius:8, 
        paddingBottom: 15, 
    }, 

    LocationTitleLayout:{
        display: "flex", 
        flexDirection: "row", 
        backgroundColor:colorCode.HomeScreenColor.PriceLayoutColor, 
        borderTopLeftRadius:8 ,
        borderTopRightRadius:8, 
        paddingTop: 10,
        paddingBottom: 10, 
        paddingLeft: 10,
        paddingRight: 10
    }, 

    LocationImageClose:{
        height:30,
        width:30
    }, 

    LocationTitleText:{
        fontFamily: "Ubuntu", 
        fontSize: 18, 
        color:"white"
    }, 

    BrachLayout:{
        width: "95%", 
        marginLeft: "auto", 
        marginRight: "auto", 
        backgroundColor: "white", 
        marginTop: 5, 
        marginBottom: 10, 
        paddingTop:10, 
        elevation: 10, 
        shadowColor: "#999999",
        borderRadius:8
    }, 
    
    ShopLocationPressable:{
        backgroundColor: colorCode.HomeScreenColor.PriceInformationTitleColor, 
        alignItems: "center", 
        paddingTop:10,
        paddingBottom:10, 
        borderBottomLeftRadius:8, 
        borderBottomRightRadius:8,
        justifyContent: "center",
        marginTop:10
    }

    
}); 