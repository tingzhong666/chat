// dev | product
const env = 'dev'

const that = {
  ss: {
    port: () => {
      return that.http.port
    },
    path: '/socket.io',
    server: () => {
      if(env == 'dev')
        return `http://localhost:${that.ss.port()}/`
      else if (env == 'product')
        return `/`
    },
  },
  http: {
    port: 8080,
  },
  mongodb: {
    db_name: 'chat',
    server: () => {
      return `mongodb://mongo/${that.mongodb.db_name}`
    }
  },
}

export default that
