import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";

interface SwatchProps {
  colors: string[];
  onPress?: () => void;
  size?: number;
  stop?: number;
}

const SwatchCard: React.FC<SwatchProps> = ({
  colors,
  onPress = () => {},
  size = 50,
  stop = 3,
}) => {
  const backgroundColor = useThemeColor({}, "foreground");

  const borderRadiusConfig = (index: number) => ({
    borderRadius: size / 15,
    ...(colors.length > 1 &&
      index === colors.length - stop && {
        borderBottomLeftRadius: size / 5,
        borderBottomRightRadius: size / 5,
      }),
    ...(colors.length > 1 &&
      index === colors.length - 1 && {
        borderTopLeftRadius: size / 5,
        borderTopRightRadius: size / 5,
      }),
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          padding: size / 14,
          gap: size / 14,
          borderRadius: size / 15 + size / 5,
        },
      ]}
    >
      {colors.map(
        (color, index) =>
          index > colors.length - stop - 1 && (
            <Pressable
              onPress={onPress}
              key={index}
              style={[
                styles.swatch,
                {
                  backgroundColor: color,
                  width: size,
                  height: size * 1.25,
                  ...borderRadiusConfig(index),
                },
              ]}
            />
          )
      )}
    </View>
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
  swatch: {},
});

export default SwatchCard;
