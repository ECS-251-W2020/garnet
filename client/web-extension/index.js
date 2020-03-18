const socket = io.connect('http://localhost:3000')
const url = 'https://duckduckgo.com/?t=ffab&q=operating+system&ia=web'

init()

async function init() {
  const CanvasKit = await CanvasKitInit({
    locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file
  }).ready()

  const surface = CanvasKit.MakeCanvasSurface('main')

  if (!surface) {
    throw new Error('Could not make surface')
  }

  // Send URL to server
  socket.emit('ready', url)

  // When a set of draw commands are ready
  socket.on('draw', drawCommands)

  // When all draw commands have completed
  socket.on('done', () => skCanvas.flush())

  const skCanvas = surface.getCanvas()
  const skFont = new CanvasKit.SkFont(null, 14)
  const skPaint = new CanvasKit.SkPaint()

  // Draw loading message
  skPaint.setStyle(CanvasKit.PaintStyle.Fill)
  skPaint.setAntiAlias(true)
  skCanvas.drawText(
    'Waiting for draw commands from server...',
    60,
    60,
    skPaint,
    skFont
  )
  skCanvas.flush()

  function drawCommands(commands) {
    console.log(commands)

    eval(commands)
  }
}
