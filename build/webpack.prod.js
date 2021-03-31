const baseWebpack = require('./webpack.base');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseWebpack, {
  mode: 'none',
  entry: {
    'vue-show-chart': resolve(__dirname, '../src/main.js'),
    'vue-show-chart.min': resolve(__dirname, '../src/main.js')
  },
  devtool: false,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: {
      name: 'VueShowChart',
      type: 'var',
      export: 'default'
    },
    umdNamedDefine: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/
      })
    ]
  },
  externals: {
    echarts: 'echarts',
    vue: 'vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              // loaders: {
              //   js: [
              //     {
              //       loader: 'babel-loader',
              //       options: {
              //         presets:['@babel/preset-env']
              //       },
              //     },
              //   ],
              // },
            },
          },
        ],
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude:/node_modules/,
      //   options: {
      //     presets:['@babel/preset-env']
      //   },
      // },
      {
        test: /\.less$/,
        exclude:/node_modules/,
        use: [
           MiniCssExtractPlugin.loader,
           {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
           },
          {
            loader:'postcss-loader',
            options:{
              postcssOptions: {
                plugins:[require('autoprefixer'), require('cssnano')]
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
  })
  ]
});