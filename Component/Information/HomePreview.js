import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

export default (HomePreview = ({item, imageKey, onPress, active, local}) => {
  
  const WindowSize = Dimensions.get('window').width ; 

  return (
    <TouchableOpacity
      style={[styles.ImageContainer, {width:WindowSize}]}
      onPress={() => onPress(item)}>
  
      <View style={[styles.ImagePressableLayout, {width:WindowSize}]}>
  
        <Image
          style={[styles.ProductImage, active ? {} : {height: 215}]}
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
    height: 215,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  
});