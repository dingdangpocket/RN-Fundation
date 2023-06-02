/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Center} from 'src/commonStyle/commonStyle';
import {useState, useEffect} from 'react';
import CustomButton from 'src/components/CustomButton';
const Login = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [phoneNum, onChangePhoneNum] = useState('');
  const [accessCode, onChangeAccessCode] = useState('123456');
  const [countDown, setCountDown] = useState(5);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnContent, setBtnContent] = useState('获取验证码');
  useEffect(() => {
    if (!btnDisabled) return;
    if (countDown === 0) {
      setBtnContent('获取验证码');
      setBtnDisabled(false);
      return;
    }
    if (countDown > 0 && countDown <= 5) setBtnDisabled(true);
    const Interval = setInterval(() => {
      setCountDown(countDown - 1);
      setBtnContent(`${countDown - 1}s后重发`);
    }, 1000);
    return () => clearInterval(Interval);
  }, [btnDisabled, countDown]);
  const onGetAccessCode = () => {
    setBtnDisabled(true);
    setBtnContent('5s后重发');
    setCountDown(5);
  };
  const onLogin = () => {
    //api...
    accessCode == '123456'
      ? navigation.navigate('HomeTabs')
      : Alert.alert('提示', '手机验证码错误', [
          {
            text: '确认',
            onPress: () => console.log('Cancel Pressed'),
          },
        ]);
  };
  const commonInputStyle = {
    width: width * 0.88,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.7)',
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.65)',
            ...Center,
          }}>
          <View
            style={{
              width: width * 0.88,
              height: 30,
              backgroundColor: 'rgba(10,10,10,1)',
              ...Center,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                color: 'rgba(255,255,255,0.9)',
              }}>
              Power by ReactNative
            </Text>
          </View>
          <View
            style={{
              ...commonInputStyle,
            }}>
            <Text style={{marginRight: 5, color: 'white'}}>+86</Text>
            <TextInput
              style={{
                width: width * 0.7,
                borderBottomWidth: 2,
                borderColor: 'rgba(255,255,255,0.6)',
                color: 'white',
              }}
              onChangeText={value => {
                const authValue = value.replace(/[^\d]+/, '');
                onChangePhoneNum(authValue);
              }}
              value={phoneNum}
              underlineColorAndroid="transparent"
              placeholder="请输入手机号"
              placeholderTextColor={'rgba(255,255,255,0.8)'}
              keyboardType="number-pad"
              maxLength={11}
            />
          </View>
          <View
            style={{
              ...commonInputStyle,
            }}>
            <TextInput
              style={{
                width: width * 0.38,
                borderBottomWidth: 2,
                borderColor: 'rgba(255,255,255,0.6)',
                color: 'white',
              }}
              onChangeText={value => {
                const authValue = value.replace(/[^\d]+/, '');
                onChangeAccessCode(authValue);
              }}
              value={accessCode}
              underlineColorAndroid="transparent"
              placeholder="请输入验证码"
              placeholderTextColor={'rgba(255,255,255,0.8)'}
              keyboardType="number-pad"
              maxLength={6}
            />
            <CustomButton
              disabled={btnDisabled}
              title={btnContent}
              titleColor={btnDisabled ? 'rgba(255,255,255,0.75)' : 'white'}
              fontSize={11}
              width={width * 0.2}
              height={35}
              backgroundColor={
                btnDisabled ? 'rgba(10,10,10,0.9)' : 'rgba(255,51,0,0.5)'
              }
              borderRadius={2.5}
              marginLeft={15}
              align={Center}
              onPress={onGetAccessCode}
            />
          </View>
          <CustomButton
            title="登陆"
            titleColor="white"
            fontSize={18}
            width={width * 0.85}
            height={50}
            backgroundColor="rgba(10,10,10,0.7)"
            borderRadius={2.5}
            marginTop={10}
            align={Center}
            onPress={onLogin}
          />
        </View>
        {/* <ImageBackground
          style={{flex: 1}}
          resizeMode="cover"
          source={require('/src/static/C1.jpg')}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;
