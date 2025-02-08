import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
    .onFinalize(() => {
      if (offset.value > 100) {
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
              interpolate(offset.value, [-45, 0, 180], [-5, 0, 35], "clamp") *
              index
            }deg`,
          },
        ],
        backgroundColor: pressed.value ? "#FFE04B" : "#b58df1",
      };
    });
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <View style={styles.card}>
          {colors.map((colorSet, index) => (
            <Animated.View
              key={index}
              style={[styles.card, getAnimatedStyle(index)]}
            >
              <SwatchCard colors={colorSet} onPress={handlePress} size={size} />
            </Animated.View>
          ))}
        </View>
      </GestureDetector>
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
    bottom: 54,
    left: 32,
  },
  card: {},
});

export default Swatch;
