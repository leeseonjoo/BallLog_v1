import SwiftUI

struct MatchLogListView: View {
    @StateObject var viewModel: MatchLogListViewModel
    @EnvironmentObject var deps: AppDependencies
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: AppTheme.Spacing.lg) {
                Text("매치 기록")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(AppTheme.Colors.textPrimary)
                
                VStack(spacing: AppTheme.Spacing.sm) {
                    ForEach(viewModel.items) { item in
                        HStack(alignment: .center, spacing: AppTheme.Spacing.md) {
                            VStack(alignment: .leading, spacing: 6) {
                                Text("\(item.date.formatted(date: .abbreviated, time: .omitted)) • \(item.location)")
                                    .foregroundColor(AppTheme.Colors.textPrimary)
                                    .fontWeight(.semibold)
                                Text("\(item.durationMin)분 · \(item.goals)골 \(item.assists)도움 · 평점 \(item.rating)")
                                    .foregroundColor(AppTheme.Colors.textSecondary)
                            }
                            Spacer()
                            NavigationLink {
                                MatchEditorView(viewModel: .init(repository: deps.matchRepository, id: item.id))
                            } label: {
                                Image(systemName: "chevron.right")
                                    .foregroundColor(AppTheme.Colors.textSecondary)
                            }
                            Button {
                                withAnimation { viewModel.remove(item.id) }
                            } label: {
                                Text("삭제")
                                    .fontWeight(.bold)
                                    .foregroundColor(AppTheme.Colors.danger)
                            }
                            .buttonStyle(.plain)
                        }
                        .padding(AppTheme.Spacing.md)
                        .background(AppTheme.Colors.surface)
                        .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.md).stroke(AppTheme.Colors.border, lineWidth: 1))
                        .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
                    }
                    
                    if viewModel.items.isEmpty {
                        Text("아직 기록이 없어요.")
                            .foregroundColor(AppTheme.Colors.textSecondary)
                            .frame(maxWidth: .infinity, alignment: .leading)
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
        .onAppear { viewModel.reload() }
    }
}


