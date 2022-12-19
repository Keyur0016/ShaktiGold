import { View, StatusBar, StyleSheet, Pressable, Image, Text, 
    ScrollView, ToastAndroid, Linking } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from './Information/ColorCode'; 
import * as URL from './Information/RequestURL' ; 
import BlurViewLayout from "./OtherComponent/BlurViewLayout";
import {WebView} from 'react-native-webview' ; 
import LoadData from './OtherComponent/LoadingData' ; 

export default function WatchListProduct({navigation, route}){
    
    // --- User Table name --- // 

    const {Table_name} = route.params ; 
    
    // --- Watch list product information --- //  
    const [watchlist_product, set_watchlist_product] = useState([]) ; 
    const [watchlist_product_all_data, set_watchlist_product_all_data] = useState([]) ; 
    
    // == Cart Product Product id 
    const [cart_product_item_id, set_cart_product_item_id] = useState([]);

    // == Loading Layout value 
    const [loading_layout, set_loading_layout] = useState(false); 

    // == Disable Navigation bar color
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

    // === Load font === // 
    const [loadFontValue, setLoadFontValue] = useState(false);


    // ***** Start Load Watchlist and Cart Product id ***** // 

    const [webview_layout, set_webview_layout] = useState(true) ; 
    const [web_view_url, set_web_view_url] = useState('') ;
    const [webview_value, set_webview_value] = useState(0) ;
    
    const Load_product_list = (event) => {
        let Temp_data = event.nativeEvent.data ;
        set_webview_layout(true) ;

        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Fetch"){
                set_watchlist_product([...Temp_data.Watchlist]) ;
                set_cart_product_item_id([...Temp_data.Cart_item]) ;  
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Stop load Watchlist and Cart Product id **** // 


    // **** Start load watchlist product data request **** // 

    const [watchlist_product_layout, set_watchlist_product_layout] = useState(true) ; 
    const [watchlist_product_view_url, set_watchlist_product_view_url] = useState('') ; 
    const [watchlist_product_view_value, set_watchlist_product_view_value] = useState(0) ; 
    const [operation_product_id, set_operation_product_id] = useState('') ; 
    const [load_watchlist_product_layout, set_load_watchlist_product_layout] = useState(true) ; 

    const Load_watchlist_product_data_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_watchlist_product_layout(true) ; 
        set_load_watchlist_product_layout(false) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ;

            if (Temp_data.Status == "Fetch"){
                set_watchlist_product_all_data([...Temp_data.Data]) ; 
            }

        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }
    }

    // **** Close load watchlist product data request **** // 



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

        // --- load watchlist and cart product id request --- // 

        const Load_watchlist_product_id = async () => {
            try{

                let Fetch_watchlist_product_data = {
                    "Table_name": Table_name,
                    "Check_status": "Fetch_watchlist_product"
                };
                
                // Set URL to webview 
                set_web_view_url("") ;
                set_webview_layout(false) ; 
                set_webview_value(webview_value + 1) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Fetch_watchlist_product_data) ; 

                set_web_view_url(web_url) ; 

                
            }catch{
                 
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }
        }
       
        // --- Load watchlist product data request --- // 

        const Load_watchlist_productData = async () => {
            
            try{

                let WatchList_product_data = {
                    "Table_name": Table_name,
                    "Check_status": "Fetch_watchlist_product_data"
                } ; 

                // Set URL to webview 
                set_watchlist_product_view_url("") ;
                set_watchlist_product_layout(false) ; 
                set_watchlist_product_view_value(watchlist_product_view_value + 1) ; 
                set_load_watchlist_product_layout(true) ; 

                let web_url = URL.RequestAPI + "?data=" + JSON.stringify(WatchList_product_data) ; 

                set_watchlist_product_view_url(web_url) ; 

                

            }catch{
               
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }


        setTimeout(() => {
            Load_watchlist_product_id() ; 
            Load_watchlist_productData() ;
        }, 500);

    }, [])

     
    // ****** Start Add to watchlist Request Handler ****** // 

    const [add_watchlist_layout, set_add_watchlist_layout] = useState(true);
    const [add_watchlist_view_url, set_add_watchlist_view_url] = useState('') ; 
    const [add_watchlist_view_value, set_add_watchlist_view_value] = useState(0); 

    const Add_to_watchlist_handling = (event) => {

        let Temp_data = event.nativeEvent.data ; 
        set_add_watchlist_layout(true) ; 
        
        try{

            Temp_data = JSON.parse(Temp_data) ; 

            if (Temp_data.Status == "Insert"){
        
                Disable_loading_layout_handler(); 
    
                ToastAndroid.show("Insert product in watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT ); 
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

    const Insert_watchlist = async (element) => {

        Set_loading_layout_handler() ; 

        try{
            let Insert_watchlist_data = {
                "Check_status": "Insert_watchlist_product",
                "Table_name" : Table_name, 
                "Product_id" : element.Product_id,
                "Category_id": element.Category_id
            }; 

            // Set URL to webview 
            set_add_watchlist_view_url("") ;
            set_add_watchlist_layout(false) ; 
            set_add_watchlist_view_value(add_watchlist_view_value + 1) ; 
            set_operation_product_id(element.Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_watchlist_data) ; 

            set_add_watchlist_view_url(web_url) ; 
            
            
        }catch{
            
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }


    }
   
    // ****** Stop Add to watchlist Request Handler ****** // 
    

    // ****** Start Remove product from watchlist Request Handler ******* // 
    
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
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }


    }

    const Remove_watchlist = async (element) => {

        Set_loading_layout_handler() ; 

        try{

            let Remove_watchlist_data = {
                "Check_status": "Delete_watchlist_product",
                "Table_name": Table_name,
                "Product_id": element.Product_id 
            };

            // Set URL to webview 
            set_remove_watchlist_view_url("") ;
            set_remove_watchlist_layout(false) ; 
            set_remove_watchlist_view_value(remove_watchlist_view_value + 1) ; 
            set_operation_product_id(element.Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Remove_watchlist_data) ; 
            set_remove_watchlist_view_url(web_url) ;
            
            
        }catch{

            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

    }

    // ****** Close Remove product from watchlist Request Handler ******* // 


    // ***** Start Add to cart request Handler ***** // 

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

                ToastAndroid.show("Insert product into cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }
            else{

                Disable_loading_layout_handler() ; 

            }
            
        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

        }

        Disable_loading_layout_handler() ; 
    }

    const Insert_into_cart = async (element) => {

        Set_loading_layout_handler(); 

        try {
            
            let Insert_cart_data = {
                "Check_status":"Insert_cart_item", 
                "Table_name": Table_name, 
                "Product_id": element.Product_id,
                "Category_id": element.Category_id
            }; 

            // Set URL to webview 
            set_add_cart_view_url("") ;
            set_add_cart_layout(false) ; 
            set_add_cart_view_value(add_cart_view_value + 1) ; 
            set_operation_product_id(element.Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Insert_cart_data) ; 

            set_add_cart_view_url(web_url) ;

            
        } catch{
            
            Disable_loading_layout_handler() ; 

            ToastAndroid.show('Network request failed', ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

    }

    // ***** Stop Add to cart Request Handler ****** // 


    // ***** Stop Remove from cart Request Handler ***** //

    const [remove_cart_layout, set_remove_cart_layout] = useState(true) ; 
    const [remove_cart_view_url, set_remove_cart_view_url] = useState('') ; 
    const [remove_cart_view_value, set_remove_cart_view_value] = useState(0) ; 
    
    const Remove_to_cart_handling = (event) => {
        let Temp_data = event.nativeEvent.data ; 
        set_remove_cart_layout(true) ; 

        try{

            Temp_data = JSON.parse(Temp_data) ; 

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
    
    const Remove_into_cart = async (element) => {

        Set_loading_layout_handler() ; 

        try {
            
            let Remove_cart_data = {
                "Check_status":"Delete_cart_item", 
                "Table_name": Table_name, 
                "Product_id": element.Product_id,
                "Category_id":  element.Category_id
            };  

            // Set URL to webview 
            set_remove_cart_view_url("") ;
            set_remove_cart_layout(false) ; 
            set_remove_cart_view_value(remove_cart_view_value + 1) ; 
            set_operation_product_id(element.Product_id) ; 

            let web_url = URL.RequestAPI + "?data=" + JSON.stringify(Remove_cart_data) ; 

            set_remove_cart_view_url(web_url) ;

            

        } catch (error) {
            
            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
        }


    }
    
    // ***** Close Remove from cart Request Handler ***** // 


    const Set_loading_layout_handler = () => {

        set_loading_layout(true) ; 
        set_navigation_bar_color(colorCode.HomeScreenColor.LoadingNavigationBarColor) ;
    }


    const Disable_loading_layout_handler = () => {

        set_loading_layout(false); 
        set_navigation_bar_color(colorCode.SignupColorCode.ButtonColor) ; 
    }

    // == Open Product Image Handler 

    const Open_product_image = (product_url) => {

        Linking.openURL(product_url)
    }

    // == Back handler

    const Back_Handler = () => {
        navigation.goBack() ; 
    }

    // === layout === // 

    if (loadFontValue){
        return(
            <View style={WatchListScreenStyle.WatchListProductScreen}>
                 
                {loading_layout?<>
                   <BlurViewLayout/>
                </>:<></>}

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

                {!watchlist_product_layout?<>
                    <View
                        style={{
                            height: "0%", 
                            width: "0%", 
                            opacity: 0.90
                        }}>
                            <WebView
                            key = {watchlist_product_view_value}
                            source={{uri:watchlist_product_view_url}}
                            onMessage={Load_watchlist_product_data_handling}
                            ></WebView>
                    </View>
                </>:<></>}

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

                <StatusBar
                    backgroundColor={navigation_bar_color}
                />
                
                {/* == Back Option layout ==  */}
                <View style={WatchListScreenStyle.BackImageContainer}>
                
                    <Pressable style={[WatchListScreenStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress={Back_Handler}
                        >
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={WatchListScreenStyle.BackImage}
                        />
                    
                        <Text style={WatchListScreenStyle.BackText}>Watchlist Product</Text>
                    
                    </Pressable>
                
                </View>
                
                {/* == ProductList Layout ==  */}

                {load_watchlist_product_layout?<>
                    <LoadData/>
                </>:<>
                    <View style={WatchListScreenStyle.PopularProductMainLayout}>

                        <ScrollView  showsVerticalScrollIndicator={false}>

                            {watchlist_product_all_data.length > 0 ?<>

                                {watchlist_product_all_data.map((element, index) => {

                                    return(
                                        <View style={[WatchListScreenStyle.PopularProductLayout]} 
                                            key={index}>

                                            <Pressable style={WatchListScreenStyle.PopularProductPressableLayout}
                                                android_ripple={{color:colorCode.HomeScreenColor.ProductLayoutRippler}}
                                                >

                                                {/* Product image */}

                                                <Pressable style={WatchListScreenStyle.ImagePressableOption}
                                                    onPress={() => Open_product_image(element.Product_image1)}>

                                                    <Image
                                                        source={{uri:element.Product_image1}}
                                                        style = {WatchListScreenStyle.PopularProductImage}
                                                    />

                                                </Pressable>    

                                                <View style={WatchListScreenStyle.ProductInfoData}>

                                                    {/* Product information  */}
                                                    <Text style={WatchListScreenStyle.ProductInformation}>{element.Product_information}</Text>
                                                    
                                                    {/* Weight and Size information layout   */}

                                                    <View style={WatchListScreenStyle.WeightSizeLayout}>
                                                
                                                        {/* Weight information  */}

                                                        <View style={WatchListScreenStyle.WeightLayout}>

                                                            <Text style={WatchListScreenStyle.WeightSizeTitle}>Weight |</Text>

                                                            <Text style={WatchListScreenStyle.WeightSizeInformation}>{element.Product_weight}</Text>
                                                        
                                                        </View>
                                                        
                                                        {/* Size information */}

                                                        <View style={[WatchListScreenStyle.SizeLayout]}>
                                                            
                                                            <Text style={WatchListScreenStyle.WeightSizeTitle}>Size |</Text>
                                                        
                                                            <Text style={WatchListScreenStyle.WeightSizeInformation}>{element.Product_size}</Text>
                                                        
                                                        </View>

                                                    </View>

                                                    {/* Price information layout  */}
                                                    
                                                    <View style={WatchListScreenStyle.PriceInformationLayout}>
                                                        
                                                        <Text style={[WatchListScreenStyle.WeightLayout, 
                                                            {marginRight: 0, 
                                                            fontFamily: "Mukta",
                                                            fontSize: 18}]}>Price</Text>

                                                        <Text style={WatchListScreenStyle.RetailPrice}>₹{element.Product_retail_price}</Text>
                                                        
                                                        <Text style={WatchListScreenStyle.DiscountPrice} numberOfLines={1}>₹{element.Product_discount_price}</Text>    
                                                    
                                                    </View>

                                                    {/* Share Option layout  */}

                                                    <View style={WatchListScreenStyle.ShareTypeOption}>

                                                        {/* Add to cart option  */}

                                                        {cart_product_item_id.includes(element.Product_id)?<>
                                                            <Pressable style={[WatchListScreenStyle.OptionPressableLayout, {backgroundColor:"transparent"}]}
                                                                android_ripple={{color: "#ffa3a3"}}
                                                                onPress = {() => Remove_into_cart(element)}>
                                                                
                                                                <Image
                                                                    source={require('../assets/Image/Delete.png')}
                                                                    style={WatchListScreenStyle.OptionImage}
                                                                />
                                                            
                                                            </Pressable>

                                                        </>:<>
                                                            <Pressable style={WatchListScreenStyle.OptionPressableLayout}
                                                                android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                                onPress={() => Insert_into_cart(element)}>

                                                                <Image
                                                                    source={require('../assets/Image/Cart_add.png')}
                                                                    style={WatchListScreenStyle.OptionImage}
                                                                />
                                                            
                                                            </Pressable>
                                                        </>}
                                                        
                                                        {watchlist_product.includes(element.Product_id) ?
                                                            <>
                                                            {/* Watchlist option  */}

                                                            <Pressable style={[WatchListScreenStyle.OptionPressableLayout, {backgroundColor:'transparent'}]}
                                                                android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                                onPress={() => Remove_watchlist(element)}>

                                                                <Image
                                                                    source={require('../assets/Image/Save_watchlist.png')}
                                                                    style={WatchListScreenStyle.OptionImage}
                                                                />
                                                
                                                            </Pressable>
                                                            </>
                                                            :<>
                                                                {/* Watchlist option  */}

                                                                <Pressable style={[WatchListScreenStyle.OptionPressableLayout, {backgroundColor:"transparent"}]}
                                                                    android_ripple={{color:colorCode.HomeScreenColor.PriceLayoutColor}}
                                                                    onPress={() => Insert_watchlist(element)}>

                                                                    <Image
                                                                        source={require('../assets/Image/Watchlist.png')}
                                                                        style={WatchListScreenStyle.OptionImage}
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

                                <Text style={{fontFamily:"Ubuntu", fontSize:19, width:"100%", 
                                marginLeft:"auto", marginRight:"auto", marginTop:20, textAlign:"center"}}>Not available any Product</Text>
                            </> }
                            
                            
                            
                        </ScrollView>

                    </View> 
                </>}


            </View>
        )
    }

}

const WatchListScreenStyle = StyleSheet.create({
    WatchListProductScreen: {
        backgroundColor: "#ececec", 
        height: '100%',
        width: '100%'
    },

    BackImageContainer:{
        display: "flex",
        flexDirection: 'row',
        backgroundColor: colorCode.SignupColorCode.ButtonColor, 
        paddingTop: 12, 
        paddingBottom: 12, 
        paddingLeft:8
    }, 

    BackImage:{
        height: 25,
        width: 25, 
        marginTop: "auto",
        marginBottom: "auto", 
        marginLeft: 5
    }, 

    BackText:{
        fontFamily: 'Ubuntu',
        fontSize: 18,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 10,
        color: colorCode.HomeScreenColor.HomeScreenTitle
    }, 

    PopularProductMainLayout:{
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        height: '91%'
    }, 
    
    PopularProductLayout:{
        borderRadius: 10,
        elevation: 8,
        shadowColor:"#939393",
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
    
    ImagePressableOption:{
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
        marginLeft: "auto",
        marginRight: "auto",
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
        marginTop: 10
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
        backgroundColor: "hsl(0, 100%, 91%)", 
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