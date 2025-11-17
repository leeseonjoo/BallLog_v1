import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "@features/dashboard/view/DashboardScreen";
import MatchLogListScreen from "@features/match_log/view/MatchLogListScreen";
import MatchEditorScreen from "@features/match_log/view/MatchEditorScreen";
import StatsScreen from "@features/stats/view/StatsScreen";
import SettingsScreen from "@features/settings/view/SettingsScreen";
import { theme } from "@core/theme";
import { Text } from "react-native";

export type RootStackParamList = {
  Tabs: undefined;
  MatchEditor: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary
      }}
    >
      <Tab.Screen
        name="홈"
        component={DashboardScreen}
        options={{ tabBarLabel: "홈" }}
      />
      <Tab.Screen
        name="기록"
        component={MatchLogListScreen}
        options={{ tabBarLabel: "기록" }}
      />
      <Tab.Screen
        name="통계"
        component={StatsScreen}
        options={{ tabBarLabel: "통계" }}
      />
      <Tab.Screen
        name="설정"
        component={SettingsScreen}
        options={{ tabBarLabel: "설정" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        contentStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="MatchEditor"
        component={MatchEditorScreen}
        options={{ title: "매치 기록" }}
      />
    </Stack.Navigator>
  );
}


