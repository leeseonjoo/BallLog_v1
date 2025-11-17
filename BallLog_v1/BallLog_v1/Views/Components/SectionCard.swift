import SwiftUI

struct SectionCard<Content: View>: View {
    let title: String?
    @ViewBuilder let content: Content
    
    init(title: String? = nil, @ViewBuilder content: () -> Content) {
        self.title = title
        self.content = content()
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: AppTheme.Spacing.md) {
            if let title {
                Text(title)
                    .font(.headline)
                    .foregroundColor(AppTheme.Colors.textPrimary)
            }
            VStack(alignment: .leading, spacing: AppTheme.Spacing.sm) {
                content
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(AppTheme.Spacing.lg)
        .background(AppTheme.Colors.surface)
        .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.lg).stroke(AppTheme.Colors.border, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.lg))
    }
}


