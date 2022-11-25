import { View, StyleSheet, Text, StatusBar, Image, Dimensions, Pressable, Linking, Share, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
import * as URL from './Information/RequestURL'; 
import * as colorCode from './Information/ColorCode' ; 
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from './OtherComponent/PreView'; 

export default function ParticularProduct({navigation, route}){

    // Product data division Height
    const ProductDataHeight = (Dimensions.get('window').height) - 500; 
    const [Product_information, set_Product_information] = useState('') ;
    const [Product_weight, set_Product_weight] = useState('') ;
    const [Product_size, set_Product_size] = useState('') ; 
    const [Product_discount_price, set_Product_discount_price] = useState(''); 
    const [Product_retail_price, set_Product_retail_price] = useState('') ; 
    const [Table_name, set_Table_name] = useState(''); 
    const [watchlist_value, set_watchlist_value] = useState(false); 
    const [category_id, set_category_id] = useState('') ; 

    // Require attributes 
    const [ProductImageList, set_ProductImageList] = useState([]); 

    // Check font loaded or not
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

        const Set_other_product_data = () => {

            set_Product_information(route.params.Product.Product_information) ; 
            set_Product_weight(route.params.Product.Product_weight) ; 
            set_Product_size(route.params.Product.Product_size) ; 
            set_Product_discount_price(route.params.Product.Product_discount_price) ; 
            set_Product_retail_price(route.params.Product.Product_retail_price) ; 
            set_Table_name(route.params.Tablename);
            set_watchlist_value(route.params.Watchlist_value)
            set_category_id(route.params.Category_id_name) ; 

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

    const Image_Opener = (image_url) => {
        Linking.openURL(image_url.image)
    }
    
    const Share_option = async () => {
         
        let Share_text = "Shree Shakti gold | " + Product_information + " | Weight = " + Product_weight + " | Size = " + Product_size + " | Price =  " + Product_retail_price + " | " + ProductImageList[0].image ; 

        let Share_result = await Share.share({
            message: Share_text , 
            url: ProductImageList[0].image 
        }); 

    }
    
    const Add_to_watchlist = async () => {
        try{

            let Insert_watchlist_url = URL.RequestAPI ; 
            let Insert_watchlist_data = {
                "Check_status": "Insert_watchlist_product",
                "Table_name" : Table_name, 
                "Product_id" : route.params.Product.Product_id,
                "Category_id": category_id
            }; 
            let Insert_watchlist_option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Insert_watchlist_data)
            }; 

            let Insert_watchlist_request = await fetch(Insert_watchlist_url, Insert_watchlist_option); 
            let Insert_watchlist_response = await Insert_watchlist_request.json() ; 

            if (Insert_watchlist_response.Status == "Insert"){
                ToastAndroid.show("Insert product in watchlist", ToastAndroid.BOTTOM, ToastAndroid.SHORT) ; 
                set_watchlist_value(true) ; 
            }


        }catch{
            ToastAndroid.show("Network request failed", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
        }
    }

    const Remove_to_watchlist = async () => {
        
    }

    const Back_Handler = () => {
        navigation.navigate("HomeProductList") ; 
    }

    if (loadFontValue){
        return(
            <View style={ParticularProductStyle.ParticularProductScreen}>

                <StatusBar
                    backgroundColor={colorCode.SignupColorCode.ButtonColor}
                />

                {/* Back Image container */}

                <View style={ParticularProductStyle.BackImageContainer}>

                    <Pressable style={[ParticularProductStyle.BackImageContainer, 
                        {paddingLeft: 0 , paddingTop: 0 ,paddingBottom: 0  }]}
                        onPress = {Back_Handler}>

                        <Image
                            source={require('../assets/arrow.png')}
                            style={ParticularProductStyle.BackImage}
                        />

                        <Text style={ParticularProductStyle.BackText}>Back</Text>

                    </Pressable>
                   
                </View>

                <View style={ParticularProductStyle.ProductLayout}>

                    <View style={ParticularProductStyle.DownloadOption}>

                        <Pressable>
                            <Image
                                source={require('../assets/Image/Download.png')}
                                style={{height: 32, width: 32, backgroundColor: 'transparent'}}
                            />
                        </Pressable>

                    </View>
                     
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

                        <Text style={ParticularProductStyle.ProductInformation}>
                            {Product_information}
                        </Text>
                     
                        {/* Weight and Size information layout   */}

                        <View style={ParticularProductStyle.WeightSizeLayout}>
                                        
                            {/* Weight information  */}

                            <View style={ParticularProductStyle.WeightLayout}>

                                <Text style={ParticularProductStyle.WeightSizeTitle}>Weight |</Text>

                                <Text style={ParticularProductStyle.WeightSizeInformation}>{Product_weight}</Text>
                             
                            </View>
                             
                            {/* Size information */}

                            <View style={[ParticularProductStyle.SizeLayout]}>
                                
                                <Text style={ParticularProductStyle.WeightSizeTitle}>Size |</Text>
                             
                                <Text style={ParticularProductStyle.WeightSizeInformation}>{Product_size}</Text>
                             
                            </View>

                        </View>
                      
                        {/* Price information layout  */}

                        <View style={ParticularProductStyle.PriceInformationLayout}>
                                                
                            <Text style={[ParticularProductStyle.WeightLayout, 
                                {marginRight: 0, 
                                fontFamily: "Mukta",
                                fontSize: 18}]}>Price</Text>

                            <Text style={ParticularProductStyle.RetailPrice}>₹{Product_discount_price}</Text>
                             
                            <Text style={ParticularProductStyle.DiscountPrice}>₹{Product_retail_price}</Text>    
                                            
                        </View>

                        {/* All option layout */}

                        <View style={ParticularProductStyle.AllOptionLayout}>

                            {/* Add to watchlist option  */}

                            {watchlist_value?
                               <>
                                    <Pressable style={[ParticularProductStyle.OptionImageLayout, {backgroundColor: 'transparent', 
                                        height: 35, width: 35}]}>
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
                                    onPress={() => Share_option()}>

                                <Image
                                    source={require('../assets/Image/Share.png')}
                                    style = {ParticularProductStyle.OptionImage}
                                />

                                <Text style={{fontFamily: "Mukta", 
                                    fontSize: 18, 
                                    color: 'white', 
                                    marginTop: "auto", 
                                    marginBottom: "auto", 
                                    marginLeft: 10}}>
                                    Share
                                </Text>

                            </Pressable>

                            

                        </View>

                        {/* Add to cart and buy now option  */}

                        <View style={ParticularProductStyle.AddToCartBuyNow}>

                            <Pressable  style={[ParticularProductStyle.AddToCartOptionLayout, 
                                {borderBottomLeftRadius: 5}]}>
                                <Text  style={ParticularProductStyle.AddToCartOptionText}>Add to cart</Text>
                            </Pressable>

                            <Pressable style={[ParticularProductStyle.AddToCartOptionLayout,
                                {borderBottomRightRadius: 5, 
                                borderLeftWidth: 1,
                                borderLeftColor: "#686868"}]}>
                                <Text style={ParticularProductStyle.AddToCartOptionText}>Buy now</Text>
                            </Pressable>


                        </View>

                    </View>

 
                </View>

            </View>
        )
    }
}

const ParticularProductStyle = new StyleSheet.create({
    ParticularProductScreen:{
        backgroundColor: '#ebebeb', 
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
        backgroundColor: "#ebebeb"
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
        width:'50%', 
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