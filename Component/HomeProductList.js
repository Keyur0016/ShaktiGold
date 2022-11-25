import { View, StyleSheet, StatusBar, TextInput, Pressable, 
Text, ScrollView, Image, FlatList, ToastAndroid, Linking, DevSettings } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Font from 'expo-font'; 
import * as colorCode from './Information/ColorCode' ;
import * as URL from './Information/RequestURL'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import BlurViewLayout from "./OtherComponent/BlurViewLayout";

export default function HomeProductList({navigation, route}){
    
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

        const Load_watchlist_product_data = async () => {

            // == Load Watchlist Product id 

            try{

                let Fetch_watchlist_product_url = URL.RequestAPI ; 
                let Fetch_watchlist_product_data = {
                    "Table_name": UserTable,
                    "Check_status": "Fetch_watchlist_product"
                }; 
                let Fetch_watchlist_option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Fetch_watchlist_product_data)
                };
            

                let Fetch_watchlist_request = await fetch(Fetch_watchlist_product_url, Fetch_watchlist_option); 
                let Fetch_watchlist_response = await Fetch_watchlist_request.json() ; 

                if (Fetch_watchlist_response.Status == "Fetch"){
                    
                    set_watchlist_product([...Fetch_watchlist_response.Watchlist]) ;
                    set_cart_product_item_id([...Fetch_watchlist_response.Cart_item]) ;  
                }
            }catch{
                ToastAndroid.show("Failed to load watchlist products", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
            }
        }

        Load_watchlist_product_data() ; 
        
        // == Load Category ProductData 

        const Load_category_data = async () => {

            let Fetch_category_product = URL.RequestAPI ; 
            let Fetch_category_data = {
                "Check_status":"Get_category_product",
                "CategoryId": Category_id
            };
            let Fetch_category_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Fetch_category_data)
            }; 

            let Fetch_category_request = await fetch(Fetch_category_product, Fetch_category_option); 
            let Fetch_category_response = await Fetch_category_request.json() ; 
             
            if (Fetch_category_response.Status == "Fetch"){  
                 
                set_category_product([...Fetch_category_response.Product]); 
            }

        }; 

        Load_category_data() ; 

    }, []);

    // == Product Image Opener 

    const Product_image_opener = (image_url) => {
        Linking.openURL(image_url) ; 
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

    // == Add Product in Watchlist Handler
    const Insert_watchlist = async (Product_id) => {

        Set_loading_layout_handler() ; 

        try{
            let Insert_watchlist_product_url = URL.RequestAPI ; 
            let Insert_watchlist_data = {
                "Check_status": "Insert_watchlist_product",
                "Table_name" : UserTable, 
                "Product_id" : Product_id,
                "Category_id": Category_id
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
            
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }

        Disable_loading_layout_handler() ; 

    }

    // == Remove products from Watchlist Handler
    const Remove_watchlist = async (Product_id) => {

        Set_loading_layout_handler() ; 

        try{

            let Remove_watchlist_url = URL.RequestAPI ;
            let Remove_watchlist_data = {
                "Check_status": "Delete_watchlist_product",
                "Table_name": UserTable,
                "Product_id": Product_id 
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

    // == Add to cart Handler 
    const Add_To_cart_Handler = async (Product_id) => {

        Set_loading_layout_handler() ; 

        try {
            
            let Insert_cart_url = URL.RequestAPI ; 
            let Insert_cart_data = {
                "Check_status":"Insert_cart_item", 
                "Table_name": UserTable, 
                "Product_id": Product_id,
                "Category_id": Category_id
            }; 
            let Insert_cart_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Insert_cart_data)
            }; 

            let Insert_cart_request = await fetch(Insert_cart_url, Insert_cart_option) ; 
            let Insert_cart_response = await Insert_cart_request.json() ; 

            if (Insert_cart_response.Status == "Insert"){
                
                set_cart_product_item_id([...cart_product_item_id, Product_id]) ; 

                Disable_loading_layout_handler() ;

                ToastAndroid.show("Insert product into cart", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 

            }
            else{

                Disable_loading_layout_handler() ; 

            }
        } catch (error) {
            
            Disable_loading_layout_handler(); 

            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
        }

        Disable_loading_layout_handler() ; 
    }
   
    // == Remove from cart Handler 
    const Remove_from_cart_Handler = async (Product_id) => {
          
        Set_loading_layout_handler() ; 

        try {
            
            let Remove_cart_url = URL.RequestAPI;
            let Remove_cart_data = {
                "Check_status":"Delete_cart_item", 
                "Table_name": UserTable, 
                "Product_id": Product_id,
                "Category_id":  Category_id
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
    }

    // == Open Product image Handler 
    const Open_particular_product = (element) => {

        let Watchlist_value = watchlist_product.includes(element.Product_id) ; 
        navigation.navigate("ParticularProduct", {"Product": element, "Tablename":Table_name, "Watchlist_value": Watchlist_value, 
            "Category_id_name": Category_id}) ; 
    }
      
    // == Back Press Handler 
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

                    <Text style={[ProductListStyle.PopularProductTitle, {marginTop:"auto", marginBottom:"auto"}]}>
                        {Category_name}
                    </Text>

                </View>

                {/* == Product list layout == */}

                <View style={ProductListStyle.PopularProductMainLayout}>

                    <ScrollView  showsVerticalScrollIndicator={false}>
                         
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

                                        <Text style={ProductListStyle.ProductInformation}>{element.Product_information}</Text>
                                            
                                        {/* Weight and Size information layout   */}

                                        <View style={ProductListStyle.WeightSizeLayout}>
                                    
                                            {/* Weight information  */}

                                            <View style={ProductListStyle.WeightLayout}>

                                                <Text style={ProductListStyle.WeightSizeTitle}>Weight |</Text>

                                                <Text style={ProductListStyle.WeightSizeInformation}>{element.Product_weight}</Text>
                                            
                                            </View>
                                            
                                            {/* Size information */}

                                            <View style={[ProductListStyle.SizeLayout]}>
                                                
                                                <Text style={ProductListStyle.WeightSizeTitle}>Size |</Text>
                                            
                                                <Text style={ProductListStyle.WeightSizeInformation}>{element.Product_size}</Text>
                                            
                                            </View>

                                        </View>

                                        {/* Price information layout  */}
                                        
                                        <View style={ProductListStyle.PriceInformationLayout}>
                                            
                                            <Text style={[ProductListStyle.WeightLayout, 
                                                {marginRight: 0, 
                                                fontFamily: "Mukta",
                                                fontSize: 18}]}>Price</Text>
                                           
                                            {/* Retail Price  */}

                                            <Text style={ProductListStyle.RetailPrice}>₹{element.Product_retail_price}</Text>
                                            
                                            {/* Discount Price  */}

                                            <Text style={ProductListStyle.DiscountPrice}>₹{element.Product_discount_price}</Text>    
                                        
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

                                            <Text style={{fontFamily:"Ubuntu", fontSize: 16, marginLeft:"auto", 
                                                backgroundColor:"#f3f1f1", paddingTop: 8, paddingBottom:8, paddingLeft:8, paddingRight:8,
                                                borderRadius:8}}>
                                                916
                                            </Text>

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
        marginLeft: 15
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