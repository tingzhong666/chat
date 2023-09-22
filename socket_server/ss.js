/**
 * 
 * @param {import('fastify').FastifyInstance} app
 * @param {import('socket.io').Server} io 
 */
export function ss(app, io) {
  io.on('connection', ss => {
    app.log.info('socket io已连接')

    // 加入到 大厅
    ss.on('join room liveing_room', () => {
      ss.join('liveing_room')
    })

    // 大厅 消息发送
    ss.on('send room liveing_room', ({ user_id, text }) => {
      ss.to('liveing_room').emit('msg', { user_id, text })
      app.log.info(`send room liveing_room msg: ${text}`)

      // 成功发送
      ss.emit('send room liveing_room ok', 'ok')
    })
  })


}