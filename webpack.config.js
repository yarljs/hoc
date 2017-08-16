const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    entry: {
      index: "./test/index.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
      port: 8081,
      contentBase: path.join(__dirname, "test"),
      proxy: {
        "/chuck": {
          "changeOrigin": true,
          target: "https://api.chucknorris.io",
          pathRewrite: {"^/chuck" : ""}
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Yarljs/HOC',
        template: './test/index.ejs'
      }),
    ]
    //module: mods,
  }
}
