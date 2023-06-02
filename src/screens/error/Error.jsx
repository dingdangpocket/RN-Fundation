/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
const Error = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 16}}>ERROR!对不起您没有权限访问该页面;</Text>
    </View>
  );
};
export default Error;
