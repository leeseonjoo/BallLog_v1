import Foundation
import SwiftUI

final class AppDependencies: ObservableObject {
    let matchRepository: MatchRepository
    
    init(matchRepository: MatchRepository = InMemoryMatchRepository()) {
        self.matchRepository = matchRepository
    }
}


