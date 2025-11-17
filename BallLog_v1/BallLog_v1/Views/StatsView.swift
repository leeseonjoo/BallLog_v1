import SwiftUI

struct StatsView: View {
    @StateObject var viewModel: StatsViewModel
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: AppTheme.Spacing.lg) {
                Text("통계")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(AppTheme.Colors.textPrimary)
                
                HStack(spacing: AppTheme.Spacing.md) {
                    Metric(label: "총 경기", value: "\(viewModel.total)")
                    Metric(label: "총 골", value: "\(viewModel.goals)")
                }
                HStack(spacing: AppTheme.Spacing.md) {
                    Metric(label: "총 도움", value: "\(viewModel.assists)")
                    Metric(label: "평균 평점", value: String(format: "%.1f", viewModel.avgRating))
                }
            }
            .padding(AppTheme.Spacing.xl)
        }
        .background(AppTheme.Colors.background.ignoresSafeArea())
        .onAppear { viewModel.reload() }
    }
}

private struct Metric: View {
    let label: String
    let value: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(value)
                .font(.system(size: 22, weight: .heavy))
                .foregroundColor(AppTheme.Colors.textPrimary)
            Text(label)
                .foregroundColor(AppTheme.Colors.textSecondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(AppTheme.Spacing.lg)
        .background(AppTheme.Colors.surface)
        .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.md).stroke(AppTheme.Colors.border, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
    }
}


