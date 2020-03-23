# html-webpack-change-path-plugin

For html-webpack-change-path-plugin to change resource address,use in webpack 4 or higher

<h2 align="center">Install</h2>

```bash
  npm i --save-dev html-webpack-change-path-plugin
```

```bash
  yarn add --dev html-webpack-change-path-plugin
```

<h2 align="center">Options</h2>

| Name      | type     | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| configCSS | {Object} | {configCSS: {publicPath:  `"https://cdn.css.com/"`}} |
| configJS  | {Object} | {configJS: {publicPath:  `"https://cdn.js.com/"`}}   |


<h2 align="center">Usage</h2>
Here's an example webpack config illustrating how to use these options

**webpack.config.js**
```js
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

```

This will generate a file `dist/index.html` containing the following

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Document</title>
  <link href="https://cdn.css.com/index.css" rel="stylesheet">
</head>

<body>
  <script type="text/javascript" src="https://cdn.js.com/index.js"></script>
</body>

</html>
```
