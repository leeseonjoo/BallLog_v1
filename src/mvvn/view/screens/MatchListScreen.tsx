import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { theme } from "@mvvn/theme/theme";
import ScreenContainer from "@mvvn/view/components/ScreenContainer";
import SurfaceCard from "@mvvn/view/components/SurfaceCard";
import PrimaryButton from "@mvvn/view/components/PrimaryButton";
import { useMatchListViewModel } from "@mvvn/viewmodel/matchLogViewModel";
import type { RootStackParamList, TabsParamList } from "@mvvn/navigation/AppNavigator";

type MatchListNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, "기록">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function MatchListScreen() {
  const navigation = useNavigation<MatchListNavigation>();
  const { items, remove } = useMatchListViewModel();

  const confirmRemove = (id: string) => {
    Alert.alert("기록 삭제", "선택한 기록을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => remove(id)
      }
    ]);
  };

  return (
    <ScreenContainer
      title="기록"
      subtitle="경기 흐름을 타임라인으로 확인하세요"
      scrollable
      headerRight={<PrimaryButton variant="ghost" label="추가" onPress={() => navigation.navigate("MatchEditor")} />}
    >
      <SurfaceCard>
        <View style={styles.timeline}>
          {items.map((item, index) => (
            <View key={item.id} style={styles.timelineRow}>
              <View style={styles.timelineIndicator}>
                <View style={styles.timelineDot} />
                {index !== items.length - 1 ? <View style={styles.timelineBar} /> : null}
              </View>
              <Pressable
                style={({ pressed }) => [styles.matchCard, pressed && { opacity: 0.9 }]}
                onPress={() => navigation.navigate("MatchEditor", { id: item.id })}
              >
                <Text style={styles.matchDate}>{new Date(item.dateISO).toLocaleDateString()}</Text>
                <Text style={styles.matchTitle}>{item.location}</Text>
                <Text style={styles.matchMeta}>
                  {item.durationMin}분 · {item.goals}골 {item.assists}도움 · 평점 {item.rating}
                </Text>
                <View style={styles.cardActions}>
                  <PrimaryButton
                    label="수정"
                    variant="ghost"
                    onPress={() => navigation.navigate("MatchEditor", { id: item.id })}
                    style={{ flex: 1 }}
                  />
                  <PrimaryButton
                    label="삭제"
                    variant="ghost"
                    onPress={() => confirmRemove(item.id)}
                    style={[{ flex: 1 }, styles.deleteButton]}
                  />
                </View>
              </Pressable>
            </View>
          ))}
          {items.length === 0 ? <Text style={styles.empty}>아직 기록이 없어요.</Text> : null}
        </View>
      </SurfaceCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  timeline: {
    gap: theme.spacing.lg
  },
  timelineRow: {
    flexDirection: "row",
    gap: theme.spacing.md
  },
  timelineIndicator: {
    width: 20,
    alignItems: "center"
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary
  },
  timelineBar: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.xs
  },
  matchCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.xs
  },
  matchDate: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize
  },
  matchTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "700"
  },
  matchMeta: {
    color: theme.colors.textSecondary
  },
  cardActions: {
    marginTop: theme.spacing.md,
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  deleteButton: {
    borderColor: theme.colors.danger
  },
  empty: {
    color: theme.colors.textMuted
  }
});
