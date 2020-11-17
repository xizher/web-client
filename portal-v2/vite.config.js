import path from 'path'
module.exports = {
  port: 8080, // 端口
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  optimizeDeps: {
    include: [
      '@kangc/v-md-editor',
      '@kangc/v-md-editor/lib/theme/vuepress',
      '@kangc/v-md-editor/lib'
    ]
  },
}
