import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import Swatch from "@/components/swatch";
import { ColorSwatch } from "@/constants/Colors";
import { useMemo } from "react";
import { ThemedView } from "@/components/ThemedView";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const colorArray = useMemo(
    () =>
      Object.values(ColorSwatch).map((colorGroup) => Object.values(colorGroup)),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <ThemedView style={{ flex: 1 }}>
          <Swatch colors={colorArray} />
        </ThemedView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
