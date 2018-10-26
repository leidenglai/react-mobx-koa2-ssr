// const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const rootPath = path.resolve(__dirname, '..') // 项目根目录
const SOURCE_MAP = true

config.output.filename = '[name].js'
config.output.chunkFilename = '[id].js'

config.devtool = SOURCE_MAP ? 'cheap-module-eval-source-map' : false

// add hot-reload related code to entry chunk
config.entry.app = [
  // 开启react代码的模块热替换（HMR）
  'react-hot-loader/patch',

  'webpack-hot-middleware/client?reload=true',
  // 为热替换（HMR）打包好运行代码
  // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
  'webpack/hot/only-dev-server',
  config.entry.app
]

config.module.rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      `css-loader?modules&context=${__dirname}&localIdentName=[name]__[local]___[hash:base64:5]`,
      {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      },
      'less-loader'
    ]
  }
)

config.plugins.push(
  // 开启全局的模块热替换（HMR）
  new webpack.HotModuleReplacementPlugin(),

  new HtmlWebpackPlugin({
    filename: '../views/dev/index.html',
    template: './views/tpl/index.tpl.html',
    chunksSortMode: 'dependency'
  }),

  // new HtmlWebpackPlugin({
  //   filename: 'index.html',
  //   template: path.join(rootPath, 'client/index.html'),
  //   chunksSortMode: 'dependency'
  // }),

  new MiniCssExtractPlugin({ filename: '[name].css' }),

  new webpack.DefinePlugin({
    'process.env': {
      // 这是给 React 打包用的
      NODE_ENV: JSON.stringify('development')
    }
  })
  // new BrowserSyncPlugin(
  //   {
  //     host: '127.0.0.1',
  //     open: false,
  //     port: 3725,
  //     proxy: 'http://127.0.0.1:3725/',
  //     logConnections: false,
  //     notify: false,
  //     browser: 'google chrome'
  //   },
  //   { reload: false }
  // )
)

module.exports = config
