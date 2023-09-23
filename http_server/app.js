import fastify from 'fastify'
const app = fastify({ logger: true })
import fastifyIO from 'fastify-socket.io'
import { ss } from '../socket_server/ss.js'
import config from '../config.js'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import mongodb from '@fastify/mongodb'
import fastify_static from '@fastify/static'
import path from 'path'

app.register(fastifyIO, { path: config.ss.path, cors: true })
app.register(jwt, {
  secret: "sdfsdg",
  cookie: {
    cookieName: 'token',
    signed: false
  }
})
app.register(cookie)
// app.register(mongodb, {
//   // force to close the mongodb connection when app stopped
//   // the default value is false
//   forceClose: true,
  
//   url: config.mongodb.server()
// })

// 静态文件
app.register(fastify_static, {
  root: path.join(config.root, './fronted/dist')
})
// 首页
app.get('/', async (req, res) => {
  return res.sendFile('index.html')
})

// token分发
app.get('/v1/token_check', async function(req, res) {
})

app.ready().then(() => {
  ss(app, app.io)
})

app.listen({ port: config.http.port })
  .then(() => {
    app.log.info('123')
  })
