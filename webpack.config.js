const webpack = require('webpack')
const prod = process.argv.indexOf('-p') !== -1;

const config = {
  entry: ['babel-polyfill', './app/App.jsx'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname + '/app',
    modulesDirectories: [
        'node_modules',
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules)/
      }
    ]
  }
}

config.plugins = config.plugins||[];
if (prod) {
  config.plugins.push(new webpack.DefinePlugin({
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
