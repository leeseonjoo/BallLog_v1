import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { theme } from "@core/theme";

export default function SettingsScreen() {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
      <View style={styles.row}>
        <Text style={styles.label}>알림</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: "600"
  }
});


