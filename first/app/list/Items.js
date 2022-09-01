import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator,
  } from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import { CheckBox } from '@rneui/themed';
import Image_link from '../theme/Image';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { parseMapToJSON } from "source-map-resolve";
import {AuthContext} from '../routes/AutoProvider';
import { useNavigation } from '@react-navigation/native';


import Hotplace from '../../map/Hotplace'
import Shopplace from '../../map/Shopplace'
import Holplace from '../../map/Holplace'
import Food from '../../theme/Food'
import Hotel from '../../theme/Hotel'
import KOL from '../../theme/KOL'
import Monuments from '../../theme/Monuments'
import Nature from '../../theme/Nature'
const width = Dimensions.get('screen').width;

const Items = () => {
    const {user} = useContext(AuthContext);
    const [sites, setSites] = useState([]);
    const [cnt, setCnt] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const Cnt = () => {
            setLoading(true);
            var count = 0;
            if(user){
                const users = firestore().collection('users').doc(user.uid);
                users.collection('list').get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach(()=>{count++;});
                    setCnt(count);
                })
                .catch(()=>{})            
            }
        }
        Cnt();
    },[user]);

    useEffect(()=>{
        const fetchSites = async() => {
            try{
                const list=[];
                if(user){
                    const users = firestore().collection('users').doc(user.uid);
                    await users.collection('list').get()
                    .then((querySnapshot)=>{
                        querySnapshot.forEach(doc => {
                            const {check, id, type} = doc.data();
                            var data;
                            if(type === "food") data = Food[id];
                            else if(type === "nature") data = Nature[id];
                            else if(type === "kol") data = KOL[id];
                            else if(type === "monuments") data = Monuments[id];
                            else if(type === "hotel") data = Hotel[id];
                            else if(type === "hol") data = hol[id];
                            else if(type === "hot") data = hot[id];
                            else if(type === "shop") data = shop[id];
                          
                            list.push({
                                name: data.name,
                                city: data.city,
                                region: data.region,
                                check: check,
                            });
                        })
                    })
                    setSites(list);
                    setLoading(false);
                }
                DeviceEventEmitter.emit('items');
            }
          catch(e){console.log(e);};
        }
        fetchSites();
    },[cnt]);

    const CheckDel = (name) =>{
        Alert.alert(
            "",
            "確定要刪除嗎?",
            [
                {
                    text: '確認',
                    onPress: () => {
                        if(user){
                            setLoading(true);
                            const users = firestore().collection('users').doc(user.uid);
                            users.collection('list').doc(name).delete().
                            then(() =>{
                                DeviceEventEmitter.emit('delete', name);
                                setCnt(cnt - 1);
                            })
                            .catch(error => {})
                        }
                    },
                },
                {
                    text: "取消",
                },
            ],
        );
    };
    const Card = ({site}) => {
        useEffect(() => {
            const listen = DeviceEventEmitter
            .addListener('allcheck',(check) => {setCheck(!check);});
            return () => listen.remove();
        },[]);
        const [check, setCheck] = useState(site.check);
        return (
            <View style={styles.card}>
                <View style={styles.ChanceContainer}>
                <><CheckBox
                    center
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={ check }
                    onPress={() => {
                        if(user){
                            const users = firestore().collection('users').doc(user.uid);
                            users.collection('list').doc(site.name).update({check:!check})
                        }
                        DeviceEventEmitter.emit('items');
                        setCheck(!check);
                    }}
                /></>
                </View>
                <View style={styles.imageContainer}>
                    {<Image style={styles.image} source={Image_link[site.name]} />}
                </View>
                <View style={{flex: 2}}>
                    <TouchableOpacity
                        onPress={()=>{CheckDel(site.name)}}>
                        <View style={{right:-100}}>
                            <Icons
                            name="circle-with-cross"
                            size={25}
                            color={'#5f695d'}
                            style={styles.iconStyle}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameStyle}>{site.name}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.addressStyle}>{site.city}{site.region}</Text>
                    </View>
                </View>
            </View>
        );
    };
    const navigation = useRef(useNavigation());
    useEffect(() => {
        const fetchSchedule = () => {
            const list = [];
            const listen = DeviceEventEmitter
            .addListener('gotomap', async() => {
                try{
                    if(user){
                        const users = firestore().collection('users').doc(user.uid);
                        await users.collection('list').get()
                        .then((querySnapshot)=>{
                            querySnapshot.forEach(doc => {
                                const {type, id, place_id, check} = doc.data();
                                if(check){
                                    list.push({
                                        type: type,
                                        id: id,
                                        place_id: place_id,
                                    })
                                }
                            });
                        });
                        console.log(list);
                        navigation.current.navigate("MapHome", list);
                    };
                }
                catch(e){};
            });
            return () => {
                listen.remove();
            }
        }
        fetchSchedule();
    },[]);

    return (
        <View style={styles.container}>
            {loading?
            <View style={{justifyContent:'center',flex:1}}>
                <ActivityIndicator
                    animating = {true}
                    color = {'#BEBEBE'}
                    size = {'large'}
                />
            </View>:
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                marginTop: 25,
                paddingBottom: 80,
                }}
                numColumns={1}
                data={sites}
                renderItem={({item}) => <Card site={item} />}>     
            </FlatList>}
        </View>
    );
}

const styles = StyleSheet.create({
    topbar: {
      backgroundColor: '#5f695d',
      height: 63,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    container: {
      hight: '100%',
      backgroundColor: '#F2F2F2',
      flex: 1,
    },
    card: {
      height: 170,
      //backgroundColor:'#D1DED7',
      backgroundColor: '#ffffff',
      width,
      //marginHorizontal: 10,
      //borderRadius: 10,
      marginBottom: 15,
      //paddingTop:5,
      padding: 5,
      //right: 2,
      //borderColor: '#D1DED7',
      //borderWidth: 3,
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 3,
      borderBottomColor:'#D1DED7',
      borderRightWidth:3,
      borderRightColor:'#ffffff',
    },
    textStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 19,
      color: '#5f695d',
      top: 8,
      letterSpacing: 10,
    },
    image: {
      width: 180,
      height: 110,
      borderRadius: 10,
    },
    textContainer: {
      flex: 2,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignSelf: 'center',
      alignItems: 'center',
      top: 13,
      right: 8,
      //position:'relative',
    },
    imageContainer: {
      flex: 2.5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    ChanceContainer:{
        flexDirection: 'column',
        flex:0.8,
        alignSelf: 'center',
        justifyContent:'center',
    },
    nameStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#5f695d',
      left: 15,
      letterSpacing: 1,
    },
    addressStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 10,
        color: 'gray',
        left: 15,
        letterSpacing: 1,
    },
    /*CheckBox:{
        height: 50,             
        width: 50,
        borderWidth: 1,        
        backgroundColor: 'red', 
        borderColor: 'green',   
        borderStyle: 'dotted',
    },*/
  });
  
export default Items;