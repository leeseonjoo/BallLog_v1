import Foundation

final class StatsViewModel: ObservableObject {
    @Published private(set) var total: Int = 0
    @Published private(set) var goals: Int = 0
    @Published private(set) var assists: Int = 0
    @Published private(set) var avgRating: Double = 0
    
    private let repository: MatchRepository
    
    init(repository: MatchRepository) {
        self.repository = repository
        reload()
    }
    
    func reload() {
        let list = repository.list()
        total = list.count
        goals = list.map(\.goals).reduce(0, +)
        assists = list.map(\.assists).reduce(0, +)
        if total > 0 {
            let sum = list.map(\.rating).reduce(0, +)
            avgRating = (Double(sum) / Double(total) * 10).rounded() / 10
        } else {
            avgRating = 0
        }
    }
}


