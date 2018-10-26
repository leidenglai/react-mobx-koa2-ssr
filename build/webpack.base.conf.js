const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')

const rootPath = path.resolve(__dirname, '..') // 项目根目录
const env = process.env.NODE_ENV.trim() // 当前环境
const client = path.join(rootPath, 'client') // 开发源码目录

process.noDeprecation = true

// webpack主要公共配置
module.exports = {
  mode: env,
  entry: {
    app: path.join(client, 'app.js')
  },
  output: {
    path: path.join(rootPath, 'dist/client'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.css', '.less'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      client,
      assets: path.join(client, 'assets'),
      containers: path.join(client, 'containers'),
      utils: path.join(client, 'utils'),
      components: path.join(client, 'components'),
      stores: path.join(client, 'stores'),
      static: path.join(rootPath, 'static')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 10KB 以下使用 base64
          name: 'img/[name]-[hash:6].[ext]'
        },
        exclude: [path.join(rootPath, 'static')]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          name: 'vendors',
          chunks: 'initial',
          priority: 2
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          enforce: true,
          priority: 20
        }
      }
    }
  },
  plugins: [
    new ProgressBarPlugin(), // 进度条
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [rucksack(), autoprefixer({ browsers: ['last 2 versions', 'Firefox ESR', '> 2%', 'ie >= 10', 'iOS >= 9'] })]
      }
    }),

    new webpack.DefinePlugin({
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production'
    })
  ]
}
