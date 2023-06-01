import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';

const DiscoveryTab = () => {
  const [pan] = useState(new Animated.ValueXY());
  const previousPan = useRef({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      pan.x.setValue(previousPan.current.x + gesture.dx);
      pan.y.setValue(previousPan.current.y + gesture.dy);
    },
    onPanResponderRelease: (_, gesture) => {
      previousPan.current.x += gesture.dx;
      previousPan.current.y += gesture.dy;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
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
    backgroundColor: 'blue',
  },
});

export default DiscoveryTab;


