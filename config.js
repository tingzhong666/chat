import url from 'url'
import path from 'path'

// 非浏览器环境 获取项目根目录
const __dirname = typeof window == 'undefined' ? path.dirname(url.fileURLToPath(import.meta.url)) : ''

// dev | product
const env = process.env.NODE_DEV | 'dev'

const that = {
  root: __dirname,
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
