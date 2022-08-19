import React, {Component} from 'react';
import  { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';//照片icon
import Icon3 from 'react-native-vector-icons/MaterialIcons';//行李箱icon
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import PostTop from './PostTop'
//import PostButton from './PostButton'

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

const Post = ({navigation, route}) => {
    const userdata = route.params;

    const [image, setImage] = useState(null);
    const [data, setdata] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);


    
    const showok =()=>{Alert.alert('已加入清單')  
    }
    const selectImage = () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          mediaType: "photo", 
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
          console.log('Response = ', response);
           const source = { uri: response.assets[0].uri};//response是選取的物件
           //Asset Object是內容物，然後他很坑紙船一個也會變陣列qq，所以要拿第一個人的uri
           console.log('Response uri = ', response.assets[0].uri);
           console.log(source);
          setImage(source);
        
        });
      };

    return (
      
      <View style={styles.container}>
        <View style={styles.topbar}>
          <PostTop userdata={userdata}/>
        </View>
        <View style={styles.userpost}>
          <View style={styles.iconContainer}>
            <Icons name={'person-circle-outline'} size={45} />
          </View>
            <Text style={styles.nameStyle}>{userdata.name}</Text>
        </View>
        <View style={styles.contentContainer}> 
            {image != null ? <Image source={{uri: image.uri}} style={{  height: 300}} /> : null}
              <TextInput style={styles.contentText} 
              placeholder="在想些什麼呢?" />
        </View>
        
        {/*下方bar*/}
        <View style={styles.buttonbar}>
            <View style = {styles.butContainer}>
            {/*圖片*/}
            <View style={styles.buticonContainer1}>
              <TouchableOpacity
                onPress={ selectImage}
                style={{flex: 1}}>
                <Icon2
                    name="picture"
                    size={40}
                      color={'#5f695d'}
                      style={styles.iconStyle}
                  />
              </TouchableOpacity></View>

              <View style={styles.buticonContainer2}>
              {/*旅遊行程表*/}
              <TouchableOpacity
                /*onPress={() => {
                  navigation.goBack();
                }}*/
                style={{flex: 1}}>
                <Icon3
                    name="luggage"
                    size={40}
                      color={'#5f695d'}
                      style={styles.iconStyle}
                  />
              </TouchableOpacity></View>
              </View>
        </View>   
      </View>
    );
}

//button一定要有title
const styles = StyleSheet.create({
  topbar: {
    backgroundColor: '#e2e2e2',//'#F2F2F2',
    //#5f695d',
    //flex:1,
    height: 50,
    borderColor: '#AAAAAA',
    borderBottomWidth:1,
   // borderBottomLeftRadius: 20,
   // borderBottomRightRadius: 20,
    //opacity: 0.9,
  },
  container: {
    hight: '100%',
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  userpost:{
    flexDirection:'row',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#5f695d',
    top: 8,
    letterSpacing: 8,
  },
  image: {
    width: '95%',
    height: '95%',
  },
  contentContainer: {
    flex: 3,
  },
  contentText: {
    fontSize:20,
    left:10,
   // color:"red",
  },
  nameStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5f695d',
    left: 15,
    top:5,
    letterSpacing: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    backgroundColor: '#D1DED7',
    flex: 1,
    //position:'relative',
  },
  iconContainer: {
    left: 8,
    top: 5,
  },
  buttonContainer: {
    backgroundColor: '#fbb856',//較深黃
    //backgroundColor: '#ffc56b',//較淺黃
    flex: 1,
    width: 120,
    alignSelf: 'flex-end',
    right: 7,
    bottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#6b5238',
    top: 8,
    letterSpacing: 10,
    left: 7,
  },
  imageContainer: {
    flex: 5, 
    alignItems: 'center', 
    backgroundColor: '#D1DED7',
    borderColor: '#D1DED7',
    borderWidth: 3,
    borderBottomWidth:10,
  },
  buttonbar: {
    flex:0.35,    
  },
  butContainer: {
    flex: 1,   
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:"#e2e2e2", 
    flexDirection: 'row',
    justifyContent:'center',
    //borderColor: '#000000',
   // borderBottomWidth:3,
  },
  buticonContainer1:{
      right:100,
      top:10,
  },
  buticonContainer2:{
    right:-70,
    top:10,
    },
});

export default Post;
