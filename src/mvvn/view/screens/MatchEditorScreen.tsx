import React, { useMemo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { theme } from "@mvvn/theme/theme";
import ScreenContainer from "@mvvn/view/components/ScreenContainer";
import SurfaceCard from "@mvvn/view/components/SurfaceCard";
import TextField from "@mvvn/view/components/TextField";
import PrimaryButton from "@mvvn/view/components/PrimaryButton";
import { useMatchEditorViewModel } from "@mvvn/viewmodel/matchLogViewModel";
import type { RootStackParamList } from "@mvvn/navigation/AppNavigator";

export default function MatchEditorScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "MatchEditor">>();
  const id = route.params?.id;
  const { draft, update, save, loading } = useMatchEditorViewModel(id);
  const title = useMemo(() => (id ? "기록 수정" : "새 경기 기록"), [id]);

  const handleSave = async () => {
    try {
      await save();
      // @ts-ignore
      navigation.goBack();
    } catch (error) {
      Alert.alert("저장 실패", "기록 저장 중 문제가 발생했어요.");
    }
  };

  if (!draft) {
    return <ScreenContainer title={title} subtitle="기록을 불러오는 중입니다" />;
  }

  return (
    <ScreenContainer title={title} subtitle="경기 정보를 빠짐없이 적어 주세요" scrollable>
      <SurfaceCard>
        <Text style={styles.sectionTitle}>경기 정보</Text>
        <View style={styles.formGrid}>
          <TextField label="일시" value={new Date(draft.dateISO).toLocaleString()} editable={false} />
          <TextField
            label="장소"
            placeholder="예) 서울 ○○풋살장"
            value={draft.location}
            onChangeText={text => update("location", text)}
          />
          <TextField
            label="플레이 시간(분)"
            keyboardType="number-pad"
            value={String(draft.durationMin)}
            onChangeText={text => update("durationMin", parseInt(text || "0", 10))}
          />
        </View>
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.sectionTitle}>기록 지표</Text>
        <View style={styles.formGrid}>
          <TextField
            label="골"
            keyboardType="number-pad"
            value={String(draft.goals)}
            onChangeText={text => update("goals", parseInt(text || "0", 10))}
          />
          <TextField
            label="도움"
            keyboardType="number-pad"
            value={String(draft.assists)}
            onChangeText={text => update("assists", parseInt(text || "0", 10))}
          />
          <TextField
            label="평점 (1-10)"
            keyboardType="number-pad"
            value={String(draft.rating)}
            onChangeText={text => update("rating", parseInt(text || "0", 10))}
          />
        </View>
        <TextField
          label="메모"
          placeholder="플레이 포지션, 전술 메모 등"
          value={draft.memo}
          onChangeText={text => update("memo", text)}
          multiline
          style={styles.memo}
        />
      </SurfaceCard>

      <PrimaryButton label="기록 저장" onPress={handleSave} disabled={loading} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "700",
    marginBottom: theme.spacing.md
  },
  formGrid: {
    gap: theme.spacing.md
  },
  memo: {
    minHeight: 120,
    textAlignVertical: "top"
  }
});
