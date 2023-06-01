import React, { useState,useRef,useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text,Easing,Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';

const DiscoveryTab = () => {
  const refPlayer = useRef(null);
  const [rate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [resizeMode, setResizeMode] = useState('contain');
  const [paused, setPaused] = useState(true);
  const [pan] = useState(new Animated.ValueXY());
  const [previousPan, setPreviousPan] = useState({ x: 0, y: 0 })
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [boxStyle, setBoxStyle] = useState({ 
    width: 150,
    height: 150,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:75});
    const [lastRotationValue, setLastRotationValue] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const rotationValue = useRef(new Animated.Value(0)).current;
    // useEffect(() => {
    //   rotationValue.addListener(({ value }) => {
    //     setLastRotationValue(value); // 监听动画值变化并更新lastRotationValue状态
    //     console.log("rotationValue.__getValue()",value);
    //   });
    //   return () => {
    //     rotationValue.removeAllListeners();
    //   };
    // }, []);
    const startRotation = () => {
      rotationValue.setValue(0);
      // rotationValue.setValue(lastRotationValue.current);
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false, // 添加这行代码
      }).start(({ finished }) => {
        if (finished) {
          startRotation();
        }
      });
      setIsRotating(true);
    };
    const stopRotation = () => {
      rotationValue.stopAnimation();
      setIsRotating(false);
    };
  
    const resetRotation = () => {
      rotationValue.setValue(0);
      setIsRotating(false);
    };
  
    const rotateInterpolation = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      pan.setValue({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      // console.log("拖拽",previousPan.x + gesture.dx,previousPan.y + gesture.dy );
    },
    onPanResponderGrant: () => {
      setBoxStyle({ 
        width: 150,
        height: 150,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:75});
    },
    onPanResponderRelease: (event, gesture) => {
      setPreviousPan({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      setBoxStyle({ 
        width: 150,
        height: 150,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:75});
        // console.log("释放");
    },
  });
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
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleValue },{ translateX: pan.x }, { translateY: pan.y }, { rotate: rotateInterpolation  }],
          },
          boxStyle, 
        ]}
        {...panResponder.panHandlers}
      >  
      <TouchableOpacity onPress={()=>console.log("press")} style={{ width: 100,height: 100,  justifyContent: 'center',alignItems: 'center',}}>
        <Text style={styles.text}>ReactNative</Text>
      </TouchableOpacity>
    </Animated.View>
    <View>
    <Button
          title={isRotating ? '暂停' : '继续'}
          onPress={() => (isRotating ? stopRotation() : startRotation())}
        />
        <Button title="重置" onPress={resetRotation} />
      </View>
    <Video
        source={{
          uri: 'https://webfs.ali.kugou.com/202306011754/afff792bcef89f7c6165da9484347360/part/0/960121/KGTX/CLTX001/clip_f72f0819a8f4b565b163d2fe924c211c.mp3',
        }}
        ref={refPlayer} //实例;
        rate={rate} //倍率;
        paused={paused} // 控制暂停/播放，0 代表暂停paused, 1代表播放normal;
        volume={volume} // 0静音, 1正常，其他数字表示放大倍数;
        muted={false} // true静音，默认false;
        onLoad={onLoad} // 加载完毕时回调;
        onLoadStart={loadStart} // 视频开始加载回调;
        onProgress={onProgress} // 进度实时回调;
        onEnd={onEnd} // 视频播放完毕回调函数;
        repeat={false} //重复播放;
        resizeMode={resizeMode} //嵌套方式;
        onError={onError} // 错误回调;
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  bubble: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default DiscoveryTab;




