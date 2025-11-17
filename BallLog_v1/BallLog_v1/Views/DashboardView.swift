import SwiftUI

struct DashboardView: View {
    @StateObject var viewModel: DashboardViewModel
    @EnvironmentObject var deps: AppDependencies
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: AppTheme.Spacing.lg) {
                Text("볼로그")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(AppTheme.Colors.textPrimary)
                
                SectionCard(title: "요약") {
                    HStack(spacing: AppTheme.Spacing.md) {
                        StatTile(label: "최근 경기", value: "\(viewModel.total)")
                        StatTile(label: "골", value: "\(viewModel.goals)")
                        StatTile(label: "도움", value: "\(viewModel.assists)")
                        StatTile(label: "평점", value: String(format: "%.1f", viewModel.avgRating))
                    }
                }
                
                SectionCard(title: "최근 기록") {
                    if viewModel.recent.isEmpty {
                        Text("아직 기록이 없어요.")
                            .foregroundColor(AppTheme.Colors.textSecondary)
                    } else {
                        VStack(spacing: AppTheme.Spacing.sm) {
                            ForEach(viewModel.recent) { item in
                                VStack(alignment: .leading, spacing: 6) {
                                    Text("\(item.date.formatted(date: .abbreviated, time: .omitted)) • \(item.location)")
                                        .foregroundColor(AppTheme.Colors.textPrimary)
                                        .fontWeight(.semibold)
                                    Text("\(item.durationMin)분 · \(item.goals)골 \(item.assists)도움 · 평점 \(item.rating)")
                                        .foregroundColor(AppTheme.Colors.textSecondary)
                                }
                                .padding(AppTheme.Spacing.md)
                                .background(AppTheme.Colors.background)
                                .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.md).stroke(AppTheme.Colors.border, lineWidth: 1))
                                .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
                            }
                        }
                    }
                }
                
                NavigationLink {
                    MatchEditorView(viewModel: .init(repository: deps.matchRepository))
                } label: {
                    Text("새 기록 작성")
                        .fontWeight(.bold)
                        .foregroundColor(Color.black)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, AppTheme.Spacing.md)
                        .background(AppTheme.Colors.primary)
                        .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
                }
                .buttonStyle(.plain)
            }
            .padding(AppTheme.Spacing.xl)
        }
        .background(AppTheme.Colors.background.ignoresSafeArea())
    }
}

private struct StatTile: View {
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


