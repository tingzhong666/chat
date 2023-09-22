import fastify from 'fastify'
const app = fastify({ logger: true })
import fastifyIO from 'fastify-socket.io'
import { ss } from '../socket_server/ss.js'
import config from '../config.js'

app.register(fastifyIO, { path: config.ss.path, cors: "*" })

app.ready().then(() => {
  ss(app, app.io)
})

app.listen({ port: config.http.port })
  .then(() => {
    app.log.info('123')
  })
