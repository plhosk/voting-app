module.exports = {
  entry: ['whatwg-fetch', './app/App.jsx'],
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
