// Construct commands to draw the input text string
const commands = ({ text, x, y, fontSize = 16 }) => `
  skFont = new CanvasKit.SkFont(null, ${fontSize})
  skPaint = new CanvasKit.SkPaint()
  skPaint.setStyle(CanvasKit.PaintStyle.Fill)
  skPaint.setAntiAlias(true)
  skCanvas.drawText('${text}', ${x}, ${y}, skPaint, skFont)
`

module.exports = commands
