const socket = io()
const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener('submit', onSubmit)

socket.on('message', drawText)

function onSubmit (event) {
  event.preventDefault()
  socket.emit('message', input.value)
  input.value = ''
}

function drawText (data) {
  console.log(data)

  // TODO(pengcheng): replay drawText commands
}

// draw simple text using CanvasKit (skia + webAssembly)
CanvasKitInit({
  locateFile: file => '/node_modules/canvaskit-wasm/bin/' + file
})
  .ready()
  .then(CanvasKit => {
    let robotoData = null
    fetch(
      'https://storage.googleapis.com/skia-cdn/google-web-fonts/Roboto-Regular.ttf'
    ).then(resp => {
      resp.arrayBuffer().then(buffer => {
        robotoData = buffer
        requestAnimationFrame(drawFrame)
      })
    }) // fetch font

    const surface = CanvasKit.MakeCanvasSurface('main')
    if (!surface) {
      throw new Error('Could not make surface')
    }

    const skcanvas = surface.getCanvas()

    const font = new CanvasKit.SkFont(null, 18)
    const fontPaint = new CanvasKit.SkPaint()
    fontPaint.setStyle(CanvasKit.PaintStyle.Fill)
    fontPaint.setAntiAlias(true)

    skcanvas.drawText(`Fetching Font data...`, 5, 450, fontPaint, font)
    surface.flush()

    const context = CanvasKit.currentContext()

    let paragraph = null
    const str =
      'Our group project is to accomplish a new remote browser isolation system with the help of chromium engine.'

    function drawFrame () {
      if (robotoData && !paragraph) {
        const fontMgr = CanvasKit.SkFontMgr.FromData([robotoData])

        const paraStyle = new CanvasKit.ParagraphStyle({
          textStyle: {
            color: CanvasKit.BLACK,
            fontFamilies: ['Roboto'],
            fontSize: 50
          },
          textAlign: CanvasKit.TextAlign.Left,
          maxLines: 7,
          ellipsis: '...'
        })

        const builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr)
        builder.addText(str)
        paragraph = builder.build()
      }

      if (!paragraph) {
        requestAnimationFrame(drawFrame)
        return
      }

      CanvasKit.setCurrentContext(context)
      skcanvas.clear(CanvasKit.WHITE)

      const wrapTo = 350 + 150 * Math.sin(Date.now() / 1000)
      paragraph.layout(wrapTo)
      skcanvas.drawParagraph(paragraph, 0, 0)

      surface.flush()
      requestAnimationFrame(drawFrame)
    }
  })
