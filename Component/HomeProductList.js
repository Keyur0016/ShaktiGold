import { View, StyleSheet, StatusBar, TextInput, Pressable, 
Text, ScrollView, Image, FlatList, ToastAndroid, Linking, DevSettings } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from './Information/ColorCode' ;
import * as URL from './Information/RequestURL'; 
import BlurViewLayout from "./OtherComponent/BlurViewLayout";
import {WebView} from 'react-native-webview' ; 
import LoadingData from './OtherComponent/LoadingData' ; 

export default function HomeProductList({navigation, route}){
    
    // == Route attributes == // 
    const {UserTable, Category_id, Category_name} = route.params ; 

    // == Category Product Data 
    const [category_product, set_category_product] = useState([]); 
    
    // == Watchlist Product id 
    const [watchlist_product, set_watchlist_product] = useState([]); 

    // == Cart Product Product id 
    const [cart_product_item_id, set_cart_product_item_id] = useState([]) ; 

    // == Loading Layout value 
    const [loading_layout, set_loading_layout] = useState(false) ; 
    
    // == Disable Navigation bar color
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    // == Check Font loaded or not 
    const [loadFontValue, setLoadFontValue] = useState(false);

    // **** Start Category product data fetch request *** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;
    const [product_data_layout, set_product_data_layout] = useState(true) ; 
    
    // -- Load Product data webview -- // 

    const Load_product_list = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_webview_layout(true) ;
        set_product_data_layout(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 
            
            if (Temp_data.Status == "Fetch"){  
                 
                set_category_product([...Temp_data.Product]); 
            } 

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Close Category product data fetch request **** // 

    
    // **** Start Watchlist and Cart Product id Fetch Request Handler **** // 

    const [watchlist_view_layout, set_watchlist_view_layout] = useState(true) ;
    const [watchlist_view_url, set_watchlist_view_url] = useState('') ; 
    const [watchlist_view_value, set_watchlist_view_value] = useState(0) ; 

    // -- Webview request -- // 

    const Load_watchlist_and_cart_product_id = (event) => {
        let Temp_data = event.nativeEvent.data ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 
            set_watchlist_view_layout(true) ; 

            if (Temp_data.Status == "Fetch"){
                    
                set_watchlist_product([...Temp_data.Watchlist]) ;
                set_cart_product_item_id([...Temp_data.Cart_item]) ;  
            }

        }catch{}
    }

    // **** Close Watchlist and Cart Product id Fetch Request Handler **** // 

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

        // --- Load Product data request --- // 

        const Load_watchlist_product_data = async () => {

            try{

                let Fetch_watchlist_product_data = {
                    "Table_name": UserTable,
                    "Check_status": "Fetch_watchlist_product"
                }; 

                // Set URL to webview 
                set_watchlist_view_url("") ;
                set_watchlist_view_layout(false) ; 
                set_watchlist_view_value(watchlist_view_value + 1) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_watchlist_product_data) ; 

                set_watchlist_view_url(web_url) ; 

            }catch{
                ToastAndroid.show("Failed to load watchlist products", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }

        // --- Load watchlist and cart product id  --- // 

        const Load_category_data = async () => {
            
            let Fetch_category_data = {
                "Check_status":"Get_category_product",
                "CategoryId": Category_id
            };
            
            // Set URL to webview 
            set_web_view_url("") ;
            set_webview_layout(false) ; 
            set_webview_value(webview_value + 1) ; 
            set_product_data_layout(true) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_category_data) ; 
            set_web_view_url(web_url) ; 
        }; 
        
        
        setTimeout(() => {
            Load_watchlist_product_data() ; 
            Load_category_data() ; 
        }, 500);

    }, []);

    // Operation perform product id // 

    const [operation_product_id, set_operation_product_id] = useState('') ; 

    // --- Product Image Opener --- //  

    const Product_image_opener = (image_url) => {
        Linking.openURL(image_url) ; 
    }

    // --- Set Loading layout --- // 

    const Set_loading_layout_handler = () => {
        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }

    // --- Disable Loading layout --- // 

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
                set_watchlist_product([...watchlist_product,operation_product_id]); 
    
            }
            else{
                
                Disable_loading_layout_handler() ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 
    }

    const Insert_watchlist = async (Product_id) => {

        Set_loading_layout_handler() ; 

        try{
            let Insert_watchlist_data = {
                "Check_status": "Insert_watchlist_product",
                "Table_name" : UserTable, 
                "Product_id" : Product_id,
                "Category_id": Category_id
            }; 

            // Set URL to webview 
            set_add_watchlist_view_url("") ;
            set_add_watchlist_layout(false) ; 
            set_add_watchlist_view_value(add_watchlist_view_value + 1) ; 
            set_operation_product_id(Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_watchlist_data) ; 

            set_add_watchlist_view_url(web_url) ; 
            
        }catch{
            
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }


    }

    // ****** Close Add Product to watchlist Request Handler ****** // 


    // ****** Start Remove product from watchlist Request Handler ****** // 

    const [remove_watchlist_layout, set_remove_watchlist_layout] = useState(true) ; 
    const [remove_watchlist_view_url, set_remove_watchlist_view_url] = useState('') ; 
    const [remove_watchlist_view_value, set_remove_watchlist_view_value] = useState(0) ; 

    const Remove_to_watchlist_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_remove_cart_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Delete"){

                Disable_loading_layout_handler() ; 

                ToastAndroid.show("Delete Product from Watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                for(let i = 0; i<watchlist_product.length; i++){
                    if (watchlist_product[i] == operation_product_id){
                        watchlist_product.splice(i, 1); 
                    }
                }
                set_watchlist_product([...watchlist_product]); 

            }
            else{

                Disable_loading_layout_handler() ; 
            }
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 

    }

    const Remove_watchlist = async (Product_id) => {

        Set_loading_layout_handler() ; 

        try{

            let Remove_watchlist_data = {
                "Check_status": "Delete_watchlist_product",
                "Table_name": UserTable,
                "Product_id": Product_id 
            };

            // Set URL to webview 
            set_remove_watchlist_view_url("") ;
            set_remove_watchlist_layout(false) ; 
            set_remove_watchlist_view_value(remove_watchlist_view_value + 1) ; 
            set_operation_product_id(Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Remove_watchlist_data) ; 

            set_remove_watchlist_view_url(web_url) ; 
            
            
        }catch{

            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

    }

    // ****** Close Remove product from watchlist Request Handler ****** // 

     
    // ****** Start Add Product to Cart Request Handler ****** // 
    
    const [add_cart_layout, set_add_cart_layout] = useState(true) ; 
    const [add_cart_view_url, set_add_cart_view_url] = useState('') ; 
    const [add_cart_view_value, set_add_cart_view_value] = useState(0) ; 

    const Add_to_cart_handling = (event) => {

        let Temp_data = event.nativeEvent.data ; 

        try{

            Temp_data = JSON.parse(Temp_data); 
            set_add_cart_layout(true) ; 

            if (Temp_data.Status == "Insert"){
                
                set_cart_product_item_id([...cart_product_item_id, operation_product_id]) ; 

                Disable_loading_layout_handler() ;

                ToastAndroid.show("Insert Product into Cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }
            else{

                Disable_loading_layout_handler() ; 

            }
            
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }

        Disable_loading_layout_handler() ; 
    }

    const Add_To_cart_Handler = async (Product_id) => {

        Set_loading_layout_handler() ; 

        try {
            
            let Insert_cart_data = {
                "Check_status":"Insert_cart_item", 
                "Table_name": UserTable, 
                "Product_id": Product_id,
                "Category_id": Category_id
            }; 

            // Set URL to webview 
            set_add_cart_view_url("") ;
            set_add_cart_layout(false) ; 
            set_add_cart_view_value(add_cart_view_value + 1) ; 
            set_operation_product_id(Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_cart_data) ; 

            set_add_cart_view_url(web_url) ; 
            

        } catch (error) {
            
            Disable_loading_layout_handler(); 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

    }

    // ****** Stop Add Product to Cart Request Handler ****** //
   
    
    // ****** Start Remove product from cart Request Handle ****** // 

    const [remove_cart_layout, set_remove_cart_layout] = useState(true) ; 
    const [remove_cart_view_url, set_remove_cart_view_url] = useState('') ; 
    const [remove_cart_view_value, set_remove_cart_view_value] = useState(0) ; 
    
    const Remove_to_cart_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 
            set_remove_cart_layout(true) ; 

            if (Temp_data.Status == "Delete"){

                Disable_loading_layout_handler() ; 

                for(let i = 0 ; i<cart_product_item_id.length; i++){
                    if (cart_product_item_id[i] == operation_product_id){
                        cart_product_item_id.splice(i, 1) ;
                    }
                }

                set_cart_product_item_id([...cart_product_item_id]) ; 

                ToastAndroid.show("Delete from cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;

            }else{

                Disable_loading_layout_handler() ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    const Remove_from_cart_Handler = async (Product_id) => {
          
        Set_loading_layout_handler() ; 

        try {
            
            let Remove_cart_data = {
                "Check_status":"Delete_cart_item", 
                "Table_name": UserTable, 
                "Product_id": Product_id,
                "Category_id":  Category_id
            };  

            // Set URL to webview 
            set_remove_cart_view_url("") ;
            set_remove_cart_layout(false) ; 
            set_remove_cart_view_value(remove_cart_view_value + 1) ; 
            set_operation_product_id(Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Remove_cart_data) ; 

            set_remove_cart_view_url(web_url) ; 


            

        } catch (error) {
            
            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
        }
    }

    // ****** Stop Remove product from cart Request Handler ****** // 


    const Open_particular_product = (element) => {

        let Watchlist_value = watchlist_product.includes(element.Product_id) ; 
        let CartItem_value = cart_product_item_id.includes(element.Product_id) ; 
        navigation.navigate("ParticularProduct", {"Product": element, "Tablename":UserTable, "Watchlist_value": Watchlist_value, 
            "Category_id_name": Category_id, "Cart_item_product":CartItem_value}) ; 
    }
          

    const Back_press_Handler = () => {
        navigation.navigate("Home") ; 
    }
 
    if (loadFontValue){

        return(
            <View style={ProductListStyle.ProductListScreen}>
              
                <StatusBar
                    backgroundColor={navigation_bar_color}
                />
                
                {loading_layout?<>
                    <BlurViewLayout/>
                </>:<></>}

                {/* Product data fetch  webview  */}

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
                            onMessage={Load_product_list}
                            ></WebView>
                    </View>
                </>:<></>}
                 
                {/* Watchlist and Product id fetch webview  */}
                                
                {!watchlist_view_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {watchlist_view_value}
                            source={{uri:watchlist_view_url}}
                            onMessage={Load_watchlist_and_cart_product_id}
                            ></WebView>
                    </View>
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

                {/* Add to cart request view  */}
                
                {!remove_cart_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {remove_cart_view_value}
                            source={{uri:remove_cart_view_url}}
                            onMessage={Remove_to_cart_handling}
                            ></WebView>
                    </View>
                </>:<></>}

                {/* Remove from cart request view  */}

                {!add_cart_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {add_cart_view_value}
                            source={{uri:add_cart_view_url}}
                            onMessage={Add_to_cart_handling}
                            ></WebView>
                    </View>
                </>:<></>}
                
                {/* === Back Option Container ==  */}

                <View style={ProductListStyle.SearchLayout}>

                    <Pressable
                        android_ripple={{color:colorCode.SignupColorCode.ButtonRippleColor}}
                        onPress = {Back_press_Handler}>

                        <Image
                            source={require('../assets/arrow.png')}
                            style = {{height: 25, width: 25, marginTop:"auto", marginBottom:"auto"}}
                        />

                    </Pressable>

                    <Text allowFontScaling={false} style={[ProductListStyle.PopularProductTitle, {marginTop:"auto", marginBottom:"auto"}]}>
                        {Category_name}
                    </Text>

                </View>

                {/* == Product list layout == */}

                {product_data_layout?<>
                    <LoadingData/>
                </>:<>
                    <View style={ProductListStyle.PopularProductMainLayout}>

                        <ScrollView  showsVerticalScrollIndicator={false}>

                            {category_product.length != 0?<>

                            {category_product.map((element, index) => {
                                return(
                                <View style={[ProductListStyle.PopularProductLayout]} 
                                    key={index}>

                                    <Pressable style={ProductListStyle.PopularProductPressableLayout}
                                        android_ripple={{color:colorCode.HomeScreenColor.ProductLayoutRippler}}
                                        onPress={() => Open_particular_product(element) }>
                                        
                                        {/* == Product image == */}

                                        <Pressable style={ProductListStyle.PressableImageLayout}
                                            onPress = {() => Product_image_opener(element.Product_image1)}>

                                            <Image
                                                source={{uri:element.Product_image1}}
                                                style = {ProductListStyle.PopularProductImage}
                                            />

                                        </Pressable>
                                        
                                        {/* == Product Data layout ==  */}

                                        <View style={ProductListStyle.ProductInfoData}>

                                            {/* Product information  */}

                                            <Text allowFontScaling={false} style={ProductListStyle.ProductInformation}>{element.Product_information}</Text>
                                                
                                            {/* Weight and Size information layout   */}

                                            <View style={ProductListStyle.WeightSizeLayout}>
                                        
                                                {/* Weight information  */}

                                                <View style={ProductListStyle.WeightLayout}>

                                                    <Text allowFontScaling={false} style={ProductListStyle.WeightSizeTitle}>Weight |</Text>

                                                    <Text allowFontScaling={false} style={ProductListStyle.WeightSizeInformation}>{element.Product_weight}</Text>
                                                
                                                </View>
                                                
                                                {/* Size information */}

                                                <View style={[ProductListStyle.SizeLayout]}>
                                                    
                                                    <Text allowFontScaling={false} style={ProductListStyle.WeightSizeTitle}>Size |</Text>
                                                
                                                    <Text allowFontScaling={false} style={ProductListStyle.WeightSizeInformation}>{element.Product_size}</Text>
                                                
                                                </View>

                                            </View>

                                            {/* Price information layout  */}
                                            
                                            <View style={ProductListStyle.PriceInformationLayout}>
                                                
                                                <Text allowFontScaling={false} style={[ProductListStyle.WeightLayout, 
                                                    {marginRight: 0, 
                                                    fontFamily: "Mukta",
                                                    fontSize: 18}]}>Price</Text>
                                            
                                                {/* Retail Price  */}

                                                <Text allowFontScaling={false} style={ProductListStyle.RetailPrice}>₹{element.Product_retail_price}</Text>
                                                
                                                {/* Discount Price  */}

                                                <Text allowFontScaling={false} style={ProductListStyle.DiscountPrice}>₹{element.Product_discount_price}</Text>    
                                            
                                            </View>

                                            {/* Share Option layout  */}

                                            <View style={ProductListStyle.ShareTypeOption}>

                                                {/* Add to cart option  */}

                                                {cart_product_item_id.includes(element.Product_id)?<>
                                                    <Pressable style={ProductListStyle.RemoveFromCartLayout}
                                                        android_ripple={{color: "#ffa3a3"}}
                                                        onPress = {() => Remove_from_cart_Handler(element.Product_id)}>

                                                        <Image
                                                            source={require('../assets/Image/Delete.png')}
                                                            style={ProductListStyle.OptionImage}
                                                        />
                                                    
                                                    </Pressable>

                                                </>:<>
                                                    <Pressable style={ProductListStyle.OptionPressableLayout}
                                                        android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                        onPress={() => Add_To_cart_Handler(element.Product_id)}>

                                                        <Image
                                                            source={require('../assets/Image/Cart_add.png')}
                                                            style={ProductListStyle.OptionImage}
                                                        />
                                                    
                                                    </Pressable>
                                                </>}

                                                {watchlist_product.includes(element.Product_id)?
                                                <>
                                                        
                                                    {/* Watchlist option  */}

                                                    <Pressable style={[ProductListStyle.OptionPressableLayout, {backgroundColor:'transparent'}]}
                                                        android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                        onPress={() => Remove_watchlist(element.Product_id)}>

                                                        <Image
                                                            source={require('../assets/Image/Save_watchlist.png')}
                                                            style={ProductListStyle.OptionImage}
                                                        />
                                            
                                                    </Pressable>

                                                </>
                                                :<>
                                                    {/* Watchlist option  */}

                                                    <Pressable style={[ProductListStyle.OptionPressableLayout, {backgroundColor:"transparent"}]}
                                                        android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                        onPress={() => Insert_watchlist(element.Product_id)}>

                                                        <Image
                                                            source={require('../assets/Image/Watchlist.png')}
                                                            style={ProductListStyle.OptionImage}
                                                        />
                                            
                                                    </Pressable>

                                                </>
                                                }

                                            </View>

                                        </View>

                                    </Pressable>

                                </View> 

                                )
                            })}
                            </>:<>
                                <Text allowFontScaling={false} style={{fontFamily:"Ubuntu", fontSize:19, marginLeft:"auto", 
                                marginRight:"auto", marginTop:"2%"}}>Not available any Product</Text>
                            </>} 
                            
                        </ScrollView>
                    </View> 
                </>}


            </View>

        )
    } 

}

const ProductListStyle = StyleSheet.create({
    ProductListScreen: {
        backgroundColor: '#ebebeb',
        height: '100%',
        width: '100%'
    },

    SearchLayout:{
        backgroundColor: colorCode.SignupColorCode.ButtonColor,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 12, 
        paddingBottom: 12 
    }, 
    
    PopularProductTitle:{
        fontFamily: "Ubuntu",
        fontSize: 19,
        color: colorCode.HomeScreenColor.HomeScreenTitle,
        marginRight: "auto",
        marginLeft: 15, 
        marginTop: "auto", 
        marginBottom: "auto"
    }, 
    
    PopularProductMainLayout:{
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 8,
        height: '92%'
    }, 
    
    PopularProductLayout:{
        borderRadius: 10,
        elevation: 8,
        shadowColor:"#5b5b5b",
        height: 185,
        width: '100%',
        marginTop: 5,
        marginBottom:5
    },
    
    PopularProductPressableLayout:{
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 15,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row"
    },   
    
    PressableImageLayout:{
        width: "30%", 
        display: "flex", 
        textAlign: "center", 
        justifyContent: "center", 
        alignItems: "center", 
        paddingLeft: 8,
        paddingRight: 8
    }, 

    PopularProductImage:{
        height: "100%",
        width: "100%",
        resizeMode: 'contain'
    },
    
    ProductInfoData:{
        width:"70%",
        paddingLeft: "3%",
        borderLeftWidth: 1,
        borderLeftColor: "#ececec"
    },
    
    ProductInformation:{
        fontFamily: "Ubuntu",
        fontSize: 18,
        color: '#4b4b4b',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
        width : '100%',
        textAlign: 'left'
    },
    
    WeightSizeLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop:13
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
        fontSize: 17,
        marginTop: "auto",
        marginBottom: "auto",
        color: "#343434"
    },
    
    WeightSizeInformation:{
        fontFamily: "Sans",
        fontSize: 17,
        marginBottom: "auto",
        marginTop: "auto",
        marginLeft: 5,
        color: '#313131'
    },
    
    PriceInformationLayout:{
        display: "flex",
        flexDirection: "row",
        marginTop: 10
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
    
    ShareTypeOption:{
        display:"flex",
        flexDirection: "row-reverse",
        width: "100%",
        borderRadius: 10,
        marginLeft: "auto",
        alignItems: "center", 
        marginTop: 10, 
    }, 
    
    OptionImage:{
        height: 28,
        width: 28, 
    }, 
    
    OptionPressableLayout:{
        backgroundColor: colorCode.HomeScreenColor.PriceLayoutColor,
        marginLeft: "4%",
        marginRight: "4%",
        paddingTop: 5, 
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10
    }, 
    
    RemoveFromCartLayout:{
        paddingTop: 4,
        paddingBottom: 4, 
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8
    }, 

    RemoveFromCartOptionText:{
        fontFamily: "Mukta", 
        fontSize: 17, 
        color: "#383838"
    }
    
})