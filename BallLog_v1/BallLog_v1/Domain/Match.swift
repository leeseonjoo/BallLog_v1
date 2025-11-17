import Foundation

struct Match: Identifiable, Equatable {
    var id: UUID
    var date: Date
    var location: String
    var durationMin: Int
    var goals: Int
    var assists: Int
    var rating: Int
    var memo: String
}


