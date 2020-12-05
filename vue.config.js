const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const cdn = {
  css: [
    // '//unpkg.com/vuetify@2.3.18/dist/vuetify.min.css'
  ],
  js: [
    // '//unpkg.com/vue@2.6.11/dist/vue.min.js',
    // '//unpkg.com/vue-router@3.2.0/dist/vue-router.min.js',
    // '//unpkg.com/vuex@3.4.0/dist/vuex.min.js',
    // '//unpkg.com/axios@0.21.0/dist/axios.min.js',
    // '//unpkg.com/vuetify@2.3.18/dist/vuetify.min.js',
    // '//unpkg.com/@vue/composition-api@1.0.0-beta.19/dist/vue-composition-api.prod.js',
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
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // vuex: 'Vuex',
      // axios: 'axios',
      // '@vue/composition-api': 'VueCompositionAPI',
      // vuetify: 'Vuetify',
      // 'vuetify/dist/vuetify.min.css': 'Vuetify',
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
