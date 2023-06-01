import React, { useState,useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

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
      const x = gesture.moveX;
      const y = gesture.moveY;
      const bubble = { x, y };
      bubbles.current.push(bubble);
    },
    onPanResponderGrant: () => {
      setBoxStyle({ 
        width: 110,
        height: 110,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:35});
    },
    onPanResponderRelease: (event, gesture) => {
      setPreviousPan({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      setBoxStyle({ 
        width: 100,
        height: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30});
        bubbles.current = [];
    },
  });
  const animatedStyle = {
    transform: pan.getTranslateTransform(),
  };

  const renderBubbles = () => {
    return bubbles.current.map((bubble, index) => {
      const bubbleStyle = {
        left: bubble.x - 10, // 根据气泡尺寸调整偏移量
        top: bubble.y - 10,
      };
      return <View key={index} style={[styles.bubble, bubbleStyle]} />;
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
          styles.square, boxStyle, animatedStyle
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.text}>ReactNative</Text>
      </Animated.View>
      {renderBubbles()}
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
    backgroundColor: 'black',
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




