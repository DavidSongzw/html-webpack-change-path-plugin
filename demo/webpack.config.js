'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackChangePathPlugin = require('../index')
const HtmlWebpackChangePathPlugin = require('html-webpack-change-path-plugin')

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inlineSource: '.css$',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new HtmlWebpackChangePathPlugin({
      configCSS: {
        publicPath: 'https://cdn.css.com/'
      },
      configJS: {
        publicPath: 'https://cdn.js.com/'
      }
    })
  ]
}
