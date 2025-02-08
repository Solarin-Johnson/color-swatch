import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  PixelRatio,
} from "react-native";

interface SwatchProps {
  colors: string[];
  onPress?: () => void;
  size?: number;
  stop?: number;
}

const SwatchCard: React.FC<SwatchProps> = ({
  colors,
  onPress = () => {},
  size = 10,
  stop = 3,
}) => {
  const backgroundColor = useThemeColor({}, "foreground");
  const isWeb = Platform.OS === "web";
  const _size = PixelRatio.getPixelSizeForLayoutSize(size) + 28;

  const borderRadiusConfig = (index: number) => {
    const baseRadius = _size / 15;
    const largeRadius = _size / 5;
    const isFirst = index === colors.length - 1;
    const isLast = index === colors.length - stop;

    return {
      borderRadius: baseRadius,
      ...(colors.length > 1 && {
        ...(isLast && {
          borderBottomLeftRadius: largeRadius,
          borderBottomRightRadius: largeRadius,
        }),
        ...(isFirst && {
          borderTopLeftRadius: largeRadius,
          borderTopRightRadius: largeRadius,
        }),
      }),
    };
  };

  const CardBox = isWeb ? View : Pressable;

  return (
    <CardBox
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor,
          padding: _size / 16,
          gap: _size / 16,
          borderRadius: _size / 15 + _size / 5,
        },
      ]}
    >
      {colors.map(
        (color, index) =>
          index > colors.length - stop - 1 && (
            <View
              key={index}
              style={[
                styles.swatch,
                {
                  backgroundColor: color,
                  width: _size,
                  height: _size * 1.25,
                  ...borderRadiusConfig(index),
                },
              ]}
            />
          )
      )}
    </CardBox>
  );
};

export const styles = StyleSheet.create({
  container: {
    margin: 8,
    position: "absolute",
    left: -24,
    bottom: -12,
    flexDirection: "column-reverse",
  },
  swatch: {
    // transformOrigin: [0, 10, 0],
  },
});

export default SwatchCard;
