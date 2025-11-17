import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import ScreenContainer from "@mvvn/view/components/ScreenContainer";
import SurfaceCard from "@mvvn/view/components/SurfaceCard";
import SectionHeader from "@mvvn/view/components/SectionHeader";
import PrimaryButton from "@mvvn/view/components/PrimaryButton";
import { theme } from "@mvvn/theme/theme";

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <ScreenContainer title="설정" subtitle="나에게 맞는 경험을 구성하세요" scrollable>
      <SurfaceCard>
        <SectionHeader title="환경" />
        <SettingRow label="알림" description="새 기록 리마인더 받기">
          <Switch value={notifications} onValueChange={setNotifications} />
        </SettingRow>
        <SettingRow label="다크 모드" description="시각 피로도를 줄여요">
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </SettingRow>
      </SurfaceCard>

      <SurfaceCard>
        <SectionHeader title="계정" />
        <Pressable style={styles.menuRow}>
          <Text style={styles.menuTitle}>백업 내보내기</Text>
          <Text style={styles.menuDescription}>CSV로 내보내기</Text>
        </Pressable>
        <Pressable style={styles.menuRow}>
          <Text style={styles.menuTitle}>문의하기</Text>
          <Text style={styles.menuDescription}>팀에게 피드백 보내기</Text>
        </Pressable>
      </SurfaceCard>

      <PrimaryButton label="로그아웃" variant="ghost" onPress={() => {}} />
    </ScreenContainer>
  );
}

type SettingRowProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description ? <Text style={styles.settingDescription}>{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  settingLabel: {
    color: theme.colors.textPrimary,
    fontWeight: "600"
  },
  settingDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
    marginTop: theme.spacing.xs
  },
  menuRow: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  menuTitle: {
    color: theme.colors.textPrimary,
    fontWeight: "600"
  },
  menuDescription: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.caption.fontSize
  }
});
