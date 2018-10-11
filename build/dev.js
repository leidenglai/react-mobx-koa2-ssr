const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev.conf')
const app = express()

let compiler = webpack(config)

// serve webpack bundle output
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
)

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.listen(3725, '127.0.0.1', err => {
  err && console.log(err)
})
