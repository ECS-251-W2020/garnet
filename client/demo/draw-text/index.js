const socket = io()
const form = document.querySelector('form')
const input = document.querySelector('input')
const canvas = document.getElementById('main')

form.addEventListener('submit', onSubmit)
window.addEventListener('load', resizeCanvas)
window.addEventListener('resize', resizeCanvas)

let x = 100
let y = 100

// draw simple text using CanvasKit (skia + webAssembly)
CanvasKitInit({
  locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file
})
  .ready()
  .then(CanvasKit => {
    socket.on('message', drawText)

    const surface = CanvasKit.MakeCanvasSurface('main')

    if (!surface) {
      throw new Error('Could not make surface')
    }

    const skCanvas = surface.getCanvas()
    const skFont = new CanvasKit.SkFont(null, 18)
    const skPaint = new CanvasKit.SkPaint()
    let drawCommands = ''

    function drawText(commands) {
      drawCommands += commands
      eval(drawCommands)
    }
  })

function onSubmit(event) {
  event.preventDefault()
  y += 50
  socket.emit('message', { text: input.value, x, y })
  input.value = ''
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
