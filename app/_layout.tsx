import { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TankStackProvider from "@/context/TankStackQuery";
import { View, Text } from "react-native";
import { fonts } from "@/constants/fonts";
import ThemeAwareStatusBar from "@/components/StatusBar";

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = { fontFamily: fonts.regular };

function StackNavigator() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#000F24" : "#fff",
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="country/[id]"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Axiforma-Black": require("../assets/fonts/Axiforma-Black.otf"),
    "Axiforma-Bold": require("../assets/fonts/Axiforma-Bold.otf"),
    "Axiforma-Regular": require("../assets/fonts/Axiforma-Regular.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TankStackProvider>
      <ThemeProvider>
        <StackNavigator />
        <ThemeAwareStatusBar />
      </ThemeProvider>
    </TankStackProvider>
  );
}
