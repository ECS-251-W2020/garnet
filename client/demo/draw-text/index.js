const socket = io()
const form = document.querySelector('form')
const input = document.querySelector('input')
const canvas = document.getElementById('main')

form.addEventListener('submit', onSubmit)
window.addEventListener('load', resizeCanvas)
window.addEventListener('resize', resizeCanvas)

init()

let x = 60
let y = 60

// Draw simple text using CanvasKit (skia + webAssembly)
async function init() {
  const CanvasKit = await CanvasKitInit({
    locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file
  }).ready()
  const surface = CanvasKit.MakeCanvasSurface('main')

  if (!surface) {
    throw new Error('Could not make surface')
  }

  socket.emit('message', {
    text: 'Hi there, welcome to the chat room!',
    x,
    y,
    fontSize: 20
  })

  y += 50

  socket.emit('message', {
    text: 'All messages are rendered by the WebAssembly build of Skia.',
    x,
    y,
    fontSize: 20
  })

  socket.on('message', drawText)

  const skCanvas = surface.getCanvas()
  let skFont, skPaint
  let drawCommands = ''

  function drawText(commands) {
    console.info('=== Draw Commands === \n' + commands)

    drawCommands += commands

    // Execute draw commands
    eval(drawCommands)

    skCanvas.flush()
  }
}

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
