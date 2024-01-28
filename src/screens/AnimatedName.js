import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

const AnimatedName = () => {
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#FFFFFF', '#FF5733'] // Replace with your desired colors
    );
    return {
      backgroundColor,
    };
  });

  useEffect(() => {
    progress.value = withTiming(1, { duration: 3000, easing: Easing.linear });
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>
        Abhinav Mishra News
      </Text>
      <Animated.View style={[{ height: 4, width: '100%', borderRadius: 2 }, animatedStyle]} />
    </View>
  );
};

export default AnimatedName;
