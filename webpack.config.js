const webpack = require('webpack')
// const CompressionPlugin = require("compression-webpack-plugin")

const prod = process.argv.indexOf('-p') !== -1;

const config = {
  entry: [ './app/App.jsx'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    //root: __dirname + '/app',
    modules: [
        'node_modules'
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['es2015', { 'modules': false }], 'react', 'stage-2', ]
          }
        }]
      }
    ]
  },
  plugins: [
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   filename: "commons.js",
    //   minChunks: 2,
    // }),
  ]
}

if (prod) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `"production"`
      }
  }))
} else {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `""`
      }
  }))
}

module.exports = config
