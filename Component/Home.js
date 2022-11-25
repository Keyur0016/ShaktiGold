import { View , StyleSheet, StatusBar, Pressable, Image, Text, 
    ScrollView, ToastAndroid, Linking, Animated, Button } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as colorCode from './Information/ColorCode';
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL' ; 
import {FlatListSlider} from 'react-native-flatlist-slider';
import HomePreview from "./Information/HomePreview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from 'expo-navigation-bar' ; 

export default function Home({navigation}){

    // == User Table name 
    const [TableName, setTableName] = useState("") ; 

    // == Today Date 
    const Day = new Date().getDate() ; 
    const Month = new Date().getMonth() + 1 ; 
    const Year = new Date().getFullYear() ; 
    const Today_date = Day + "-" + Month + "-" + Year ;

    // == Gold and Silver Price 
    const [gold_price, set_gold_price] = useState('') ; 
    const [silver_price, set_silver_price] = useState('') ; 
    const [price_data, set_price_data] = useState([]); 

    // == Banner Data 
    const [Banner_data, set_Banner_data] = useState([]) ; 

    // Gold and Silver Category 
    const [Gold_category, set_Gold_category] = useState([]); 
    const [Silver_category, set_Silver_category] = useState([]);

    // == Shop location 
    const [shop_location_layout, set_shop_location_layout] = useState(false) ; 

    // == Checkout Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false); 

    // == Status bar color 
    const [status_bar_color, set_status_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    useEffect(() => {
        
        // -- Load Font 

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


        // -- Load Other data 

        const Load_other_data = async () => {

            try{
               
                // == Load Banner Image 

                let Fetch_banner_url = URL.RequestAPI; 
                let Fetch_banner_data = {
                    "Check_status": "Fetch_banner", 
                    "Option": "Banner"                
                }; 
                let Fetch_banner_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Fetch_banner_data)
                }; 
    
                let Fetch_banner_request = await fetch(Fetch_banner_url, Fetch_banner_option); 
                let Fetch_banner_response = await Fetch_banner_request.json() ; 
                let Fetch_banner_STATUS = Fetch_banner_response.Status ; 
    
                if (Fetch_banner_STATUS == "Fetch"){
                    set_Banner_data([...Fetch_banner_response.Data]); 
                }

                // == Load Gold and Sliver Category 

                let Fetch_category_url = URL.RequestAPI ; 
                let Fetch_category_data = {
                    "Check_status" : "Get_category"
                }; 
                let Fetch_category_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Fetch_category_data)
                }; 

                let Fetch_category_request = await fetch(Fetch_category_url, Fetch_category_option) ; 
                let Fetch_category_response = await Fetch_category_request.json() ; 
                let Fetch_category_STATUS = Fetch_category_response.Status ; 

                if (Fetch_category_STATUS == "Fetch"){
                    set_Gold_category([...Fetch_category_response.Gold_category]);
                    set_Silver_category([...Fetch_category_response.Silver_category]); 
                }

            }catch{
               
                ToastAndroid.show("Check your internet connection", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }

            // == Load Gold and Silver Price 

            try{

                let Fetch_price_url = URL.RequestAPI ; 
                let Fetch_price_data = {
                    'Check_status': "Get_gold_price", 
                    'Date': Today_date
                }; 
                let Fetch_price_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Fetch_price_data)
                }; 

                let Fetch_price_request = await fetch(Fetch_price_url, Fetch_price_option) ; 
                let Fetch_price_response = await Fetch_price_request.json() ; 

                if (Fetch_price_response.Status == "Not set price"){
                    set_gold_price("Not available") ; 
                    set_silver_price("Not available") ; 
                }
                else{
                   set_gold_price(Fetch_price_response.Price[0]["24K_price"]); 
                   set_silver_price(Fetch_price_response.Price[0]["Silver_price"]) ; 
                   set_price_data([Fetch_price_response.Price]) ; 
                }
                
            }catch{
                ToastAndroid.show("Network request failed") ; 
            }
           
        }; 

        Load_other_data() ; 


    }, []);

    // == Banner image opener
    const Banner_Image_Opener = (element) => {
        Linking.openURL(element.image) ; 
    }

    // == View more price opener
    const View_more_price_handler = () => {
        navigation.navigate("PriceInformation", {"Price": price_data}) ; 

    }

    // == Status image opener 
    const Status_image_opener = () => {
        navigation.navigate("StatusView")
    }

    // == Category ProductList Opener

    const Category_product_opener = (category_id, category_name) => {
        navigation.navigate("HomeProductList", {"Category_id":category_id, "Category_name":category_name, "UserTable":TableName}) ; 
    }

    // == WatchList Product Viewer 
    const Watchlist_product_opener = () => {
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
    }

    // == Close Shop location option
    const Close_shop_location_layout = () => {
        set_shop_location_layout(false) ; 
    }

    // == Slider menu Check out order option 
    const Slider_check_out_order_option = () => {
        Disable_slider_menu_layout() ; 
        navigation.navigate("OrderLayout", {"Table_name":TableName}) ; 
    }

    // == Slider menu Admin login option
    const Slider_menu_admin_login = () => {
        navigation.navigate("AdminLogin"); 
    }

    if (loadFontValue){

        return(
            <View style={HomeStyle.HomeScreen}>
                
                <StatusBar
                    backgroundColor= {status_bar_color}
                />

                {opacity_value?<>

                    <View style={[HomeStyle.SliderMenuLayout]}>

                        <View style={HomeStyle.SliderOptionLayout}>
                            
                            {/* Shree Shakti gold information title layout  */}

                            <View style={HomeStyle.SliderOptionTitle}>

                                <Text style={HomeStyle.SliderOptionTitleText}>Shree Shakti Gold</Text>
                                
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

                                <Text style={HomeStyle.SliderPressableOptionText}>Home</Text>

                            </Pressable>
                            
                            {/* Cart Option layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_cart_option}>

                                <Text style={HomeStyle.SliderPressableOptionText}>Cart</Text>

                            </Pressable>
                            
                            {/* Contact us layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}>

                                <Text style={HomeStyle.SliderPressableOptionText}>Contact us</Text>

                            </Pressable>

                            {/* Check it order layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_check_out_order_option}>

                                <Text style={HomeStyle.SliderPressableOptionText}>Check out Order</Text>

                            </Pressable>
                            
                            {/* Shop location layout  */}

                            <Pressable style={HomeStyle.SliderOptionPressableLayout}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_shop_location_option}>

                                <Text style={HomeStyle.SliderPressableOptionText}>Shop Location</Text>

                            </Pressable>
                                
                            {/* Admin option  */}

                            <Pressable style={[HomeStyle.LogoutOptionLayout, , {marginBottom: 90}]}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}
                                onPress={Slider_menu_admin_login}>

                                <Image
                                    source={require('../assets/Image/Admin.png')}
                                    style={HomeStyle.LogoutImage}
                                />

                                <Text style={HomeStyle.LogoutOptionText}>Admin login</Text>

                            </Pressable>

                            {/* Logout option  */}

                            <Pressable style={[HomeStyle.LogoutOptionLayout]}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}>

                                <Image
                                    source={require('../assets/Image/Logout.png')}
                                    style={HomeStyle.LogoutImage}
                                />

                                <Text style={HomeStyle.LogoutOptionText}>Logout</Text>

                            </Pressable> 

                            

                        </View>
                    
                    </View>
                </>:<></>}
               
                {/* ShopLocation information layout  */}
                
                {shop_location_layout?<>
                    <View style={HomeStyle.LocationMainLayout}>

                        <View style={HomeStyle.LocationLayout}>
                    
                            <View style={HomeStyle.LocationTitleLayout}>

                                <Text style={HomeStyle.LocationTitleText}>Our branch</Text>

                                <Pressable style={{marginLeft: "auto" }}
                                    onPress={Close_shop_location_layout}>

                                    <Image
                                        source={require('../assets/Image/Close.png')}
                                        style={HomeStyle.LocationImageClose}     
                                    />
                                </Pressable>

                            </View>        

                            <View style={HomeStyle.BrachLayout}>
                                
                                <Text style={{fontFamily:"Ubuntu", fontSize:16, paddingLeft:10}}>Area = Mota varachha</Text>
                                
                                <Image
                                    source={require('../assets/Image/Shop1.png')}
                                    style={{width:"100%", height:170, resizeMode:"contain", marginTop:10, marginBottom:10}}
                                />

                                <Pressable style={HomeStyle.ShopLocationPressable}>
                                    <Text style={{fontFamily:"Ubuntu", fontSize:17, color:"white"}}>Shop location</Text>
                                </Pressable>

                            </View>

                            <View style={HomeStyle.BrachLayout}>
                                
                                <Text style={{fontFamily:"Ubuntu", fontSize:16, paddingLeft:10}}>Area = Mota varachha</Text>
                                
                                <Image
                                    source={require('../assets/Image/Shop1.png')}
                                    style={{width:"100%", height:170, resizeMode:"contain", marginTop:10, marginBottom:10}}
                                />

                                <Pressable style={HomeStyle.ShopLocationPressable}>
                                    <Text style={{fontFamily:"Ubuntu", fontSize:17, color:"white"}}>Shop location</Text>
                                </Pressable>

                            </View>

                        </View>    
                                    
                    </View>  
                </>:<></>}

                
                {/*  == Header Layout ==  */}

                <View style={HomeStyle.HomeOption}>
                     
                    {/* Menu Option  */}

                    <Pressable style={HomeStyle.HomeOptionPressable}
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor}}
                        onPress={Set_Slider_menu_layout}>
    
                        <Image
                            source={require('../assets/Image/Menu.png')}
                            style={[HomeStyle.HomeOptionImage, {height: 35}]}
                        />
                    
                    </Pressable>
    
                    {/* Shakti gold title  */}
    
                    <Text style={HomeStyle.HomeScreenTitle}>Shakti Gold</Text>
                    
                    {/* Heart and Cart option layout  */}

                    <View style={HomeStyle.Cart_Watchlist_layout}>
                      
                        {/* Cart option  */}

                        <Pressable style={[HomeStyle.HomeOptionPressable, {marginLeft:5, marginRight:5}]}
                            onPress = {Cart_product_Handler}>
                            <Image
                                source={require('../assets/Image/Cart.png')}
                                style = {HomeStyle.HomeOptionImage}
                            />
                        </Pressable>
                     
                        {/* Heart option  */}
 
                        <Pressable style={[HomeStyle.HomeOptionPressable, {marginLeft:5, marginRight:5}]}>
                            <Image
                                source={require('../assets/Image/Heart.png')}
                                style = {HomeStyle.HomeOptionImage}
                            />
                        </Pressable>

                        {/* Location option  */}

                        <Pressable style={[HomeStyle.HomeOptionPressable, {marginLeft:5, marginRight:5}]}>
                            <Image
                                source={require('../assets/Image/Location.png')}
                                style = {HomeStyle.HomeOptionImage}
                            />
                        </Pressable>
                    
                    </View>
                
                </View>
               
                <ScrollView>

                {/* == Banner images == */}

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

                {/* == Latest Product View Option ==   */}

                <Pressable style={HomeStyle.LatestProductLayout}
                    android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor}}
                    onPress={Status_image_opener}>

                    <Image
                        source={require('../assets/Image/NewArrivals.png')}
                        style={HomeStyle.NewArrivalsImage}
                    />

                    <Text style={HomeStyle.NewArrivalsText}>Latest Products</Text>

                </Pressable>

                {/* == Gold Price Information layout ==  */}
                
                <View style={HomeStyle.PriceInformationLayout}>
                       
                    <View style={HomeStyle.PriceTitleLayout}>
                         
                        <Image
                            source={require('../assets/Image/Gold.png')}
                            style={HomeStyle.PriceTitleOptionImage} />

                        <Text style={HomeStyle.PriceTitle}>(24K) Gold price </Text>
                        
                        <Text style={HomeStyle.PriceDate}>{Today_date}</Text>
                    
                    </View>
                     
                    {/* Gold Price */}

                    <View style={HomeStyle.PriceDataLayout}>
                         
                        <Text style={HomeStyle.CurrentPriceTitle}>Current Price:</Text>
                        <Text style={HomeStyle.CurrentPrice}>₹{gold_price}/10gm</Text>

                    </View>
                      
                    {/* View other Price information  */}
 
                    <Pressable
                        onPress={View_more_price_handler}>
                        <Text style={HomeStyle.ViewMorePrice}>View other price</Text>
                    </Pressable>
                
                </View>

                {/* == Gold Price Category list title layout ==  */}

                <View style={HomeStyle.CategoryOptionText}>

                    <Text style={HomeStyle.CategoryTitle}>Gold Products</Text>

                </View>

                {/* == Gold Product sub category == */}

                <View style={HomeStyle.AllCategoryOptionMainLayout}>

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
                                        
                                        <Text style={HomeStyle.CategoryOptionTextButton}>{element.Category_name}</Text>
                                 
                                    </Pressable>

                                </View> 

                            )
                        })} 
                 
                    </ScrollView>

                </View>
                  
                {/* == Silver Price information layout == */}

                <View style={HomeStyle.PriceInformationLayout}>
                       
                    <View style={HomeStyle.PriceTitleLayout}>
                         
                        <Image
                            source={require('../assets/Image/Silver.png')}
                            style={HomeStyle.PriceTitleOptionImage} />

                        <Text style={HomeStyle.PriceTitle}>Silver price</Text>
                        
                        <Text style={HomeStyle.PriceDate}>{Today_date}</Text>
                    
                    </View>

                    <View style={HomeStyle.PriceDataLayout}>
                         
                        <Text style={HomeStyle.CurrentPriceTitle}>Current Price:</Text>

                        <Text style={HomeStyle.CurrentPrice}>₹{silver_price}/10gm</Text>

                    </View>
                
                </View>
          
                {/* == Silver sub category title == */}

                <View style={HomeStyle.CategoryOptionText}>

                    <Text style={HomeStyle.CategoryTitle}>Silver Products</Text>

                </View>

                {/* == Silver Product sub category == */}

                <View style={HomeStyle.AllCategoryOptionMainLayout}>

                    <ScrollView  horizontal showsHorizontalScrollIndicator={false}>

                        {Silver_category.map((element, index) => {
                            return(
                                 
                                <View style={HomeStyle.CategoryOptionLayout} 
                                    key={index}>

                                    <Pressable style={HomeStyle.CategoryPressableLayout}
                                        android_ripple={{color:colorCode.HomeScreenColor.SliverCategoryLayoutRipple}}>

                                        <Image
                                            source={{uri:element.Category_image}}
                                            style = {HomeStyle.CategoryImage}
                                        />
                                        
                                        <Text style={HomeStyle.CategoryOptionTextButton}>{element.Category_name}</Text>
                                 
                                    </Pressable>

                                </View> 

                            )
                        })} 
                 
                    </ScrollView>

                </View>

                {/* == Contact us information layout == */}

                <View style={HomeStyle.ContactUsLayout}>
                    
                    <Text style={HomeStyle.ContactUsTitle}>Contact number : </Text>

                    <Pressable style={HomeStyle.ContactUsInformationLayout}
                        android_ripple={{color:"#ececec"}}>
                    
                        <Image
                            source={require('../assets/Image/Contact.png')}
                            style={HomeStyle.ContactUsImage}
                        />
                        <Text style={HomeStyle.ContactUsText}>Vipulbhai = 6354757251</Text>
                    
                    </Pressable>

                    <Pressable style={HomeStyle.ContactUsInformationLayout}
                        android_ripple={{color:"#ececec"}}>
                    
                        <Image
                            source={require('../assets/Image/Contact.png')}
                            style={HomeStyle.ContactUsImage}
                        />

                        <Text style={HomeStyle.ContactUsText}>Shailashbhai = 9824113124</Text>
                    
                    </Pressable>

                </View>
                
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
        height: 32,
        width: 32
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
        fontSize: 21,
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
        resizeMode: 'cover', 
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
        backgroundColor: "rgba(160, 160, 160, 0.708)", 
        zIndex: 10, 
        display: "flex", 
        textAlign: "center",
        justifyContent: "center", 
        alignItems: "center"
    }, 
    
    LocationLayout:{
        width: "90%", 
        backgroundColor: "#ececec", 
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
        marginTop: 10, 
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
        borderBottomRightRadius:8
    }

    
}); 