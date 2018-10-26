import 'babel-polyfill'
import path from 'path'
import views from 'koa-views'
import serve from 'koa-static'
// import mount from 'koa-mount'
import app from './app'
import clientRoute from './middlewares/clientRoute'
// import handle404 from './middlewares/handle404'

// 设置全局变量
global.__DEV__ = false
global.__PROD__ = true

global.__COMPONENT_DEVTOOLS__ = false

const port = process.env.port || 7000

app.use(views(path.resolve(__dirname, '../views/prod'), { map: { html: 'ejs' }}))

app.use(serve(path.resolve(__dirname, '../client')))
// app.use(mount('/static', serve(path.resolve(__dirname, '../dist/client'))));
app.use(clientRoute.routes())
// app.use(handle404) // 处理404
app.listen(port)

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://127.0.0.1:${port}/ in your browser.\n`)
