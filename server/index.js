const Koa = require('koa')
const SocketIO = require('koa-socket-2')
const serve = require('koa-static')
const puppeteer = require('puppeteer-core')

const PORT = 3000
const CHROMIUM_PATH = '/Applications/Chromium.app/Contents/MacOS/Chromium'

const app = new Koa()
const io = new SocketIO()

app.use(serve('.'))

io.attach(app)

io.on('connection', async () => {
  console.log('a client connected')
})

io.on('disconnect', async () => {
  console.log('a client disconnected')
})

io.on('ready', async (_, url) => {
  console.log('Launching browser...')

  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH
  })

  const page = await browser.newPage()

  console.log('Go to page: %s', url)
  await page.goto(url)

  const text = await page.evaluate(() => document.body.innerText)
  const textList = text
    .replace("'", '\x27')
    .replace('"', '\x22')
    .split('\n')
    .filter(text => text !== '')

  const createCommands = require('./mocks/drawTextCommands')
  let y = 60

  console.log('Sending draw commands to client...')

  textList.forEach(text => {
    const commands = createCommands({ text, x: 60, y })

    y += 30

    io.broadcast('draw', commands)
  })

  io.broadcast('done')

  await browser.close()
})

console.log(`Listening on port: ${PORT}`)
app.listen(PORT)
