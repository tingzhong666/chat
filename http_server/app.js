import fastify from 'fastify'
const app = fastify({ logger: true })
import fastifyIO from 'fastify-socket.io'
import { ss } from '../socket_server/ss.js'
import config from '../config.js'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import mongodb from '@fastify/mongodb'

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
