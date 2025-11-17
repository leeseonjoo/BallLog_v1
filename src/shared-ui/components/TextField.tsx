import React from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import { theme } from "@core/theme";

type Props = TextInputProps & {
  label?: string;
  hint?: string;
};

export default function TextField({ label, hint, ...rest }: Props) {
  return (
    <View style={styles.root}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput placeholderTextColor={theme.colors.textSecondary} style={styles.input} {...rest} />
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
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md
  },
  hint: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize
  }
});


