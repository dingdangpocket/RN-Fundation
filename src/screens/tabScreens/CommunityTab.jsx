/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  LogBox,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CommunityTab = ({navigation}) => {
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  const fade = useRef(new Animated.Value(0)).current;
  const height = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 100,
      useAnimatedDriver: true,
    }).start();
    Animated.timing(height, {
      toValue: 100,
      duration: 500,
      useAnimatedDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 100,
      useAnimatedDriver: true,
    }).start();
    Animated.timing(height, {
      toValue: 0,
      duration: 500,
      useAnimatedDriver: true,
    }).start();
  };
  const [userInfo] = useState({
    user: 'Dingdang',
    token: 'TYWU8728787392HU787266UYW77622',
  });
  const saveData = async () => {
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  };
  const getData = () => {
    AsyncStorage.getItem('userInfo').then(value => {
      if (value) {
        Alert.alert('AsyncStorage', value, [
          {
            text: '关闭',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
      }
      console.log(value);
    });
  };
  return (
    <View>
      <Button
        title="探索内部Stack"
        onPress={() => navigation.navigate('StackScreen')}
      />
      <Button title="保存数据AsyncStorage" onPress={() => saveData()} />
      <Button title="获取数据AsyncStorage" onPress={() => getData()} />
      <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={fadeIn}>
        <Text style={{color: 'white'}}>Fade In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={fadeOut}>
        <Text style={{color: 'white'}}>Fade Out</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            backgroundColor: 'gray',
          },
          {
            opacity: fade,
            height: height,
          },
        ]}>
        <Text>淡入</Text>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
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
});
export default CommunityTab;
