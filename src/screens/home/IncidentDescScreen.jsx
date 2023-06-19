/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const IncidentDescScreen = () => {
    const refPlayer = useRef(null);
    const [rate, setRate] = useState(1.0);
    const [volume, setVolume] = useState(1.0);
    const [resizeMode, setResizeMode] = useState('contain');
    const [paused, setPaused] = useState(false);
    const onError = onError => {
        console.log('播放错误', onError);
    };
    const onLoad = onLoad => {
        console.log('加载完成', onLoad);
    };
    const loadStart = loadStart => {
        console.log('开始加载', loadStart);
    };
    const onProgress = onProgress => {
        console.log('播放进度', onProgress);
    };
    const onEnd = onEnd => {
        console.log('加载结束', onEnd);
    };
    return (
        <View style={{flex: 1}}>
            <Video
                source={{
                    uri: 'https://vd2.bdstatic.com/mda-je0eurd25map1qya/sc/mda-je0eurd25map1qya.mp4?v_from_s=hkapp-haokan-hnb&auth_key=1665064883-0-0-b90a145ef1a3a02d90ed9a5af83a66b9&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=1883086367&vid=11957859104889775946&abtest=&klogid=1883086367',
                }} // Can be a URL or a local file.
                ref={refPlayer} // Store reference
                onError={onError} // Callback when video cannot be loaded
                style={styles.container}
                rate={rate} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                paused={paused}
                volume={volume} // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                muted={false} // true代表静音，默认为false.
                onLoad={onLoad} // 当视频加载完毕时的回调函数
                onLoadStart={loadStart} // 当视频开始加载时的回调函数
                onProgress={onProgress} //  进度控制，每250ms调用一次，以获取视频播放的进度
                onEnd={onEnd} // 当视频播放完毕后的回调函数
                repeat={false} //重复播放
                resizeMode={resizeMode} //嵌套方式;
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

export default IncidentDescScreen;
