const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const cdn = {
  css: [
    './libs/ant-design-vue/antd.min.css',
    './libs/openlayers/ol.css',
    './libs/leaflet/leaflet.css',
  ],
  js: [
    './libs/vue/vue.global.js',
    './libs/vue/vue-router.global.js',
    './libs/vue/vuex.global.js',
    './libs/axios/axios.min.js',
    './libs/ant-design-vue/antd.min.js',
    './libs/crypto/core.min.js',
    './libs/crypto/enc-base64.min.js',
    './libs/crypto/md5.min.js',
    './libs/crypto/evpkdf.min.js',
    './libs/crypto/cipher-core.min.js',
    './libs/crypto/aes.min.js',
    './libs/crypto/pad-pkcs7.min.js',
    './libs/crypto/mode-ecb.min.js',
    './libs/crypto/enc-utf8.min.js',
    './libs/crypto/enc-hex.min.js',
    './libs/openlayers/ol.js',
    './libs/leaflet/leaflet.js',
    'https://unpkg.com/esri-leaflet@2.5.0/dist/esri-leaflet.js',
  ]
}

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
    ],
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'ant-design-vue': 'antd',
      'ant-design-vue/dist/antd.css': 'antd',
      'crypto-js': 'CryptoJS',
      'ol': 'ol',
      'leaflet': 'L',
      'leaflet/dist/leaflet.css': 'L',
    }
  },
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Hello World!',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: cdn
    }
  },
  devServer: {
    // host: '127.0.0.1',
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hotOnly: false,
    disableHostCheck: true
  },
}
