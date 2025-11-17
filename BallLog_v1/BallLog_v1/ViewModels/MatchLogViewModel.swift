import Foundation

final class MatchLogListViewModel: ObservableObject {
    @Published private(set) var items: [Match] = []
    private let repository: MatchRepository
    
    init(repository: MatchRepository) {
        self.repository = repository
        reload()
    }
    
    func reload() {
        items = repository.list()
    }
    
    func remove(_ id: UUID) {
        repository.remove(id)
        reload()
    }
}

final class MatchEditorViewModel: ObservableObject {
    @Published var draft: Match
    private let repository: MatchRepository
    
    init(repository: MatchRepository, id: UUID? = nil) {
        self.repository = repository
        if let id, let found = repository.get(id) {
            self.draft = found
        } else {
            self.draft = Match(id: UUID(), date: Date(), location: "", durationMin: 90, goals: 0, assists: 0, rating: 7, memo: "")
        }
    }
    
    func save() {
        repository.upsert(draft)
    }
}


