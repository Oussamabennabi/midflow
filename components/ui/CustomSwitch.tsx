import { COLOR_SHADES } from '@/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Animated, Platform } from 'react-native';

export const CustomSwitch = ({ isSelected = true, onPress }: { isSelected: boolean; onPress: () => void }) => {
  const animatedValue = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // You need to set this to false for shadow to work on Android
    }).start();
  }, [isSelected]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 31], // Adjust the values based on your design
  });

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: 'red',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    android: {
      elevation: 6,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        width: 57,
        height: 28,
        backgroundColor: isSelected ? COLOR_SHADES.blue.primary : COLOR_SHADES.gray.shade2,
        borderRadius: 5,
        position: 'relative',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ translateX }],
          width: 24,
          aspectRatio: 1 / 1,
          backgroundColor: 'white',
          top: 2,
          borderRadius: 3,
          ...shadowStyle,
        }}
      />
    </TouchableOpacity>
  );
};
