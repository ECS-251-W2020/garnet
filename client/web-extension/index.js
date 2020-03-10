const socket = io.connect('http://localhost:3000')

init()

async function init() {
  const CanvasKit = await CanvasKitInit({
    locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file
  }).ready()

  const surface = CanvasKit.MakeCanvasSurface('main')

  if (!surface) {
    throw new Error('Could not make surface')
  }

  const url = 'https://en.wikipedia.org/wiki/Operating_system'

  socket.emit('ready', url)
  socket.on('draw', drawCommands)
  socket.on('done', () => skCanvas.flush())

  const skCanvas = surface.getCanvas()
  let skFont, skPaint

  function drawCommands(commands) {
    console.log(commands)

    eval(commands)
  }
}
