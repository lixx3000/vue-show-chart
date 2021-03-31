const { resolve } = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar({
      name: '🚚 building',
      color: '#2f54eb',
    })
  ]
}