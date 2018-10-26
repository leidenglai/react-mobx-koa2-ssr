const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const baseConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function getExternals() {
  return fs
    .readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}

// TODO
const serverConfig = {
  mode: baseConfig.mode,
  context: path.resolve(__dirname, '..'),
  entry: { server: './server/server.prod' },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          'node-style-loader',
          `css-loader?modules&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
          {
            loader: 'postcss-loader',
            options: { plugins: () => [require('autoprefixer')] }
          }
        ]
      },
      {
        test: /\.less$/,
        loader: [
          'node-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: () => [require('autoprefixer')] }
          },
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  externals: getExternals(),
  resolve: baseConfig.resolve,
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 30000 }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:6].css' }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ]
}

module.exports = serverConfig
