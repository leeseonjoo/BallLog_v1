import SwiftUI

struct AppTheme {
    struct Colors {
        static let background = Color(hex: "#0F1115")
        static let surface = Color(hex: "#171A20")
        static let primary = Color(hex: "#6EE7B7")
        static let primaryMuted = Color(hex: "#3AAE8E")
        static let textPrimary = Color(hex: "#F5F7FA")
        static let textSecondary = Color(hex: "#B8C0CC")
        static let border = Color(hex: "#2A2F3A")
        static let danger = Color(hex: "#F87171")
    }
    
    struct Spacing {
        static let xxs: CGFloat = 4
        static let xs: CGFloat = 8
        static let sm: CGFloat = 12
        static let md: CGFloat = 16
        static let lg: CGFloat = 20
        static let xl: CGFloat = 24
        static let xxl: CGFloat = 32
    }
    
    struct Radius {
        static let sm: CGFloat = 8
        static let md: CGFloat = 12
        static let lg: CGFloat = 16
        static let pill: CGFloat = 999
    }
}

extension Color {
    init(hex: String) {
        var hexString = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        if hexString.hasPrefix("#") { hexString.removeFirst() }
        var rgbValue: UInt64 = 0
        Scanner(string: hexString).scanHexInt64(&rgbValue)
        let r, g, b: Double
        if hexString.count == 6 {
            r = Double((rgbValue & 0xFF0000) >> 16) / 255.0
            g = Double((rgbValue & 0x00FF00) >> 8) / 255.0
            b = Double(rgbValue & 0x0000FF) / 255.0
        } else {
            r = 1; g = 1; b = 1
        }
        self.init(red: r, green: g, blue: b)
    }
}


