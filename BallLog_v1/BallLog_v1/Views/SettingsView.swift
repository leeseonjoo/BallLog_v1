import SwiftUI

struct SettingsView: View {
    @State private var notificationsEnabled: Bool = true
    
    var body: some View {
        VStack(alignment: .leading, spacing: AppTheme.Spacing.lg) {
            Text("설정")
                .font(.system(size: 24, weight: .bold))
                .foregroundColor(AppTheme.Colors.textPrimary)
            
            HStack {
                Text("알림")
                    .foregroundColor(AppTheme.Colors.textPrimary)
                    .font(.body)
                Spacer()
                Toggle("", isOn: $notificationsEnabled)
                    .labelsHidden()
            }
            .padding(AppTheme.Spacing.lg)
            .background(AppTheme.Colors.surface)
            .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.md).stroke(AppTheme.Colors.border, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
            
            Spacer()
        }
        .padding(AppTheme.Spacing.xl)
        .background(AppTheme.Colors.background.ignoresSafeArea())
    }
}


