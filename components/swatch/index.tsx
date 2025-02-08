import React, { Fragment, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import SwatchCard from "./card";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SwatchProps {
  colors: string[][];
  onPress?: (colors: string[]) => void;
  size?: number;
}

const CONFIG = {
  damping: 14,
  mass: 1,
};

const Swatch: React.FC<SwatchProps> = ({ colors, onPress, size }) => {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const opened = useSharedValue<boolean>(false);
  const isWeb = Platform.OS === "web";

  const handlePress = () => {
    if (opened.value) {
      offset.value = withSpring(0, CONFIG);
    } else {
      offset.value = withSpring(90, CONFIG);
    }
    opened.value = !opened.value;
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(({ translationX, translationY }) => {
      const translation = (translationX + translationY) / 3.5;
      offset.value = opened.value ? 90 + translation : translation;
    })
    .onFinalize(({ velocityX, velocityY }) => {
      const velocity = (velocityX + velocityY) / 7;
      const shouldOpen = offset.value > 75;

      opened.value = shouldOpen;
      offset.value = withSpring(shouldOpen ? 90 : 0, { ...CONFIG, velocity });
      pressed.value = false;
    });

  const tap = Gesture.Tap()
    .onEnd(() => {
      isWeb && handlePress();
    })
    .simultaneousWithExternalGesture(pan);

  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      return {
        transform: [
          // { scale: withTiming(pressed.value ? 1.05 : 1) },
          {
            rotate: `${
              interpolate(offset.value, [-90, 0, 360], [-15, 0, 72], "clamp") *
              index
            }deg`,
          },
        ],
        backgroundColor: pressed.value ? "#FFE04B" : "#b58df1",
      };
    });
  };

  const Wrapper = isWeb ? Fragment : View;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {colors.map((colorSet, index) => (
          <Animated.View
            style={[styles.card, getAnimatedStyle(index)]}
            key={index}
          >
            <GestureDetector gesture={Gesture.Race(pan, tap)}>
              <Wrapper>
                <SwatchCard
                  colors={colorSet}
                  onPress={handlePress}
                  size={size}
                />
              </Wrapper>
            </GestureDetector>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 8,
    position: "absolute",
    bottom: 64,
    left: 32,
  },
  card: {},
});

export default Swatch;
