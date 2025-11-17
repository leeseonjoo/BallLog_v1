import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { theme } from "@mvvn/theme/theme";

type Props = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: "primary" | "ghost";
  disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, style, variant = "primary", disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === "ghost" && styles.ghost,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.5 },
        style
      ]}
    >
      <Text style={[styles.label, variant === "ghost" && { color: theme.colors.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center"
  },
  ghost: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  label: {
    color: "#041005",
    fontWeight: "700",
    fontSize: theme.typography.body.fontSize
  }
});
