export const theme = {
  colors: {
    background: "#05070B",
    surface: "#0F1118",
    surfaceMuted: "#1B1F2A",
    primary: "#5AE8C9",
    primaryStrong: "#2DD4BF",
    accent: "#60A5FA",
    accentMuted: "#4C1D95",
    textPrimary: "#F1F5F9",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
    border: "#262B38",
    highlight: "#FDE047",
    danger: "#FB7185"
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    hero: 40
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999
  },
  typography: {
    display: { fontSize: 32, fontWeight: "700" as const, lineHeight: 38 },
    title: { fontSize: 24, fontWeight: "700" as const, lineHeight: 30 },
    heading: { fontSize: 18, fontWeight: "600" as const, lineHeight: 24 },
    body: { fontSize: 16, fontWeight: "500" as const, lineHeight: 22 },
    label: { fontSize: 14, fontWeight: "600" as const, lineHeight: 18 },
    caption: { fontSize: 12, fontWeight: "500" as const, lineHeight: 16 }
  }
};
