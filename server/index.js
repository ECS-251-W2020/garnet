const Koa = require('koa')
const app = new Koa()
const PORT = 3000

app.use(ctx => {
  ctx.body = 'Hello World!'
})

console.log(`Listening on port: ${PORT}`)
app.listen(PORT)
