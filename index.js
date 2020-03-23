const HtmlWebpackPlugin = require('html-webpack-plugin')

class HtmlWebpackChangePathPlugin {
  constructor (options) {
    this.options = options
  }

  processPath (data) {
    if (this.options && this.options.configCSS) {
      if (data.assets.css) {
        data.assets.css = data.assets.css.map(cssUrl =>
          cssUrl.replace(
            data.assets.publicPath,
            this.options.configCSS.publicPath
          )
        )
      }
    }
    if (this.options && this.options.configJS) {
      if (data.assets.js) {
        data.assets.js = data.assets.js.map(cssUrl =>
          cssUrl.replace(
            data.assets.publicPath,
            this.options.configJS.publicPath
          )
        )
      }
    }
  }

  apply (compiler) {
    // webpack > 4.0.0
    compiler.hooks.compilation.tap(
      'HtmlWebpackChangePathPlugin',
      compilation => {
        if (HtmlWebpackPlugin.getHooks) {
          // yarn add html-webpack-plugin@next -D HtmlWebpackPlugin version > 4.0.0-beta.14
          HtmlWebpackPlugin.getHooks(
            compilation
          ).beforeAssetTagGeneration.tapAsync(
            'HtmlWebpackChangePathPlugin',
            (data, callback) => {
              this.processPath(data)
              callback(null, data)
            }
          )
        } else {
          // yarn add html-webpack-plugin -D HtmlWebpackPlugin version 3.2.0
          compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
            'HtmlWebpackChangePathPlugin',
            (data, callback) => {
              this.processPath(data)
              callback(null, data)
            }
          )
        }
      }
    )
  }
}

module.exports = HtmlWebpackChangePathPlugin
