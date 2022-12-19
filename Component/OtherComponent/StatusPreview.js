import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

export default (Preview = ({item, imageKey, onPress, active, local}) => {
  
  const WindowSize = Dimensions.get('window').width ; 
  const WindowHeight = parseInt((Dimensions.get('window').height) - 100) ; 

  return (
    <TouchableOpacity
      style={[styles.ImageContainer, {width:WindowSize}]}
      onPress={() => onPress(item)}>
  
      <View style={[styles.ImagePressableLayout, {width:WindowSize}]}>
  
        <Image
          style={[styles.ProductImage, {height: WindowHeight} , active ? {} : {height: WindowHeight}]}
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
    width: '96%',
    borderRadius: 8,
    resizeMode: 'contain',
  },
  
});