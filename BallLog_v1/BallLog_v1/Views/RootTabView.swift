import SwiftUI

struct RootTabView: View {
    @EnvironmentObject var deps: AppDependencies
    
    var body: some View {
        TabView {
            NavigationStack {
                DashboardView(viewModel: .init(repository: deps.matchRepository))
            }
            .tabItem { Label("홈", systemImage: "house.fill") }
            
            NavigationStack {
                MatchLogListView(viewModel: .init(repository: deps.matchRepository))
            }
            .tabItem { Label("기록", systemImage: "list.bullet.rectangle") }
            
            NavigationStack {
                StatsView(viewModel: .init(repository: deps.matchRepository))
            }
            .tabItem { Label("통계", systemImage: "chart.bar.fill") }
            
            NavigationStack {
                SettingsView()
            }
            .tabItem { Label("설정", systemImage: "gearshape.fill") }
        }
        .tint(AppTheme.Colors.primary)
        .background(AppTheme.Colors.background.ignoresSafeArea())
    }
}


