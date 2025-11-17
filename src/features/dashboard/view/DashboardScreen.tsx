import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Section from "@shared/components/Section";
import PrimaryButton from "@shared/components/PrimaryButton";
import { theme } from "@core/theme";
import { useNavigation } from "@react-navigation/native";
import { useDashboardViewModel } from "../viewmodel/DashboardViewModel";
import type { RootStackParamList } from "@core/navigation/AppNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function DashboardScreen() {
  const { recent, summary } = useDashboardViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>볼로그</Text>

      <Section title="요약">
        <View style={styles.row}>
          <Stat label="최근 경기" value={summary.total} />
          <Stat label="골" value={summary.goals} />
          <Stat label="도움" value={summary.assists} />
          <Stat label="평점" value={summary.avgRating} />
        </View>
      </Section>

      <Section title="최근 기록">
        {recent.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {new Date(item.dateISO).toLocaleDateString()} • {item.location}
            </Text>
            <Text style={styles.cardMeta}>
              {item.durationMin}분 · {item.goals}골 {item.assists}도움 · 평점 {item.rating}
            </Text>
          </View>
        ))}
        {recent.length === 0 ? <Text style={styles.empty}>아직 기록이 없어요.</Text> : null}
      </Section>

      <PrimaryButton
        label="새 기록 작성"
        onPress={() => navigation.navigate("MatchEditor")}
        style={{ marginTop: theme.spacing.lg }}
      />
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    gap: theme.spacing.md
  },
  stat: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  statValue: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800"
  },
  statLabel: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "700",
    marginBottom: theme.spacing.xs
  },
  cardMeta: {
    color: theme.colors.textSecondary
  },
  empty: {
    color: theme.colors.textSecondary
  }
});


