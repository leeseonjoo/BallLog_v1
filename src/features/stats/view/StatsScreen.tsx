import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "@core/theme";
import { useStatsViewModel } from "../viewmodel/StatsViewModel";

export default function StatsScreen() {
  const { stats } = useStatsViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>통계</Text>
      <View style={styles.grid}>
        <Metric label="총 경기" value={String(stats.total)} />
        <Metric label="총 골" value={String(stats.goals)} />
        <Metric label="총 도움" value={String(stats.assists)} />
        <Metric label="평균 평점" value={String(stats.avgRating)} />
      </View>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md
  },
  metric: {
    width: "47%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  metricValue: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800"
  },
  metricLabel: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs
  }
});


