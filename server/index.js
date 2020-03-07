const Koa = require('koa')
const SocketIO = require('koa-socket-2')
const serve = require('koa-static')
const puppeteer = require('puppeteer-core')

const app = new Koa()
const io = new SocketIO()
const PORT = 3000
const CHROMIUM_PATH =
  '/Users/Desmond/repo/chromium/out/Default/Chromium.app/Contents/MacOS/Chromium'

app.use(serve('.'))

app.use(ctx => {
  ctx.body = 'Hello World!'
})

const startBrowser = async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH
  })
  const page = await browser.newPage()
  await page.goto('https://duckduckgo.com')
  await page.screenshot({ path: 'example.png' })
  await browser.close()
}

startBrowser()

io.attach(app)

io.on('connection', () => {
  console.log('a client connected')
})

io.on('disconnect', () => {
  console.log('a client disconnected')
})

io.on('message', (ctx, data) => {
  console.log('client sent data to message endpoint: ', data)

  // Deliver mock draw commands to client for testing
  const commands = require('./mocks/drawTextCommands')(data)
  io.broadcast('message', commands)
})

console.log(`Listening on port: ${PORT}`)
app.listen(PORT)
