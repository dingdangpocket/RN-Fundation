import React, {useState} from 'react';
import {View, StyleSheet, PanResponder, Animated} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

const DiscoveryTab = () => {
  const [pan] = useState(new Animated.ValueXY());
  const [previousPan, setPreviousPan] = useState({x: 0, y: 0});

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      setPreviousPan({x: pan.x._value, y: pan.y._value});
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.square,
            {
              transform: [{translateX: pan.x}, {translateY: pan.y}],
            },
          ]}
        />
      </PanGestureHandler>
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
