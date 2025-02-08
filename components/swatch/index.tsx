import React, { Fragment, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import SwatchCard from "./card";
import {
  Gesture,
  GestureDetector,
  Pressable,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface SwatchProps {
  colors: string[][];
  onPress?: (colors: string[]) => void;
  size?: number;
}

const Swatch: React.FC<SwatchProps> = ({ colors, onPress, size }) => {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const opened = useSharedValue<boolean>(false);
  const isWeb = Platform.OS === "web";

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      if (!opened.value) {
        offset.value = (event.translationX + event.translationY) / 3.5;
      } else {
        offset.value = 90 + (event.translationX + event.translationY) / 3.5;
      }
    })
    .onFinalize((event) => {
      const velocity = (event.velocityX + event.velocityY) / 7;
      offset.value = withSpring(offset.value + velocity * 0.2, {
        velocity,
        damping: 10,
      });
      const factor = isWeb ? offset.value < 80 : offset.value > 80;
      if (factor) {
        opened.value = true;
        offset.value = withSpring(90);
      } else {
        opened.value = false;
        offset.value = withSpring(0);
      }
      pressed.value = false;
    });

  const handlePress = () => {
    if (opened.value) {
      offset.value = withSpring(0);
    } else {
      offset.value = withSpring(90);
    }
    opened.value = !opened.value;
  };

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
            <GestureDetector gesture={pan}>
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
  card: {
    backgroundColor: "red",
    // width: 50,
  },
});

export default Swatch;
