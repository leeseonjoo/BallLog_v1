import React, { PropsWithChildren, ReactNode } from "react";
import {
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
  Text
} from "react-native";
import { theme } from "@mvvn/theme/theme";

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  scrollable?: boolean;
  headerRight?: ReactNode;
  contentContainerStyle?: ViewStyle;
}> & ViewProps;

export default function ScreenContainer({
  title,
  subtitle,
  scrollable = false,
  headerRight,
  style,
  children,
  contentContainerStyle,
  ...rest
}: Props) {
  const Container = scrollable ? ScrollView : View;
  const containerProps: ScrollViewProps | ViewProps = scrollable
    ? {
        contentContainerStyle: [styles.content, contentContainerStyle],
        showsVerticalScrollIndicator: false
      }
    : { style: [styles.content, contentContainerStyle] };

  return (
    <View style={[styles.root, style]} {...rest}>
      {(title || subtitle || headerRight) && (
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {headerRight ?? null}
        </View>
      )}
      <Container {...(containerProps as any)}>{children}</Container>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.hero,
    paddingBottom: theme.spacing.xl
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.display.fontSize,
    fontWeight: theme.typography.display.fontWeight
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize
  },
  content: {
    gap: theme.spacing.xl
  }
});
