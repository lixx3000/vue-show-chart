const baseWebpack = require('./webpack.base');
const { merge } = require('webpack-merge');

module.exports = merge(baseWebpack, {
  mode: 'development',
  entry: resolve(__dirname, '../src/main.js'),
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
  ]
});