const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const rootPath = path.resolve(__dirname, '..') // 项目根目录
const clientConfig = baseConfig
// const client = path.join(rootPath, 'client') // 开发源码目录

clientConfig.output.filename = '[name].[chunkhash:6].js'
clientConfig.output.chunkFilename = '[id].[chunkhash:6].js'

clientConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['eslint-loader']
  },
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
    loader: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')] }
      },
      'less-loader'
    ]
  }
)

clientConfig.optimization.minimizer = [new UglifyJsPlugin()]

clientConfig.plugins.push(
  // // 打包细节插件，能查看已打包好的js包中各模块的体积
  // new BundleAnalyzerPlugin(),

  new CleanWebpackPlugin('dist', {
    root: rootPath,
    verbose: false
  }),

  // 复制高度静态资源
  new CopyWebpackPlugin([
    {
      context: path.join(rootPath, 'static'),
      from: '**/*'
    }
  ]),

  // 启用作用域提升
  // 作用域提升会移除模块外的函数包装,体积改进; 更显著的改进是 JavaScript 在浏览器中加载的速度
  new webpack.optimize.ModuleConcatenationPlugin(),

  new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 30000 }),
  new webpack.DefinePlugin({
    'process.env': {
      // 这是给 React 打包用的
      NODE_ENV: JSON.stringify('production')
    }
  }),

  new MiniCssExtractPlugin({ filename: '[name].[contenthash:6].css' }),
  new HtmlWebpackPlugin({
    filename: path.join(rootPath, 'dist/views/prod/index.html'),
    template: path.join(rootPath, './views/tpl/index.tpl.html'),
    chunksSortMode: 'dependency'
  })
)

module.exports = clientConfig
