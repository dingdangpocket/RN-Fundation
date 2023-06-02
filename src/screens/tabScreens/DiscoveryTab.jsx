import React, { useState,useRef,useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated, ImageBackground,Text,Easing,TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import CustomButton from 'src/components/CustomButton';
import {Center} from 'src/commonStyle/commonStyle';

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
    borderRadius:75,
    borderStyle: "solid",
    borderColor: "purple",
  });
  const [borderStyle,setBorderStyle] = useState({ 
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:75,
    borderStyle: "solid",
    borderColor: "purple",
    borderTopWidth:5,
    borderBottomWidth:5,
    borderLeftWidth:5,
    borderRightWidth:5
  });
    const [isRotating, setIsRotating] = useState(false);
    const rotationValue = useRef(new Animated.Value(0)).current;
    useEffect(()=>{
      isRotating?setPaused(false):setPaused(true)
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.04,
            duration:600,
            easing: Easing.linear, 
            useNativeDriver: true, 
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration:600, 
            easing: Easing.linear, 
            useNativeDriver: true, 
          }),
        ]),
      ).start();
    },[isRotating])
    const startRotation = () => {
      rotationValue.setValue(0);
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false, 
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
    const commonBorderStyle={
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:75,
      borderStyle: "solid",
      borderTopWidth:5,
      borderBottomWidth:5,
      borderLeftWidth:5,
      borderRightWidth:5
    }
    const commonBoxStyle={
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:75,
    }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      pan.setValue({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      // console.log("拖拽",previousPan.x + gesture.dx,previousPan.y + gesture.dy );
    },
    onPanResponderGrant: () => {
      setBorderStyle({ 
        borderColor: "rgb(50,50,50)",
        ...commonBorderStyle
      });
      setBoxStyle({ 
        backgroundColor:  "rgb(80,80,80)",
        ...commonBoxStyle
      });
    },
    onPanResponderRelease: (event, gesture) => {
      setPreviousPan({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      setBoxStyle({ 
        backgroundColor: 'black',
        ...commonBoxStyle
      });
      setBorderStyle({ 
        borderColor: "purple",
        ...commonBorderStyle
      });
    },
  });
  const onError = onError => {
    // console.log('播放错误', onError);
  };
  const onLoad = onLoad => {
    // console.log('加载完成', onLoad);
  };
  const loadStart = loadStart => {
    // console.log('开始加载', loadStart);
  };
  const onProgress = onProgress => {
    // console.log('播放进度', onProgress);
  };
  const onEnd = onEnd => {
    // console.log('加载结束', onEnd);
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
        <TouchableOpacity onPress={()=>console.log("press")} style={borderStyle}>
          <Text style={styles.text}>Power By ReactNative</Text>
        </TouchableOpacity>
       </Animated.View>
     <View>
            <CustomButton
              title={isRotating?'暂停':"播放"}
              titleColor={ 'rgba(255,255,255,0.75)'}
              fontSize={11}
              width={100}
              height={35}
              marginTop={10}
              backgroundColor={
                'rgba(10,10,10,0.9)'
              }
              borderRadius={2.5}
              align={Center}
              onPress={isRotating?stopRotation:startRotation}
            />
            <CustomButton
              title={'重置'}
              titleColor={ 'rgba(255,255,255,0.75)'}
              fontSize={11}
              width={100}
              height={35}
              marginTop={10}
              backgroundColor={
                 'rgba(10,10,10,0.9)'
              }
              borderRadius={2.5}
              align={Center}
              onPress={resetRotation}
            />
      </View>
      <Video
          source={{
            uri: 'https://webfs.ali.kugou.com/202306011754/afff792bcef89f7c6165da9484347360/part/0/960121/KGTX/CLTX001/clip_f72f0819a8f4b565b163d2fe924c211c.mp3',
          }}
          ref={refPlayer} 
          rate={rate} 
          paused={paused} 
          volume={volume} 
          muted={false} 
          onLoad={onLoad} 
          onLoadStart={loadStart} 
          onProgress={onProgress} 
          onEnd={onEnd} 
          repeat={false} 
          resizeMode={resizeMode} 
          onError={onError}
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
  text: {
    color: 'white',
    fontSize: 15,
  },
});
export default DiscoveryTab;




