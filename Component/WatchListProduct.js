import { View, StatusBar, StyleSheet, Pressable, Image, Text, 
    ScrollView, ToastAndroid, Linking } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font' ; 
import * as colorCode from './Information/ColorCode'; 
import * as URL from './Information/RequestURL' ; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WatchListProduct({navigation, route}){
    
    // == User Table name 
    const Table_name = "ctldsfbzmyrnxoh" ; 
    
    // == WatchList Product 
    const [watchlist_product, set_watchlist_product] = useState([]) ; 
    const [watchlist_product_all_data, set_watchlist_product_all_data] = useState([]) ; 
    
    // == Cart Product Product id 
    const [cart_product_item_id, set_cart_product_item_id] = useState([]);

    // == Loading Layout value 
    const [loading_layout, set_loading_layout] = useState(false); 

    // == Disable Navigation bar color
    const [navigation_bar_color, set_navigation_bar_color] = useState(colorCode.SignupColorCode.ButtonColor) ; 

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
        }; 
    
        loadFont() ; 

        const Load_watchlist_productData = async () => {
            
            try{

                // == Set Watchlist Product id in useState 
    
                var Watchlist_data = await AsyncStorage.getItem("Watchlist_product");
                Watchlist_data = JSON.parse(Watchlist_data) ; 
                set_watchlist_product([...Watchlist_data.Data]) ; 
    
                // == Set Cart item Product id in useState 
    
                var Cart_Product_data = await AsyncStorage.getItem("Cart_product") ; 
                Cart_Product_data = JSON.parse(Cart_Product_data) ; 
                set_cart_product_item_id([...Cart_Product_data.Data]); 

                let WatchList_product_url = URL.RequestAPI ; 
                let WatchList_product_data = {
                    "Table_name": Table_name,
                    "Check_status": "Fetch_watchlist_product_data"
                } ; 
                let Watchlist_product_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(WatchList_product_data)
                }; 
    
                let Watchlist_product_request = await fetch(WatchList_product_url, Watchlist_product_option) ; 
                let Watchlist_product_response = await Watchlist_product_request.json() ; 
                  
                if (Watchlist_product_response.Status == "Fetch"){
                   set_watchlist_product_all_data([...Watchlist_product_response.Data]) ; 
                }

            }catch{
               
                ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }

        }

        Load_watchlist_productData() ; 
    }, [])

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

    // == Insert Product into cart Handler 

    const Insert_into_cart = async (element) => {

        Set_loading_layout_handler(); 

        try {
            
            let Insert_cart_url = URL.RequestAPI ; 
            let Insert_cart_data = {
                "Check_status":"Insert_cart_item", 
                "Table_name": Table_name, 
                "Product_id": element.Product_id,
                "Category_id": element.Category_id
            }; 
            let Insert_cart_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Insert_cart_data)
            }; 

            let Insert_cart_request = await fetch(Insert_cart_url, Insert_cart_option); 
            let Insert_cart_response = await Insert_cart_request.json() ; 

            if (Insert_cart_response.Status == "Insert"){

                Disable_loading_layout_handler() ; 

                cart_product_item_id([...cart_product_item_id, element.Product_id])

                ToastAndroid.show("Insert Product into cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
            }
            else{

                Disable_loading_layout_handler() ; 
            }
        } catch{
            
            Disable_loading_layout_handler() ; 
            ToastAndroid.show('Network request failed', ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 
    }

    // == Remove Product from cart Handler 

    const Remove_into_cart = async (element) => {

        Set_loading_layout_handler() ; 

        try {
            
            let Remove_cart_url = URL.RequestAPI;
            let Remove_cart_data = {
                "Check_status":"Delete_cart_item", 
                "Table_name": Table_name, 
                "Product_id": element.Product_id,
                "Category_id":  element.Category_id
            };  
            let Remove_cart_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Remove_cart_data)
            }; 

            let Remove_cart_request = await fetch(Remove_cart_url, Remove_cart_option); 
            let Remove_cart_response = await Remove_cart_request.json() ; 

            if (Remove_cart_response.Status == "Delete"){

                Disable_loading_layout_handler() ; 

                for(let i = 0 ; i<cart_product_item_id.length; i++){
                    if (cart_product_item_id[i] == Product_id){
                        cart_product_item_id.splice(i, 1) ;
                    }
                }

                set_cart_product_item_id([...cart_product_item_id]) ; 

                ToastAndroid.show("Delete from cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ;

            }else{

                Disable_loading_layout_handler() ; 
            }

        } catch (error) {
            
            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
        }

        Disable_loading_layout_handler() ; 

    }

    // == Insert Product into watchlist Handler 
    
    const Insert_watchlist = async (element) => {

        Set_loading_layout_handler() ; 

        try{
            let Insert_watchlist_product_url = URL.RequestAPI ; 
            let Insert_watchlist_data = {
                "Check_status": "Insert_watchlist_product",
                "Table_name" : Table_name, 
                "Product_id" : element.Product_id,
                "Category_id": element.Category_id
            }; 
            let Insert_watchlist_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Insert_watchlist_data)
            }; 
    
            let Insert_watchlist_request = await fetch(Insert_watchlist_product_url, Insert_watchlist_option); 
            let Insert_watchlist_response = await Insert_watchlist_request.json(); 
            
            if (Insert_watchlist_response.Status == "Insert"){
    
                Disable_loading_layout_handler(); 

                ToastAndroid.show("Insert product in watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT ); 
                set_watchlist_product([...watchlist_product,Product_id]); 

                // == Update in Local Storage 
                await AsyncStorage.setItem("Watchlist_product" , JSON.stringify({"Data": [...watchlist_product]})) ; 
            }
            else{
                
                Disable_loading_layout_handler() ; 
            }
        }catch{
            
            Disable_loading_layout_handler() ; 
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

        Disable_loading_layout_handler() ; 

    }

    // == Remove Product into watchlist Handler
     
    const Remove_watchlist = async (element) => {
        console.warn(element.Product_id);

        Set_loading_layout_handler() ; 

        try{

            let Remove_watchlist_url = URL.RequestAPI ;
            let Remove_watchlist_data = {
                "Check_status": "Delete_watchlist_product",
                "Table_name": Table_name,
                "Product_id": element.Product_id 
            };
            let Remove_watchlist_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Remove_watchlist_data)
            }

            let Remove_watchlist_request = await fetch(Remove_watchlist_url, Remove_watchlist_option);
            let Remove_watchlist_response = await Remove_watchlist_request.json(); 
            
            if (Remove_watchlist_response.Status == "Delete"){

                Disable_loading_layout_handler() ; 

                ToastAndroid.show("Delete product from watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 

                for(let i = 0; i<watchlist_product.length; i++){
                    if (watchlist_product[i] == Product_id){
                        watchlist_product.splice(i, 1); 
                    }
                }
                set_watchlist_product([...watchlist_product]); 

                // == Update in Local Storage 
                await AsyncStorage.setItem("Watchlist_product" , JSON.stringify({"Data": [...watchlist_product]})) ; 
            }
            else{

                Disable_loading_layout_handler() ; 
            }
        }catch{

            Disable_loading_layout_handler() ; 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

        Disable_loading_layout_handler() ; 
    }

    // == Open Product Image Handler 

    const Open_product_image = (product_url) => {
        Linking.openURL(product_url)
    }

    if (loadFontValue){
        return(
            <View style={WatchListScreenStyle.WatchListProductScreen}>
                 
                <StatusBar
                    backgroundColor={navigation_bar_color}
                />
                
                {/* == Back Option layout ==  */}
                <View style={WatchListScreenStyle.BackImageContainer}>
                
                    <Pressable style={[WatchListScreenStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        >
                    
                        <Image
                            source={require('../assets/arrow.png')}
                            style={WatchListScreenStyle.BackImage}
                        />
                    
                        <Text style={WatchListScreenStyle.BackText}>Watchlist Product</Text>
                    
                    </Pressable>
                
                </View>
                
                {/* == ProductList Layout ==  */}

                <View style={WatchListScreenStyle.PopularProductMainLayout}>

                    <ScrollView  showsVerticalScrollIndicator={false}>
                         
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
                                                
                                                <Text style={WatchListScreenStyle.DiscountPrice}>₹{element.Product_discount_price}</Text>    
                                            
                                            </View>

                                            {/* Share Option layout  */}

                                            <View style={WatchListScreenStyle.ShareTypeOption}>

                                                {/* Add to cart option  */}

                                                {cart_product_item_id.includes(element.Product_id)?<>
                                                    <Pressable style={WatchListScreenStyle.RemoveFromCartLayout}
                                                        android_ripple={{color: "#ffa3a3"}}
                                                        onPress = {() => Remove_into_cart(element)}>

                                                        <Text style={WatchListScreenStyle.RemoveFromCartOptionText}>Remove from cart</Text>
                                                    
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
                        
                        
                    </ScrollView>

                </View> 

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
        paddingBottom: 12
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