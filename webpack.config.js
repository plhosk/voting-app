const webpack = require('webpack')
const path = require('path')
// const CompressionPlugin = require("compression-webpack-plugin")

// const srcPath = path.join(__dirname, 'app');
const buildPath = path.join(__dirname, 'public');

const prod = process.argv.indexOf('-p') !== -1;

const config = {
  context: __dirname,
  entry: [ './app/App.jsx'],
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  resolve: {
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
      },
      {
        test: /\.json$/,
        use: [{
          loader: "json-loader"
        }]
      }
    ]
  },
  node: {
    fs: 'empty',
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

  config.devtool = 'cheap-module-source-map'

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `"production"`
      }
  }))

} else {

  config.devtool = 'inline-source-map'
  
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `""`
      }
  }))

}

module.exports = config
