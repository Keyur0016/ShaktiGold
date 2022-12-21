import { StyleSheet} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import {NavigationContainer} from '@react-navigation/native' ; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from './Component/Account/Signup';
import Signin from './Component/Account/Signin';
import Verification from './Component/Account/Verification';
import ForgetPassword from './Component/Account/ForgetPassword'; 
import ForgetVerification from './Component/Account/ForgetVerification'; 
import UpdatePassword from './Component/Account/UpdatePassword'; 

import CreateCategory from './Component/Admin/CreateCategory'; 
import UploadPrice from './Component/Admin/UploadPrice';
import UpdatePrice from './Component/Admin/UpdatePrice' ; 
import UploadProduct from './Component/Admin/UploadProduct' ; 
import AdminOption from './Component/Admin/AdminOption';
import SelectCategory from './Component/Admin/SelectCategory';
import DeleteUpdateProduct from './Component/Admin/DeleteUpdateProduct';
import UpdateProduct from './Component/Admin/UpdateProduct';
import QrCodeScanner from './Component/Admin/QRCodeScanner';
import UpdateAdminPassword from './Component/Admin/UpdateAdminPassword';
import UploadStatus from './Component/Admin/UploadStatus';
import Send_notification from './Component/Admin/Send_notification';

import SplashScreen from './Component/SplashScreen';
import AdminLogin from './Component/AdminLogin';
import UpdateBanner from './Component/UpdateBanner';
import HomeProductList from './Component/HomeProductList';
import PriceInformation from './Component/PriceInformation';
import ParticularProduct from './Component/ParticularProduct';
import WatchListProduct from './Component/WatchListProduct';
import CartItem from './Component/CartItem';
import PaymentOption from './Component/PaymentMethod';
import BillLayout from './Component/BillLayout';
import StatusView from './Component/OtherComponent/StatusView';
import OrderLayout from './Component/OrderLayout';
import CancelOrder from './Component/CancelOrder';
import Update_mobile from './Component/UpdateMobileVerify';
import Update_mobile_verification from './Component/UpdateMobile';

import InsertAddress from './Component/Address/InsertAddress'; 
import UpdateAddress from './Component/Address/UpdateAddress' ; 
import SelectAddress from './Component/Address/SelectAddress' ; 
import Home from './Component/Home';


export default function App({navigation}) {

  NavigationBar.setBackgroundColorAsync("white") ; 

  const Stack = createNativeStackNavigator() ;


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Verification" component={Verification} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Signin' component={Signin} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='ForgetVerification' component={ForgetVerification} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdatePassword' component={UpdatePassword} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='AdminLogin' component={AdminLogin} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdateBanner' component={UpdateBanner} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='CreateCategory' component={CreateCategory} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UploadPrice' component={UploadPrice} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdatePrice' component={UpdatePrice} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UploadProduct' component={UploadProduct} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='AdminOption' component={AdminOption} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='SelectCategory' component={SelectCategory} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='DeleteUpdateProduct' component={DeleteUpdateProduct} options={{headerShown:false}}></Stack.Screen>  
        <Stack.Screen name='UpdateProduct' component={UpdateProduct} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='HomeProductList' component={HomeProductList} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='PriceInformation' component={PriceInformation} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='InsertAddress' component={InsertAddress} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdateAddress' component={UpdateAddress} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='SelectAddress' component={SelectAddress} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='ParticularProduct' component={ParticularProduct} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='WatchListProduct' component={WatchListProduct} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Cart' component={CartItem} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='PaymentOption' component={PaymentOption} options={{headerShown:false, animation:"none"}}></Stack.Screen>
        <Stack.Screen name='BillLayout' component={BillLayout} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='StatusView' component={StatusView} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='OrderLayout' component={OrderLayout} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='QrScanner' component={QrCodeScanner} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='CancelOrder' component={CancelOrder} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdateAdminPassword' component={UpdateAdminPassword} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UploadStatus' component={UploadStatus} options={{headerShown:false}}></Stack.Screen> 
        <Stack.Screen name='SendNotification' component={Send_notification} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdateMobile' component={Update_mobile} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='UpdateMobileVerify' component={Update_mobile_verification} options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
