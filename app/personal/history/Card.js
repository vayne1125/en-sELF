import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('screen').width-20;
const height = Dimensions.get('screen').height*1/8;

export default class Card extends PureComponent  {
  render() {
    const trip = this.props.trip;
    return (
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.nameStyle}>
            {trip.name}
          </Text>
        </View>
        <View style={styles.info2}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.onPress1();
            }}
            style={{flex: 2}}>
            <Text style={styles.buttonText}>景點資訊</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity
            onPress={() => {
              this.props.onPress2();
            }}
            style={{flex: 1}}>
            <Text style={styles.buttonText2}>地圖顯示</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer3}>
          <TouchableOpacity
            onPress={() => {
              this.props.onPress3();
            }}
            style={{flex: 2}}>
            <Icon
              name="trash"
              size={24}
              style={styles.TopiconStyle}
            />
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  info2:{ 
    flexDirection: 'row',
    flex:1,
  },
  card: {
    height: height,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 5,
    width:width,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent:'center',
    borderRadius:30,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  textContainer: {
    flex: 1.3,  
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  nameStyle: {
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    letterSpacing: 4,
  },
  buttonContainer: {
    backgroundColor: '#dedede', 
    width:'100%',
    borderRadius: 25,
    flex:1,
    margin:3,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 6,
    top:'15%',
  },
  buttonContainer2: { 
    backgroundColor: '#dedede',  
    borderRadius: 25,
    flex:1,
    margin:3,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  buttonText2: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing:6,
    top:'15%',
  },
  buttonContainer3: {
    backgroundColor: '#badecb', 
    borderRadius: 25,
    flex:1,
    margin:3,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  buttonText3: {
    fontWeight: 'bold',
    color:'#5f695d',
    top:'15%',
    fontSize: 16,  
    letterSpacing: 6,
  },
  TopiconStyle:{
      top:7,
  }
});
