import Foundation

protocol MatchRepository {
    func list() -> [Match]
    func get(_ id: UUID) -> Match?
    func upsert(_ match: Match)
    func remove(_ id: UUID)
}

final class InMemoryMatchRepository: MatchRepository {
    private var items: [Match] = []
    
    init(seed: [Match]? = nil) {
        if let seed, !seed.isEmpty {
            self.items = seed
        } else {
            let now = Date()
            self.items = [
                Match(
                    id: UUID(),
                    date: Calendar.current.date(bySettingHour: 20, minute: 0, second: 0, of: now) ?? now,
                    location: "서울 ○○풋살장 A코트",
                    durationMin: 90,
                    goals: 2,
                    assists: 1,
                    rating: 7,
                    memo: "오랜만에 몸 풀림"
                )
            ]
        }
    }
    
    func list() -> [Match] {
        items.sorted { $0.date > $1.date }
    }
    
    func get(_ id: UUID) -> Match? {
        items.first(where: { $0.id == id })
    }
    
    func upsert(_ match: Match) {
        if let idx = items.firstIndex(where: { $0.id == match.id }) {
            items[idx] = match
        } else {
            items.append(match)
        }
    }
    
    func remove(_ id: UUID) {
        items.removeAll(where: { $0.id == id })
    }
}


