import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

const ResultTop = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
        navigation.goBack();}}
        style={{flex:1,}}>
        <View style={styles.iconContainer2}>
          <Icons
            name="chevron-back-circle-outline"
            size={33}
            color={'#5f695d'}
            style={styles.iconStyle2}
          />
        </View>
        </TouchableOpacity>
        <View style={{flex:5,}}>
        <Text style={styles.textStyle}>時程表</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  textStyle: {
    bottom:'15%',
    fontSize: 26,
    color:'#5f695d',
    fontFamily:'NotoSerifTC-Bold',
    letterSpacing:10,
  },
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    top: 5,
    left: 8,
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
    top: 6,
    backgroundColor: '#D1DED7',
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 30,
  },
  iconContainer2:{
    position: 'absolute',
    left: 11,
    top: 14,
    width: 50,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
  },
  iconStyle2: {
    left: 8,
  },
});

export default ResultTop;