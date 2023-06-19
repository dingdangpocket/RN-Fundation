/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const TheoryDescScreen = () => {
    const injectedJs = 'window.alert("参数来自Native:id?10")';
    return (
        <View style={{flex: 1}}>
            <WebView
                style={{flex: 1}}
                source={{uri: 'https://www.baidu.com'}}
                // injectedJavaScriptBeforeContentLoaded={injectedJs}
                javaScriptEnabledAndroid={true}
                javaScriptEnabled={true}
                mixedContentMode={'compatibility'}
                onMessage={event => {
                    alert('接收数据' + event.nativeEvent.data);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default TheoryDescScreen;
