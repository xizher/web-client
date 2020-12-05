const path = require('path')

module.exports = {
  mode: 'development',
  entry: './test/test-from-customgisapi/test.js',
  output: {
    path: path.resolve(__dirname, 'test/test-from-customgisapi/dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map'
}
