const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const cdn = {
  css: [
    'https://unpkg.com/ant-design-vue@2.0.0-rc.2/dist/antd.min.css'
  ],
  js: [
    'https://unpkg.com/vue@3.0.0/dist/vue.global.js',
    'https://unpkg.com/vue-router@4.0.0-rc.6/dist/vue-router.global.js',
    'https://unpkg.com/vuex@4.0.0-rc.2/dist/vuex.global.js',
    'https://unpkg.com/axios@0.21.0/dist/axios.min.js',
    'https://unpkg.com/ant-design-vue@2.0.0-rc.2/dist/antd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/core.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/enc-base64.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/md5.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/evpkdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/cipher-core.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/aes.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/pad-pkcs7.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/mode-ecb.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/enc-utf8.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/enc-hex.min.js',
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
      'crypto-js': 'CryptoJS'
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
  }
}
