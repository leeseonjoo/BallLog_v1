import SwiftUI

struct SplashView: View {
    @StateObject var viewModel = SplashViewModel()
    
    var body: some View {
        ZStack {
            Color.white.ignoresSafeArea()
            StrokedText(
                "Ball: log",
                fontName: "Inter-ExtraBold",
                size: 48,
                fillColor: UIColor(red: 0xF1/255.0, green: 0xDB/255.0, blue: 0xAA/255.0, alpha: 1.0),
                strokeColor: UIColor(red: 0xFA/255.0, green: 0xF9/255.0, blue: 0xF6/255.0, alpha: 1.0),
                lineWidth: 5,
                alignment: .center
            )
            .padding(.horizontal, 24)
        }
    }
}


