import path from 'path'
module.exports = {
  port: 8080, // 端口
  alias: {
    '/@/': path.resolve(__dirname, './src')
  },
  optimizeDeps: {
    include: ['@xizher/js-extension/utils']
  },
}
