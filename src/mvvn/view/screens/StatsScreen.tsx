import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "@mvvn/view/components/ScreenContainer";
import SurfaceCard from "@mvvn/view/components/SurfaceCard";
import SectionHeader from "@mvvn/view/components/SectionHeader";
import { useStatsViewModel } from "@mvvn/viewmodel/statsViewModel";
import { theme } from "@mvvn/theme/theme";

export default function StatsScreen() {
  const { stats, timeline } = useStatsViewModel();

  return (
    <ScreenContainer title="통계" subtitle="누적 지표와 컨디션 흐름">
      <SurfaceCard>
        <SectionHeader title="핵심 지표" subtitle="누적 데이터를 한 눈에" />
        <View style={styles.metricGrid}>
          <Metric label="총 경기" value={`${stats.total}회`} />
          <Metric label="총 골" value={`${stats.goals}골`} />
          <Metric label="총 도움" value={`${stats.assists}도움`} />
          <Metric label="평균 평점" value={stats.avgRating.toFixed(1)} />
          <Metric label="평균 시간" value={`${stats.avgDuration}분`} />
          <Metric label="생산성" value={`${stats.productivity}%`} />
        </View>
      </SurfaceCard>

      <SurfaceCard>
        <SectionHeader title="타임라인" subtitle="최근 경기별 결과" />
        <FlatList
          data={timeline}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
          renderItem={({ item }) => (
            <View style={styles.timelineCard}>
              <Text style={styles.timelineDate}>{new Date(item.dateISO).toLocaleDateString()}</Text>
              <Text style={styles.timelineTitle}>{item.location}</Text>
              <Text style={styles.timelineMeta}>
                {item.goals}골 {item.assists}도움 · 평점 {item.rating}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </SurfaceCard>
    </ScreenContainer>
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
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md
  },
  metric: {
    width: "47%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  metricValue: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800"
  },
  metricLabel: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary
  },
  timelineCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  timelineDate: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize
  },
  timelineTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "700",
    marginTop: theme.spacing.xs
  },
  timelineMeta: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs
  }
});
