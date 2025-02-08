/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    foreground: "#282828",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    foreground: "#ffffff",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const ColorSwatch = {
  red: {
    100: "#FFF0F0",
    200: "#FFD4D4",
    300: "#FFB0B0",
    400: "#FF8080",
    500: "#FF5050",
  },
  crimson: {
    100: "#FFE8F5",
    200: "#FFCAE8",
    300: "#FFA0D0",
    400: "#FF70B0",
    500: "#FF4090",
  },
  purple: {
    100: "#FAF5FF",
    200: "#EDE0FF",
    300: "#DCC2FF",
    400: "#C9A0FF",
    500: "#B584FF",
  },
  navy: {
    100: "#F0F4FF",
    200: "#D4E0FF",
    300: "#B0C8FF",
    400: "#80A0FF",
    500: "#5070FF",
  },
  blue: {
    100: "#F0F8FF",
    200: "#D4EBFF",
    300: "#B0D8FF",
    400: "#80C0FF",
    500: "#5098FF",
  },
  black: {
    100: "#F0F0F0",
    200: "#CCCCCC",
    300: "#999999",
    400: "#666666",
    500: "#333333",
  },
};
