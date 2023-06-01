import React, { useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

const DiscoveryTab = () => {
  const [pan] = useState(new Animated.ValueXY());
  const [previousPan, setPreviousPan] = useState({ x: 0, y: 0 })
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
    onPanResponderMove: (_, gesture) => {
      pan.setValue({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
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
    onPanResponderRelease: (_, gesture) => {
      setPreviousPan({ x: previousPan.x + gesture.dx, y: previousPan.y + gesture.dy });
      setBoxStyle({ 
        width: 100,
        height: 100,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30});
    },
  });
  const animatedStyle = {
    transform: pan.getTranslateTransform(),
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
});

export default DiscoveryTab;




