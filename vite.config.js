const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const cdn = {
  css: [

  ],
  js: [
    './libs/vue/vue.v3.0.0.js',
  ]
}

module.exports = {
  port: 8080,
  publicPath: './',
  productionSourceMap: false,
  assetsDir: 'static',
  configureWebpack: {
    plugins: [
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ],
    externals: {
      vue: 'Vue',
    },
  },
  lintOnSave: false,
  pages: {
    index: {
      // entry: 'src/main.js',
      // template: 'index.html',
      // filename: 'index.html',
      title: 'GLC30辅助地理课堂教学系统',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: cdn
    }
  },
}
