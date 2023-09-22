/**
 * 
 * @param {import('socket.io').Server} io 
 * @param {import('fastify').FastifyInstance} app
 */
export function ss(app, io) {
  io.on('connection', () => {
    // socket.emit('hello', 'kkkk')
    app.log.info('====123===')
  })
}