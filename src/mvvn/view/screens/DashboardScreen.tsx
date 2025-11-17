import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { theme } from "@mvvn/theme/theme";
import ScreenContainer from "@mvvn/view/components/ScreenContainer";
import SurfaceCard from "@mvvn/view/components/SurfaceCard";
import SectionHeader from "@mvvn/view/components/SectionHeader";
import PrimaryButton from "@mvvn/view/components/PrimaryButton";
import { useDashboardViewModel } from "@mvvn/viewmodel/dashboardViewModel";
import type { RootStackParamList, TabsParamList } from "@mvvn/navigation/AppNavigator";

type DashboardNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, "홈">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardNavigation>();
  const { summary, recent, insights } = useDashboardViewModel();

  return (
    <ScreenContainer
      title="볼로그"
      subtitle="폼과 루틴을 한 화면에서 관리하세요"
      scrollable
      headerRight={<PrimaryButton variant="ghost" label="기록" onPress={() => navigation.navigate("MatchEditor")} />}
    >
      <SurfaceCard style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>주간 요약</Text>
        <View style={styles.statGrid}>
          <StatItem label="총 경기" value={summary.total} />
          <StatItem label="골" value={summary.goals} />
          <StatItem label="도움" value={summary.assists} />
          <StatItem label="평점" value={summary.avgRating} />
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>누적 플레이 타임</Text>
          <Text style={styles.metaValue}>{summary.workload}분</Text>
        </View>
      </SurfaceCard>

      <SurfaceCard>
        <SectionHeader title="오늘의 인사이트" subtitle="폼과 루틴을 유지하기 위한 제안" />
        <View style={styles.chipList}>
          {insights.map(text => (
            <View key={text} style={styles.chip}>
              <Text style={styles.chipText}>{text}</Text>
            </View>
          ))}
        </View>
      </SurfaceCard>

      <SurfaceCard>
        <SectionHeader title="최근 경기" subtitle="카드를 눌러 상세 기록을 수정할 수 있어요" />
        <View style={{ gap: theme.spacing.sm }}>
          {recent.map(match => (
            <Pressable
              key={match.id}
              onPress={() => navigation.navigate("MatchEditor", { id: match.id })}
              style={({ pressed }) => [styles.matchRow, pressed && { opacity: 0.85 }]}
            >
              <View style={{ flex: 1, gap: theme.spacing.xs }}>
                <Text style={styles.matchTitle}>
                  {new Date(match.dateISO).toLocaleDateString()} · {match.location}
                </Text>
                <Text style={styles.matchMeta}>
                  {match.durationMin}분 • {match.goals}골 {match.assists}도움 • 평점 {match.rating}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{match.rating.toFixed(1)}</Text>
              </View>
            </Pressable>
          ))}
          {recent.length === 0 ? <Text style={styles.empty}>기록이 비어 있어요.</Text> : null}
        </View>
        <PrimaryButton
          label="전체 기록 보기"
          variant="ghost"
          onPress={() => navigation.navigate("기록")}
          style={{ marginTop: theme.spacing.md }}
        />
      </SurfaceCard>

      <PrimaryButton label="새 경기 기록" onPress={() => navigation.navigate("MatchEditor")} />
    </ScreenContainer>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: theme.colors.surfaceMuted,
    borderColor: theme.colors.border
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.heading.fontSize,
    fontWeight: "700",
    marginBottom: theme.spacing.sm
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm
  },
  statItem: {
    width: "47%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  statValue: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800"
  },
  statLabel: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary
  },
  metaRow: {
    marginTop: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  metaText: {
    color: theme.colors.textSecondary
  },
  metaValue: {
    color: theme.colors.textPrimary,
    fontWeight: "600"
  },
  chipList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  matchTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "700"
  },
  matchMeta: {
    color: theme.colors.textSecondary
  },
  badge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.accent
  },
  badgeText: {
    color: "#0F172A",
    fontWeight: "800"
  },
  empty: {
    color: theme.colors.textMuted
  }
});
