const Koa = require('koa')
const convert = require('koa-convert')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const webpack = require('webpack')
const config = require('./webpack.dev.conf')

const app = new Koa()
const compiler = webpack(config)

// serve webpack bundle output
app.use(
  convert(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  )
)

// enable hot-reload and state-preserving
// compilation error display
app.use(convert(hotMiddleware(compiler)))

app.listen(3725, '127.0.0.1', err => {
  err && console.log(err)
})
