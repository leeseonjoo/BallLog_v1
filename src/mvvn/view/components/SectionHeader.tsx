import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@mvvn/theme/theme";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: theme.spacing.xs
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize
  }
});
