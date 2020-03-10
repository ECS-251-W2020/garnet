const Koa = require('koa')
const SocketIO = require('koa-socket-2')
const serve = require('koa-static')
const puppeteer = require('puppeteer-core')

const PORT = 3000
const CHROMIUM_PATH =
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'

const app = new Koa()
const io = new SocketIO()

app.use(serve('.'))

app.use(ctx => {
  ctx.body = 'Hello World!'
})

let browser

io.attach(app)

io.on('connection', async () => {
  console.log('a client connected')
})

io.on('disconnect', async () => {
  console.log('a client disconnected')
})

io.on('ready', async (ctx, url) => {
  console.log('URL: %s', url)

  browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH
    // devtools: true
  })

  const page = await browser.newPage()
  await page.goto(url)
  const text = await page.evaluate(() => document.body.innerText)
  const textList = text
    .replace("'", '\x27')
    .replace('"', '\x22')
    .split('\n')
    .filter(text => text !== '')

  const createCommands = require('./mocks/drawTextCommands')
  let y = 100

  textList.forEach(text => {
    const commands = createCommands({ text, x: 100, y })
    y += 30

    io.broadcast('draw', commands)
  })

  io.broadcast('done')

  await browser.close()
})

console.log(`Listening on port: ${PORT}`)
app.listen(PORT)
