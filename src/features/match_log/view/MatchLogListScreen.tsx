import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { theme } from "@core/theme";
import { useMatchLogViewModel } from "../viewmodel/MatchLogViewModel";
import PrimaryButton from "@shared/components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "@core/navigation/AppNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function MatchLogListScreen() {
  const { items, remove } = useMatchLogViewModel();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>매치 기록</Text>

      <View style={{ gap: theme.spacing.sm }}>
        {items.map(item => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate("MatchEditor", { id: item.id })}
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.9 }]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>
                {new Date(item.dateISO).toLocaleDateString()} • {item.location}
              </Text>
              <Text style={styles.itemMeta}>
                {item.durationMin}분 · {item.goals}골 {item.assists}도움 · 평점 {item.rating}
              </Text>
            </View>
            <Pressable onPress={() => remove(item.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>삭제</Text>
            </Pressable>
          </Pressable>
        ))}
        {items.length === 0 ? <Text style={styles.empty}>아직 기록이 없어요.</Text> : null}
      </View>

      <PrimaryButton
        label="새 기록 작성"
        onPress={() => navigation.navigate("MatchEditor")}
        style={{ marginTop: theme.spacing.lg }}
      />
    </ScrollView>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  itemTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "700",
    marginBottom: theme.spacing.xs
  },
  itemMeta: {
    color: theme.colors.textSecondary
  },
  empty: {
    color: theme.colors.textSecondary
  },
  deleteBtn: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  deleteText: {
    color: theme.colors.danger,
    fontWeight: "700"
  }
});


