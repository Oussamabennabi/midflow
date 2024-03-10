import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OnboardingData } from "@/types";
type Props = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
};

const RenderItem = ({
  index,
  x,
  item: { backgroundColor, id, image, text, textColor },
}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: scale }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>{image}</Animated.View>
      <Text style={[styles.itemText, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
  },
  itemText: {
    textAlign: "center",
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
