import 'babel-polyfill'
import path from 'path'
import views from 'koa-views'
import server from 'koa-static'
import mount from 'koa-mount'
import app from './app'
import router from './routes'
import clientRoute from './middlewares/clientRoute'
import handleRes from './middlewares/handleRes'
import handle404 from './middlewares/handle404'

// 设置全局变量
global.__DEV__ = false
global.__PROD__ = true

global.__COMPONENT_DEVTOOLS__ = false

const port = process.env.port || 7000

app.use(views(path.resolve(__dirname, '../views/prod'), { map: { html: 'ejs' }}))
// app.use(server(path.resolve(__dirname, '../client')))
app.use(mount('/static', server(path.resolve(__dirname, '../client'))))
app.use(clientRoute)
app.use(router.routes())
app.use(handleRes) // 处理body返回
app.use(router.allowedMethods())

// mongo数据库
require('./middlewares/mongooseLog') // 打印 mongodb 查询日志
require('./models')

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://127.0.0.1:${port}/ in your browser.\n`)

app.use(handle404) // 处理404
app.listen(port)

export default app
