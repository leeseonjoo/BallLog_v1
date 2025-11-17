import SwiftUI

struct MatchEditorView: View {
    @StateObject var viewModel: MatchEditorViewModel
    @Environment(\.dismiss) private var dismiss
    
    @State private var location: String = ""
    @State private var duration: String = "90"
    @State private var goals: String = "0"
    @State private var assists: String = "0"
    @State private var rating: String = "7"
    @State private var memo: String = ""
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: AppTheme.Spacing.lg) {
                Text(viewModelTitle)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(AppTheme.Colors.textPrimary)
                
                inputs
                
                Button {
                    syncDraftToViewModel()
                    viewModel.save()
                    dismiss()
                } label: {
                    Text("저장")
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
        .onAppear {
            location = viewModel.draft.location
            duration = String(viewModel.draft.durationMin)
            goals = String(viewModel.draft.goals)
            assists = String(viewModel.draft.assists)
            rating = String(viewModel.draft.rating)
            memo = viewModel.draft.memo
        }
    }
    
    private var viewModelTitle: String {
        viewModel.draft.location.isEmpty ? "새 기록 작성" : "기록 수정"
    }
    
    private var inputs: some View {
        VStack(spacing: AppTheme.Spacing.md) {
            SectionCard(title: "기본 정보") {
                VStack(alignment: .leading, spacing: AppTheme.Spacing.sm) {
                    labeled("일시", value: viewModel.draft.date.formatted(date: .abbreviated, time: .shortened))
                    TextField("예) 서울 ○○풋살장 A코트", text: $location)
                        .keyboardType(.default)
                        .padding(.vertical, AppTheme.Spacing.md)
                        .padding(.horizontal, AppTheme.Spacing.md)
                        .background(AppTheme.Colors.surface)
                        .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.md).stroke(AppTheme.Colors.border, lineWidth: 1))
                        .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
                        .foregroundColor(AppTheme.Colors.textPrimary)
                }
            }
            
            SectionCard(title: "기록") {
                VStack(spacing: AppTheme.Spacing.sm) {
                    numberField("시간(분)", text: $duration)
                    HStack(spacing: AppTheme.Spacing.md) {
                        numberField("골", text: $goals)
                        numberField("도움", text: $assists)
                    }
                    numberField("평점(1~10)", text: $rating)
                }
            }
            
            SectionCard(title: "메모") {
                TextField("느낀 점, 포지션, 전술 메모 등", text: $memo, axis: .vertical)
                    .lineLimit(4, reservesSpace: true)
                    .foregroundColor(AppTheme.Colors.textPrimary)
            }
        }
    }
    
    private func labeled(_ label: String, value: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(label)
                .foregroundColor(AppTheme.Colors.textSecondary)
                .font(.subheadline)
            Text(value)
                .foregroundColor(AppTheme.Colors.textPrimary)
        }
    }
    
    private func numberField(_ label: String, text: Binding<String>) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(label)
                .foregroundColor(AppTheme.Colors.textSecondary)
                .font(.subheadline)
            TextField("", text: text)
                .keyboardType(.numberPad)
                .padding(.vertical, AppTheme.Spacing.md)
                .padding(.horizontal, AppTheme.Spacing.md)
                .background(AppTheme.Colors.surface)
                .overlay(RoundedRectangle(cornerRadius: AppTheme.Radius.md).stroke(AppTheme.Colors.border, lineWidth: 1))
                .clipShape(RoundedRectangle(cornerRadius: AppTheme.Radius.md))
                .foregroundColor(AppTheme.Colors.textPrimary)
        }
    }
    
    private func syncDraftToViewModel() {
        viewModel.draft.location = location
        viewModel.draft.durationMin = Int(duration) ?? 0
        viewModel.draft.goals = Int(goals) ?? 0
        viewModel.draft.assists = Int(assists) ?? 0
        viewModel.draft.rating = min(max(Int(rating) ?? 0, 1), 10)
        viewModel.draft.memo = memo
    }
}


