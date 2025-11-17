import React from "react";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "@core/navigation/AppNavigator";
import { theme } from "@core/theme";

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    primary: theme.colors.primary,
    text: theme.colors.textPrimary,
    card: theme.colors.surface
  }
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}


