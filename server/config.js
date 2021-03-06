/**
 * config
 */
import path from 'path'

const config = {
  // debug 为 true 时，用于本地调试
  debug: true,

  logDir: path.join(__dirname, 'logs'),

  // mongodb 配置
  db: 'mongodb://127.0.0.1:27017/ReactIsomorphicBlogDb',

  secret: 'ilove0bug',

  // 密码“加盐”
  saltPassword: 'ilove0bug2'
}

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1:27017/ReactIsomorphicBlogDbTest'
}

export default config
