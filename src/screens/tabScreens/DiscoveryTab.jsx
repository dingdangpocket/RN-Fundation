import React, { useState,useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DiscoveryTab = () => {
  const [pan] = useState(new Animated.ValueXY());
  const [previousPan, setPreviousPan] = useState({ x: 0, y: 0 })
  const bubbles = useRef([]);
  const [boxStyle, setBoxStyle] = useState({ 
    width: 100,
    height: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30});
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      pan.setValue({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      // console.log("拖拽",previousPan.x + gesture.dx,previousPan.y + gesture.dy );
    },
    onPanResponderGrant: () => {
      setBoxStyle({ 
        width: 110,
        height: 110,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:35});
    },
    onPanResponderRelease: (event, gesture) => {
      setPreviousPan({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      setBoxStyle({ 
        width: 110,
        height: 110,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:35});
        // console.log("释放");
    },
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
          boxStyle, 
        ]}
        {...panResponder.panHandlers}
      >  
      <TouchableOpacity onPress={()=>console.log("press")} style={{ width: 100,height: 100,  justifyContent: 'center',
    alignItems: 'center',}}>
        <Text style={styles.text}>ReactNative</Text>
      </TouchableOpacity>
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




