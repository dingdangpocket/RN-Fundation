/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const EventTab = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          height: 60,
          width: 95,
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 15,
          borderBottomWidth: 2,
          borderBottomColor: '#972F97',
          backgroundColor: 'black',
        }}
        onPress={() => navigation.navigate('CameraTest')}>
        <Text style={{color: 'white'}}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};
export default EventTab;
