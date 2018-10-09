const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const rucksack = require('rucksack-css')
const autoprefixer = require('autoprefixer')

const rootPath = path.resolve(__dirname, '..') // 项目根目录
const env = process.env.NODE_ENV.trim() // 当前环境
const src = path.join(rootPath, 'src') // 开发源码目录

process.noDeprecation = true

// webpack主要公共配置
module.exports = {
  mode: env,
  entry: {
    app: path.join(src, 'app.js'),
  },
  output: {
    path: path.join(rootPath, 'dist/static'),
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.css', '.less'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      src,
      assets: path.join(src, 'assets'),
      containers: path.join(src, 'containers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240, // 10KB 以下使用 base64
          name: 'img/[name]-[hash:6].[ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          name: 'vendors',
          chunks: 'initial',
          priority: 2,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          enforce: true,
          priority: 20,
        },
      },
    },
  },
  plugins: [
    new ProgressBarPlugin(), // 进度条

    new FaviconsWebpackPlugin({
      logo: path.join(src, 'assets/images/favicon.jpg'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [rucksack(), autoprefixer({browsers: ['last 2 versions', 'Firefox ESR', '> 2%', 'ie >= 10', 'iOS >= 9']})],
      },
    }),

    new webpack.DefinePlugin({
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production',
    }),
  ],
}
