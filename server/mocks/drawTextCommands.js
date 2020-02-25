// Construct commands to draw the input text string
const commands = (text, x, y) => `
  skPaint.setStyle(CanvasKit.PaintStyle.Fill)
  skPaint.setAntiAlias(true)
  skCanvas.drawText('${text}', ${x}, ${y}, skPaint, skFont)
  skCanvas.flush()
`

module.exports = commands
