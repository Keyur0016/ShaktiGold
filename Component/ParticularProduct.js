import { View, StyleSheet, Text, StatusBar, Image, Dimensions, Pressable, Linking, Share, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL'; 
import * as colorCode from './Information/ColorCode' ; 
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from './OtherComponent/PreView'; 
import {WebView} from 'react-native-webview' ; 
import BlurViewLayout from "./OtherComponent/BlurViewLayout";
import { CommonActions } from '@react-navigation/native';

export default function ParticularProduct({navigation, route}){

    // --- Product Data Height --- // 
    const ProductDataHeight = (Dimensions.get('window').height) - 500; 
   
    // --- Product Information --- // 
    const [Product_information, set_Product_information] = useState('') ;
    
    // --- Product Weight --- // 
    const [Product_weight, set_Product_weight] = useState('') ;
   
    // --- Product size --- //
    const [Product_size, set_Product_size] = useState('') ; 
    
    // --- Product discount price --- // 
    const [Product_discount_price, set_Product_discount_price] = useState(''); 
    
    // --- Product retail price --- // 
    const [Product_retail_price, set_Product_retail_price] = useState('') ; 
    
    // --- User table name --- // 
    const [Table_name, set_Table_name] = useState(''); 
    
    // --- Set watchlist value --- // 
    const [watchlist_value, set_watchlist_value] = useState(false); 
    
    // --- Set Category id --- // 
    const [category_id, set_category_id] = useState('') ; 

    // --- Product Image list --- // 
    const [ProductImageList, set_ProductImageList] = useState([]); 

    // --- Product id --- //
    const [product_id, set_product_id] = useState('') ; 

    // --- Loading layout --- //
    const [loading_layout, set_loading_layout] = useState(false) ; 

    // --- Cart item value ---- //
    const [cart_item_value, set_cart_item_value] = useState(false); 

    // --- Navigation bar color --- //
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    // ==== Load font ==== // 
    const [loadFontValue, setLoadFontValue] = useState(false);

    useEffect(() => {

        const loadFont = async () => {
            await Font.loadAsync({
                'Mukta' : require('../assets/Font/Mukta-Medium.ttf'),
                'Sans' : require('../assets/Font/SourceSansPro-Regular.ttf'),
                'Ubuntu': require('../assets/Font/Ubuntu-Medium.ttf')
            })

            setLoadFontValue(true); 
        }; 

        loadFont() ; 
         
        // ==== Load product data information ==== // 

        const Set_other_product_data = () => {

            set_Product_information(route.params.Product.Product_information) ; 

            set_Product_weight(route.params.Product.Product_weight) ; 

            set_Product_size(route.params.Product.Product_size) ; 

            set_Product_discount_price(route.params.Product.Product_discount_price) ; 

            set_Product_retail_price(route.params.Product.Product_retail_price) ; 

            set_Table_name(route.params.Tablename);

            set_watchlist_value(route.params.Watchlist_value) ;

            set_category_id(route.params.Category_id_name) ; 

            set_product_id(route.params.Product.Product_id) ; 

            set_cart_item_value(route.params.cart_item_product) ; 

            if (route.params.Product.Product_image1 != "None"){
                set_ProductImageList([...ProductImageList, {image:route.params.Product.Product_image1}])
            }
            
            if (route.params.Product.Product_image2 != "None"){
                set_ProductImageList([...ProductImageList, {image:route.params.Product.Product_image2}]) ; 
            }

            if (route.params.Product.Product_image3 != "None"){
                set_ProductImageList([...ProductImageList, {image:route.params.Product.Product_image3}]) ; 
            }
        }; 

        Set_other_product_data() ; 

    }, []);
    
    // ==== Product image opener ==== // 

    const Image_Opener = (image_url) => {
        Linking.openURL(image_url.image)
    }
    
    // ==== Share option handler ==== // 

    const Share_option = async () => {
         
        let Share_text = "Shree Shakti gold | " + Product_information + " | Weight = " + Product_weight + " | Size = " + Product_size + " | Price =  " + Product_retail_price + " | " + "Image" +ProductImageList[0].image ; 

        let Share_result = await Share.share({
            message: Share_text , 
            url: ProductImageList[0].image 
        }); 

    }

    // == Set Loading Layout 

    const Set_loading_layout_handler = () => {

        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;

    }

    // == Disable Loading Layout 

    const Disable_loading_layout_handler = () => {

        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 

    }

    // ******* Start Add Product to watchlist Request Handler ******* // 

    const [add_watchlist_layout, set_add_watchlist_layout] = useState(true);
    const [add_watchlist_view_url, set_add_watchlist_view_url] = useState('') ; 
    const [add_watchlist_view_value, set_add_watchlist_view_value] = useState(0); 

    const Add_to_watchlist_handling = async (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_add_watchlist_layout(true) ; 
        
        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Insert"){
        
                Disable_loading_layout_handler(); 
    
                ToastAndroid.show("Insert Product in Watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT ); 
                set_watchlist_value(true) ; 
    
            }
            else{
                
                Disable_loading_layout_handler() ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 
    }

    const Add_to_watchlist = async () => {

        Set_loading_layout_handler() ; 

        try{

            let Insert_watchlist_data = {
                "Check_status": "Insert_watchlist_product",
                "Table_name" : Table_name, 
                "Product_id" : product_id,
                "Category_id": category_id
            }; 

            // Set URL to webview 
            set_add_watchlist_view_url("") ;
            set_add_watchlist_layout(false) ; 
            set_add_watchlist_view_value(add_watchlist_view_value + 1) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_watchlist_data) ; 

            set_add_watchlist_view_url(web_url) ; 

        }catch{
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

    }

    // ****** Close Add Product to watchlist Request Handler ****** // 

    // ****** Remove Add to Product watchlist Request Handler ****** // 

    const [remove_watchlist_layout, set_remove_watchlist_layout] = useState(true) ; 
    const [remove_watchlist_view_url, set_remove_watchlist_view_url] = useState('') ; 
    const [remove_watchlist_view_value, set_remove_watchlist_view_value] = useState(0) ; 

    const Remove_to_watchlist_handling = (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_remove_watchlist_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Delete"){

                Disable_loading_layout_handler() ; 

                ToastAndroid.show("Delete product from watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
                 
                set_watchlist_value(false) ; 

            }
            else{

                Disable_loading_layout_handler() ; 
            }
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 

    }

    const Remove_to_watchlist = async () => {

        Set_loading_layout_handler() ; 

        try{

            let Remove_watchlist_data = {
                "Check_status": "Delete_watchlist_product",
                "Table_name": Table_name,
                "Product_id": product_id
            };

            // Set URL to webview 
            set_remove_watchlist_view_url("") ;
            set_remove_watchlist_layout(false) ; 
            set_remove_watchlist_view_value(remove_watchlist_view_value + 1) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Remove_watchlist_data) ; 

            set_remove_watchlist_view_url(web_url) ;
            
            
        }catch{

            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

    }

    // ***** Close Add to Product watchlist Request Handler ***** // 

    
    // === Back Handler === // 

    const Back_Handler = () => {
        navigation.goBack() ; 
    }

    // === Buy now option handler === // 

    const BuY_now_option = () => {

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Cart" }]
        }));

        navigation.navigate("Cart", {"Table_name":Table_name}) ; 
    }

    if (loadFontValue){
        return(
            <View style={ParticularProductStyle.ParticularProductScreen}>

                <StatusBar
                    backgroundColor={navigation_bar_color}
                />

                {loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}

                {/* Add to watchlist request view  */}

                {!add_watchlist_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {add_watchlist_view_value}
                            source={{uri:add_watchlist_view_url}}
                            onMessage={Add_to_watchlist_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* Remove to watchlist view  */}

                {!remove_watchlist_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {remove_watchlist_view_value}
                            source={{uri:remove_watchlist_view_url}}
                            onMessage={Remove_to_watchlist_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                

                {/* ==== Start Back Image container ====  */}

                <View style={ParticularProductStyle.BackImageContainer}>

                    <Pressable style={[ParticularProductStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress = {Back_Handler}>

                        <Image
                            source={require('../assets/arrow.png')}
                            style={ParticularProductStyle.BackImage}
                        />

                        <Text allowFontScaling={false} style={ParticularProductStyle.BackText}>Back</Text>

                    </Pressable>
                   
                </View>

                {/* ==== Close Back option container ====  */}

                
                {/* ==== Start Product image and information layout ====  */}

                <View style={ParticularProductStyle.ProductLayout}>
                     
                    {/* ProductImage */}
                
                    <View style={ParticularProductStyle.ImageSliderLayout}>
                           
                        <FlatListSlider 
                            data={ProductImageList} 
                            component={<Preview />}
                            autoscroll = {false}
                            onPress = {(item) => Image_Opener(item)}
                        />
                           
                    </View>

                    {/* ProductInformation  */}

                    <View style={[ParticularProductStyle.ProductData, {height:ProductDataHeight}]}>

                        {/* Product information  */}

                        <Text allowFontScaling={false} style={ParticularProductStyle.ProductInformation}>
                            {Product_information}
                        </Text>
                     
                        {/* Weight and Size information layout   */}

                        <View style={ParticularProductStyle.WeightSizeLayout}>
                                        
                            {/* Weight information  */}

                            <View style={ParticularProductStyle.WeightLayout}>

                                <Text allowFontScaling={false} style={ParticularProductStyle.WeightSizeTitle}>Weight |</Text>

                                <Text allowFontScaling={false} style={ParticularProductStyle.WeightSizeInformation}>{Product_weight}</Text>
                             
                            </View>
                             
                            {/* Size information */}

                            <View style={[ParticularProductStyle.SizeLayout]}>
                                
                                <Text allowFontScaling={false} style={ParticularProductStyle.WeightSizeTitle}>Size |</Text>
                             
                                <Text allowFontScaling={false} style={ParticularProductStyle.WeightSizeInformation}>{Product_size}</Text>
                             
                            </View>

                        </View>
                      
                        {/* Price information layout  */}

                        <View style={ParticularProductStyle.PriceInformationLayout}>
                                                
                            <Text allowFontScaling={false} style={[ParticularProductStyle.WeightLayout, 
                                {marginRight: 0, 
                                fontFamily: "Mukta",
                                fontSize: 18}]}>Price</Text>

                            <Text allowFontScaling={false} style={ParticularProductStyle.RetailPrice}>₹{Product_retail_price}</Text>
                             
                            <Text allowFontScaling={false} style={ParticularProductStyle.DiscountPrice}>₹{Product_discount_price}</Text>    
                                            
                        </View>

                        {/* All option layout */}

                        <View style={ParticularProductStyle.AllOptionLayout}>

                            {/* Add to watchlist option  */}

                            {watchlist_value?
                                <>
                                    <Pressable style={[ParticularProductStyle.OptionImageLayout, {backgroundColor: 'transparent', 
                                        height: 35, width: 35}]}
                                        onPress= {() => Remove_to_watchlist()}>
                                        <Image
                                            source={require('../assets/Image/Save_watchlist.png')}
                                            style={ParticularProductStyle.OptionImage}
                                        />
                                    </Pressable>
                                </>
                                :
                                <>
                                    <Pressable style={[ParticularProductStyle.OptionImageLayout, {backgroundColor: 'transparent'}]}
                                        onPress={() => Add_to_watchlist()}>
                                        <Image
                                            source={require('../assets/Image/Watchlist.png')}
                                            style={ParticularProductStyle.OptionImage}
                                        />
                                    </Pressable>

                                </>}

                            {/* Share option */}

                            <Pressable 
                                style={[ParticularProductStyle.OptionImageLayout, {display: "flex", 
                                    flexDirection: "row", 
                                    textAlign: "center", 
                                    justifyContent: "center", 
                                    marginLeft: "auto"}]}
                                    onPress={() => Share_option()}
                                android_ripple={{color:colorCode.HomeScreenColor.PriceInformationTitleColor}}>

                                <Image
                                    source={require('../assets/Image/Share.png')}
                                    style = {ParticularProductStyle.OptionImage}
                                />

                                <Text allowFontScaling={false} style={{fontFamily: "Mukta", 
                                    fontSize: 18, 
                                    color: 'white', 
                                    marginTop: "auto", 
                                    marginBottom: "auto", 
                                    marginLeft: 10}}>
                                    Share
                                </Text>

                            </Pressable>

                            

                        </View>
                        

                    </View>

 
                </View>

                {/* ==== Close Product image and information layout ====  */}

            </View>
        )
    }
}

const ParticularProductStyle = new StyleSheet.create({
    ParticularProductScreen:{
        backgroundColor: '#d6d6d6', 
        height: '100%',
        width: '100%' , 
        paddingBottom: 10
    }, 

    BackImageContainer:{
        display: "flex",
        flexDirection: 'row',
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    }, 

    BackImage:{
        height: 30,
        width: 30, 
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

    ImageSliderLayout:{
        height: 370, 
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        resizeMode: 'cover',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#d6d6d6"
    }, 

    ProductData:{
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom:10,
        width: '97%',
        marginLeft: "auto",
        marginRight: "auto", 
        marginBottom: 10, 
        borderRadius: 5,
        elevation: 10,
        shadowColor: "#242424"
    },

    ProductInformation:{
        fontFamily: 'Ubuntu',
        fontSize: 18,
        color: '#474747',
        paddingLeft: 12,
        paddingRight: 12
    },

    WeightSizeLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop:18, 
        paddingLeft: 10,
        paddingRight: 10
    },
    
    WeightLayout:{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f3f1f1",
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:6,
        paddingRight:6,
        borderRadius:5,
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    },
    
    SizeLayout:{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#f3f1f1",
        marginRight: "1%",
        marginLeft: "1%" , 
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:6,
        paddingRight:6,
        borderRadius:5,
        marginLeft: "auto",
        marginTop: "auto",
        marginBottom: "auto"
    },
    
    WeightSizeTitle:{
        fontFamily: "Mukta",
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        color: "#343434"
    },
    
    WeightSizeInformation:{
        fontFamily: "Sans",
        fontSize: 18,
        marginBottom: "auto",
        marginTop: "auto",
        marginLeft: 5,
        color: '#313131'
    }, 

    
    PriceInformationLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop: 15, 
        paddingLeft: 10,
        paddingBottom: 10
    },
    
    RetailPrice:{
        fontFamily: "Ubuntu",
        fontSize: 17,
        color: '#fb6969', 
        textDecorationLine: 'line-through',
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 12
    },
    
    DiscountPrice:{
        fontFamily: "Ubuntu",
        fontSize: 17,
        color: "#696969",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 8
    }, 

    AllOptionLayout:{
        display: "flex",
        flexDirection: "row",
        width: '100%',
        marginTop: 15
    }, 

    OptionImageLayout:{
       backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
       padding: 8, 
       borderRadius: 5, 
       marginLeft: 10, 
       marginRight: 10, 
       paddingTop: 10,
       paddingBottom: 10
    }, 

    OptionImage:{
        height: 30,
        width: 30
    },

    AddToCartBuyNow:{
        position: 'absolute', 
        display: "flex", 
        flexDirection: "row", 
        bottom: 0, 
        marginLeft: "auto",
        marginRight: "auto",
        width: '100%', 
        textAlign: 'center',
        justifyContent:'center', 
        left: 0,
        right: 0 
    }, 

    AddToCartOptionLayout:{
        width:'100%', 
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
        marginLeft: "auto", 
        marginRight: "auto", 
        paddingTop: 15, 
        paddingBottom: 15, 
        alignItems: 'center' 
    }, 
    
    AddToCartOptionText:{
        fontFamily: "Ubuntu",
        fontSize: 18, 
        color: "#424242"
    }, 
    
    DownloadOption:{
        position: 'absolute', 
        zIndex: 10, 
        marginLeft: 8,
        marginTop: 10
   }
   
}) ; 