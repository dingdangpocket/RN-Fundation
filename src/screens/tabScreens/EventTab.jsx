import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const EventTab = () => {
  const position = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const animation = Animated.timing(position, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: true,
    });

    const loopAnimation = Animated.loop(animation);

    loopAnimation.start();
  }, []);

  const ballSize = 50;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [{ translateY: position }],
          },
        ]}
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
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
  },
});

export default EventTab;




