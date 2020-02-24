const Koa = require('koa')
const SocketIO = require('koa-socket-2')
const app = new Koa()
const io = new SocketIO()
const PORT = 3000

app.use(ctx => {
  ctx.body = 'Hello World!'
})

io.attach(app)

io.on('message', (ctx, data) => {
  console.log('client sent data to message endpoint', data)

  // Deliver mock draw commands to client for testing
  const commands = require('./mocks/drawTextCommands')
  ctx.socket.broadcast.emit('message', commands)
})

console.log(`Listening on port: ${PORT}`)
app.listen(PORT)
