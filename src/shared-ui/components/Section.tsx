import React, { PropsWithChildren } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { theme } from "@core/theme";

type Props = PropsWithChildren<{
  title?: string;
  style?: ViewStyle;
}>;

export default function Section({ title, style, children }: Props) {
  return (
    <View style={[styles.root, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight
  },
  body: {
    gap: theme.spacing.sm
  }
});


