/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View, StyleSheet, Animated, Text, LogBox, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from 'src/components/CustomButton';
import {Center} from 'src/commonStyle/commonStyle';
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
        <View style={styles.container}>
            <CustomButton
                title={'探索内部Stack'}
                titleColor={'rgba(255,255,255,0.75)'}
                fontSize={11}
                width={150}
                height={50}
                marginTop={10}
                backgroundColor={'rgba(10,10,10,0.9)'}
                borderRadius={2.5}
                align={Center}
                onPress={() => navigation.navigate('StackScreen')}
            />
            <CustomButton
                title={'保存数据AsyncStorage'}
                titleColor={'rgba(255,255,255,0.75)'}
                fontSize={11}
                width={150}
                height={50}
                marginTop={10}
                backgroundColor={'rgba(10,10,10,0.9)'}
                borderRadius={2.5}
                align={Center}
                onPress={saveData}
            />
            <CustomButton
                title={'保存数据AsyncStorage'}
                titleColor={'rgba(255,255,255,0.75)'}
                fontSize={11}
                width={150}
                height={50}
                marginTop={10}
                backgroundColor={'rgba(10,10,10,0.9)'}
                borderRadius={2.5}
                align={Center}
                onPress={getData}
            />
            <CustomButton
                title={'fadeIn'}
                titleColor={'rgba(255,255,255,0.75)'}
                fontSize={11}
                width={150}
                height={50}
                marginTop={10}
                backgroundColor={'rgba(10,10,10,0.9)'}
                borderRadius={2.5}
                align={Center}
                onPress={fadeIn}
            />
            <CustomButton
                title={'fadeOut'}
                titleColor={'rgba(255,255,255,0.75)'}
                fontSize={11}
                width={150}
                height={50}
                marginTop={10}
                backgroundColor={'rgba(10,10,10,0.9)'}
                borderRadius={2.5}
                align={Center}
                onPress={fadeOut}
            />
            <Animated.View
                style={[
                    {
                        backgroundColor: 'rgb(27,0,68)',
                        width: 150,
                        marginTop: 10,
                    },
                    {
                        opacity: fade,
                        height: height,
                    },
                ]}>
                <Text style={{color: 'white', padding: 5}}>fade In</Text>
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
export default CommunityTab;
