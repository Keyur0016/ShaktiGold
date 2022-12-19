import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default (Preview = ({item, imageKey, onPress, active, local}) => {
  
  const WindowSize = Dimensions.get('window').width ; 

  return (
    <TouchableOpacity
      style={[styles.ImageContainer, {width:WindowSize}]}
      onPress={() => onPress(item)}>
  
      <View style={[styles.ImagePressableLayout, {width:WindowSize}]}>
  
        <Image
          style={[styles.ProductImage, active ? {} : {height: 320}]}
          source={{uri: item[imageKey]}}
        />
  
      </View>
  
    </TouchableOpacity>
  );

});

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "auto",
    marginRight: "auto"
  },

  ImagePressableLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "auto",
    marginRight: "auto"
  },

  ProductImage: {
    width: '97%',
    height: 320,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  
});