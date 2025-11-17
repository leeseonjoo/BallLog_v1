import SwiftUI
import UIKit

struct StrokedText: UIViewRepresentable {
    let text: String
    let fontName: String
    let size: CGFloat
    let fillColor: UIColor
    let strokeColor: UIColor
    let lineWidth: CGFloat
    let alignment: NSTextAlignment
    
    init(_ text: String,
         fontName: String = "Inter-ExtraBold",
         size: CGFloat,
         fillColor: UIColor,
         strokeColor: UIColor,
         lineWidth: CGFloat,
         alignment: NSTextAlignment = .center) {
        self.text = text
        self.fontName = fontName
        self.size = size
        self.fillColor = fillColor
        self.strokeColor = strokeColor
        self.lineWidth = lineWidth
        self.alignment = alignment
    }
    
    func makeUIView(context: Context) -> UILabel {
        let label = UILabel()
        label.numberOfLines = 0
        label.textAlignment = alignment
        label.adjustsFontSizeToFitWidth = false
        label.attributedText = makeAttributedText()
        return label
    }
    
    func updateUIView(_ uiView: UILabel, context: Context) {
        uiView.textAlignment = alignment
        uiView.attributedText = makeAttributedText()
    }
    
    private func makeAttributedText() -> NSAttributedString {
        let font = UIFont(name: fontName, size: size) ?? UIFont.systemFont(ofSize: size, weight: .heavy)
        let attributes: [NSAttributedString.Key: Any] = [
            .font: font,
            .foregroundColor: fillColor,
            .strokeColor: strokeColor,
            // Negative value draws fill + outer stroke; absolute value is stroke thickness in points
            .strokeWidth: -lineWidth
        ]
        return NSAttributedString(string: text, attributes: attributes)
    }
}


