/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {ContentContext} from 'src/context/ContextProvider';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from 'src/components/CustomButton';
import {Center} from 'src/commonStyle/commonStyle';
const HomeTab = ({navigation}) => {
  const {dispatch} = useContext(ContentContext);
  const [current, setCurrent] = useState(0);
  const [optionList] = useState([
    {id: 0, content: '集成'},
    {id: 1, content: '精选'},
    {id: 2, content: '热门'},
    {id: 3, content: '示例'},
    {id: 4, content: '理论'},
    {id: 5, content: '问题'},
  ]);
  //定位-内部实现是通过HTML5的navigator;
  const [btnList] = useState([
    {
      id: 0,
      content: '网页集成',
      method: () => navigation.navigate('TheoryDescScreen'),
    },
    {
      id: 1,
      content: '视频集成',
      method: () => navigation.navigate('IncidentDescScreen'),
    },
    {
      id: 2,
      content: '定位集成',
      method: () => getCurrentPosition(),
    },
    {
      id: 3,
      content: '音频集成',
      method: () => navigation.navigate('AudioScreen'),
    },
    {
      id: 4,
      content: '访问相册',
      method: () => navigation.navigate('ImagePicker'),
    },
    {
      id: 5,
      content: '保存图片',
      method: () => navigation.navigate('ImageSaveScreen'),
    },
    {
      id: 6,
      content: '释放路由',
      method: () => onReleaseRoute(),
    },
    {
      id: 7,
      content: '锁定路由',
      method: () => onLockRoute(),
    },
  ]);
  const requestLocationPermission = async (success, failure) => {
    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
      });
      Geolocation.requestAuthorization();
      return true;
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '允许访问您的地理位置',
            message: '我们将访问您的地理位置,以此为你推荐相关路线',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('可以使用地理位置');
          return true;
        } else {
          console.log('不能使用地理位置');
          return false;
        }
      } catch (err) {
        console.log('不能使用地理位置');
        return false;
      }
    }
  };
  const getCurrentPosition = async () => {
    const hasLocationPermission = await requestLocationPermission();
    if (hasLocationPermission) {
      try {
        Geolocation.getCurrentPosition(
          info => {
            console.log('已授权', info);
            Alert.alert(
              '当前位置',
              `经度${info.coords.latitude} - 纬度${info.coords.longitude}`,
              [
                {
                  text: '关闭',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
            );
          },
          error => {
            console.log('未授权', error);
          },
          {
            timeout: 5000,
          },
        );
      } catch (error) {
        console.log('未被授权', error);
      }
      //IOS如果不允许授权,getCurrentPosition自动会进入Error;
    }
  };
  const onReleaseRoute = () => {
    dispatch({
      type: 'userRouterPermissions',
      payload: [],
    });
    Alert.alert('提示', '路由释放成功,在账户页面中测试;', [{text: '确定'}]);
  };
  const onLockRoute = () => {
    dispatch({
      type: 'userRouterPermissions',
      payload: ['InfoScreen'],
    });
    Alert.alert('提示', '路由锁定成功,在账户页面中测试;', [{text: '确定'}]);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal={false}>
        <View style={styles.optionArea}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.optionAreaLeft}>
            {optionList.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setCurrent(item.id)}>
                  <View
                    style={
                      item.id == current
                        ? styles.optionBox
                        : styles.optionBoxUnActived
                    }>
                    <Text
                      style={
                        item.id == current
                          ? styles.textDefault
                          : styles.textUnActived
                      }>
                      {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {current == 0 ? (
          <View style={styles.focusListContainer}>
            {btnList.map(item => {
              return (
                <CustomButton
                  key={item.id}
                  title={item.content}
                  titleColor={'rgba(255,255,255,0.75)'}
                  fontSize={11}
                  width={150}
                  height={50}
                  marginTop={10}
                  marginleft={10}
                  marginRight={10}
                  marginBottom={10}
                  backgroundColor={'rgba(10,10,10,0.9)'}
                  borderRadius={2.5}
                  align={Center}
                  onPress={item.method}
                />
              );
            })}
          </View>
        ) : null}
        {current == 1 ? <Text>精选</Text> : null}
        {current == 2 ? <Text>热门</Text> : null}
        {current == 3 ? <Text>示例</Text> : null}
        {current == 4 ? <Text>理论</Text> : null}
        {current == 5 ? <Text>问题</Text> : null}
      </ScrollView>
    </View>
  );
};
export default HomeTab;
let MainWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  codeBlock: {
    backgroundColor: 'gray',
    borderBottomWidth: 1,
    borderColor: 'red',
    fontSize: 13,
    color: 'white',
    paddingRight: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    width: MainWidth * 0.8,
    borderWidth: 2,
    height: 40,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: MainWidth * 0.1,
    marginRight: MainWidth * 0.1,
  },
  TabViewItem: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  optionArea: {
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  optionAreaLeft: {
    backgroundColor: 'white',
    height: 60,
    width: MainWidth * 0.75,
  },
  btn: {
    height: 60,
    width: 95,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#972F97',
    backgroundColor: 'black',
  },
  optionBox: {
    height: 60,
    width: 95,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#972F97',
    backgroundColor: 'black',
  },
  optionBoxUnActived: {
    height: 60,
    width: 95,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDefault: {
    color: 'white',
    fontSize: 15,
  },
  textUnActived: {
    color: 'gray',
  },
  focusListContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
