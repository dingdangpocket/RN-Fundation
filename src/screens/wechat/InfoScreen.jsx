/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
const InfoScreen = ({route}) => {
  const {params} = route;
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 16}}>具有访问权限:StackInfo:dingdang</Text>
      <Text style={{fontSize: 16}}>DeepLink参数{params?.id}</Text>
    </View>
  );
};
export default InfoScreen;
