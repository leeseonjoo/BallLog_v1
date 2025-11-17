import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { theme } from "@mvvn/theme/theme";

type Props = TextInputProps & {
  label?: string;
  hint?: string;
};

export default function TextField({ label, hint, style, ...rest }: Props) {
  return (
    <View style={styles.root}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, style]}
        {...rest}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: theme.spacing.xs
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.label.fontSize
  },
  input: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md
  },
  hint: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.caption.fontSize
  }
});
