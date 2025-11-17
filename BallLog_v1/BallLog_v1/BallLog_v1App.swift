//
//  BallLog_v1App.swift
//  BallLog_v1
//
//  Created by 이선주 on 11/17/25.
//

import SwiftUI
import SwiftData

@main
struct BallLog_v1App: App {
    @StateObject private var deps = AppDependencies()
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            SplashView()
        }
        .modelContainer(sharedModelContainer)
    }
}
