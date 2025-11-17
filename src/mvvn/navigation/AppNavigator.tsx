import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "@mvvn/view/screens/DashboardScreen";
import MatchListScreen from "@mvvn/view/screens/MatchListScreen";
import MatchEditorScreen from "@mvvn/view/screens/MatchEditorScreen";
import StatsScreen from "@mvvn/view/screens/StatsScreen";
import SettingsScreen from "@mvvn/view/screens/SettingsScreen";
import { theme } from "@mvvn/theme/theme";

export type TabsParamList = {
  홈: undefined;
  기록: undefined;
  통계: undefined;
  설정: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  MatchEditor: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 4,
          height: 64
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted
      }}
    >
      <Tab.Screen name="홈" component={DashboardScreen} />
      <Tab.Screen name="기록" component={MatchListScreen} />
      <Tab.Screen name="통계" component={StatsScreen} />
      <Tab.Screen name="설정" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.textPrimary,
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="MatchEditor" component={MatchEditorScreen} options={{ title: "매치 기록" }} />
    </Stack.Navigator>
  );
}
