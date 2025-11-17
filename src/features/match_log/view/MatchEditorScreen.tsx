import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "@core/theme";
import TextField from "@shared/components/TextField";
import PrimaryButton from "@shared/components/PrimaryButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "@core/navigation/AppNavigator";
import { useMatchEditorViewModel } from "../viewmodel/MatchLogViewModel";

export default function MatchEditorScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "MatchEditor">>();
  const id = route.params?.id;
  const { draft, update, save, loading } = useMatchEditorViewModel(id);
  const navigation = useNavigation();

  const title = useMemo(() => (id ? "기록 수정" : "새 기록 작성"), [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {draft ? (
        <View style={{ gap: theme.spacing.md }}>
          <TextField
            label="일시"
            value={new Date(draft.dateISO).toLocaleString()}
            editable={false}
          />
          <TextField
            label="장소"
            placeholder="예) 서울 ○○풋살장 A코트"
            value={draft.location}
            onChangeText={t => update("location", t)}
          />
          <TextField
            label="시간(분)"
            keyboardType="number-pad"
            value={String(draft.durationMin)}
            onChangeText={t => update("durationMin", parseInt(t || "0", 10))}
          />
          <View style={styles.row}>
            <TextField
              style={{ flex: 1 }}
              label="골"
              keyboardType="number-pad"
              value={String(draft.goals)}
              onChangeText={t => update("goals", parseInt(t || "0", 10))}
            />
            <TextField
              style={{ flex: 1 }}
              label="도움"
              keyboardType="number-pad"
              value={String(draft.assists)}
              onChangeText={t => update("assists", parseInt(t || "0", 10))}
            />
          </View>
          <TextField
            label="평점(1~10)"
            keyboardType="number-pad"
            value={String(draft.rating)}
            onChangeText={t => update("rating", parseInt(t || "0", 10))}
          />
          <TextField
            label="메모"
            placeholder="느낀 점, 포지션, 전술 메모 등"
            value={draft.memo}
            onChangeText={t => update("memo", t)}
            multiline
          />

          <PrimaryButton
            label="저장"
            onPress={async () => {
              await save();
              // @ts-ignore
              navigation.goBack();
            }}
            disabled={loading}
          />
        </View>
      ) : (
        <Text style={styles.empty}>로딩 중...</Text>
      )}
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
  row: {
    flexDirection: "row",
    gap: theme.spacing.md
  },
  empty: {
    color: theme.colors.textSecondary
  }
});


