// const path = require('path')

const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
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
    ]
  },
  lintOnSave: false
}
