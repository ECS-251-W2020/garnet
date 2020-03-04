document.body.textContent = "";

var header = document.createElement('h1');
header.textContent = "This is Sudo-CanvasKit Page!";
document.body.appendChild(header);


const canvas = document.getElementById('main')


let x = 60
let y = 60


// Draw simple text using CanvasKit (skia + webAssembly)

CanvasKitInit({
  locateFile: (file) => 'https://unpkg.com/canvaskit-wasm@0.3.0/bin/'+file,
}).ready().then((CanvasKit) => {


  const surface = CanvasKit.MakeCanvasSurface('main')

  if (!surface) {
    throw new Error('Could not make surface')
  }


  const skcanvas = surface.getCanvas();
  const paint = new CanvasKit.SkPaint();

  const textPaint = new CanvasKit.SkPaint();
  textPaint.setColor(CanvasKit.Color(40, 0, 0, 1.0));
  textPaint.setAntiAlias(true);

  const textFont = new CanvasKit.SkFont(null, 30);
  
  const context = CanvasKit.currentContext();


  function drawText() {
    CanvasKit.setCurrentContext(context);
      
    skcanvas.drawText('Try Clicking!', 60, 60, textPaint, textFont);
    skcanvas.flush();
    requestAnimationFrame(drawText);
  }  
  requestAnimationFrame(drawText);
});







