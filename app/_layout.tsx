import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import Swatch from "@/components/swatch";
import { ColorSwatch } from "@/constants/Colors";
import { useMemo } from "react";
import { ThemedView } from "@/components/ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
