const socket = io.connect('http://localhost:3000')
const canvas = document.getElementById('main')

window.addEventListener('load', resizeCanvas)
window.addEventListener('resize', resizeCanvas)

init()

async function init() {
  // Draw simple text using CanvasKit (skia + webAssembly)
  const CanvasKit = CanvasKitInit({
    locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file
  }).ready()

  const surface = CanvasKit.MakeCanvasSurface('main')

  if (!surface) {
    throw new Error('Could not make surface')
  }

  const skcanvas = surface.getCanvas()
  // const paint = new CanvasKit.SkPaint();

  const textPaint = new CanvasKit.SkPaint()
  textPaint.setColor(CanvasKit.Color(40, 0, 0, 1.0))
  textPaint.setAntiAlias(true)

  const textFont = new CanvasKit.SkFont(null, 30)

  const context = CanvasKit.currentContext()

  function drawText() {
    CanvasKit.setCurrentContext(context)

    skcanvas.drawText('Try Clicking!', 60, 60, textPaint, textFont)
    skcanvas.flush()
    requestAnimationFrame(drawText)
  }
  requestAnimationFrame(drawText)
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
