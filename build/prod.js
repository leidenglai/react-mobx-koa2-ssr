const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.prod.conf')

webpack(config, (err, stats) => {
  if (err) {
    console.log(err)
  }

  // show build info to console
  console.log(stats.toString({chunks: false, color: true}))

  // save build info to file
  fs.writeFile(path.resolve(__dirname, '../dist/__build_info__'), stats.toString({color: false}), err => {
    if (err) {
      console.log('error', err)
    }
  })
})
