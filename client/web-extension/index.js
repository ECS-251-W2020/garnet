const socket = io.connect('http://localhost:3000')
const url = 'https://en.wikipedia.org/wiki/Operating_system'

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
  let skFont, skPaint

  // Draw loading message
  skFont = new CanvasKit.SkFont(null, 20)
  skPaint = new CanvasKit.SkPaint()
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
