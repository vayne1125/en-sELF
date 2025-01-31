import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

import Weather from '../../data/Weather';
import ThemeImg from '../../data/ThemeImg';
import MapImg from '../../data/MapImg';

const width = Dimensions.get('screen').width - 50;
const height = Dimensions.get('screen').height / 1.15;

const DetailForFinal = ({entry, modalVisible, onClose, isMain}) => {
  const Stars = score => {
    var tp = parseFloat(score.starsNum);
    var starsIcon = [];
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
      if (tp >= 1) {
        starsIcon.push(
          <Icon key={cnt} name={'star'} color={'#ffc56b'} size={24} />,
        );
        tp = tp - 1;
      } else if (tp == 0) {
        starsIcon.push(
          <Icon key={cnt} name={'star-o'} color={'#ffc56b'} size={24} />,
        );
      } else {
        starsIcon.push(
          <Icon
            key={cnt}
            name={'star-half-empty'}
            color={'#ffc56b'}
            size={24}
          />,
        );
        tp = 0;
      }
      cnt += 1;
    }
    return (
      <View style={styles.starStyle}>
        <Text style={{fontSize: 20, bottom: 2}}>{score.starsNum} </Text>
        {starsIcon}
      </View>
    );
  };
  return (
    <Modal 
      transparent={true} 
      visible={modalVisible}
    >
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>
          <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
              { isMain ? (
                <Image
                  style={styles.image}
                  source={ThemeImg[entry['name']]}
                />
              ) : (
                <Image
                  style={styles.image}
                  source={MapImg[entry['type'] + entry['id'].toString()]}
                />
              )}
              <Icons
                name="cross"
                size={42}
                color={'#5f695d'}
                onPress={() => onClose()}
                style={styles.iconStyle}
              />
            </View>
            <View style={styles.spaceContainer}></View>
          </View>
          <View style={styles.infoBack}>
            <View style={styles.infoContainer}>
              <ScrollView>
                <View style={styles.infoStyle}>
                  <Text style={styles.siteNameStyle}>{entry['name']}</Text>
                  <Stars starsNum={entry['star']} />
                  <Text style={styles.infoTitle}>
                    {'\n'}
                    <Icon name="map-marker" size={25} color={'#5f695d'} />
                    地址
                  </Text>
                  <Text style={styles.infoTextStyle}>
                    {entry['address']}
                    {'\n'}
                  </Text>

                  { entry['type'] === 'hol' && (
                    <View>
                      <Text style={styles.infoTitle}>
                        <Icon name="clock-o" size={23} color={'#5f695d'} />
                        活動日期
                      </Text>
                      <Text style={styles.infoTextStyle}>
                        {entry['date']}
                        {'\n'}
                      </Text>
                    </View>
                  ) }

                  <Text style={styles.infoTitle}>
                    <Icon name="clock-o" size={23} color={'#5f695d'} />
                    營業時間
                  </Text>
                  <Text style={styles.infoTextStyle}>
                    {entry['time']}
                    {'\n'}
                  </Text>
                  <Text style={styles.infoTitle}>
                    <Icon name="info-circle" size={23} color={'#5f695d'} />
                    簡介
                  </Text>
                  <Text style={styles.infoTextStyle}>
                    {entry['info']}
                    {'\n'}
                  </Text>
                  <Text style={styles.infoTitle}>
                    <Icon3 name="weather-cloudy" size={23} color={'#5f695d'} />
                    天氣
                  </Text>
                  <Weather city={entry['city']} region={entry['region']} />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonContainer}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    width: '100%',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    height,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
  },
  topContainer: {
    flex: 9,
    backgroundColor: '#D1DED7',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
    backgroundColor: '#ffc56b',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 50,
    flex: 9,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
  },
  iconStyle: {
    position: 'absolute',
    top: '2%',
    right: '2%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
  },
  spaceContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
  },
  infoBack: {
    flex: 14,
    backgroundColor: '#D1DED7',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 5,
  },
  siteNameStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: "#000000",
  },
  starStyle: {
    flex: 1,
    flexDirection: 'row',
    top: 8,
  },
  infoStyle: {
    flex: 1,
    width: 335,
    alignSelf: 'center',
    marginTop: 20,
    color: "#000000",
  },
  infoTitle: {
    fontSize: 22,
    letterSpacing: 10,
    color: "#000000",
  },
  infoTextStyle: {
    fontSize: 18,
    letterSpacing: 4,
    paddingTop: 10,
    color: "#000000",
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  buttonContainer: {
    backgroundColor: '#D1DED7',
    alignSelf: 'center',
    flex: 2,
    width: '100%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: '18%',
    paddingRight: '18%',
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 24,
    color: '#6b5238',
    top: 9,
    alignSelf: 'center',
  },
});

export default DetailForFinal;
