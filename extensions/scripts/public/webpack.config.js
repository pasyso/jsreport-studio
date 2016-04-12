var webpack = require('webpack')

module.exports = {
  entry: {
    main: './main_dev.js'
  },
  output: {
    path: __dirname,
    filename: 'main.js'
  },
  externals: [
    function (context, request, callback) {
      if (/babel-runtime/.test(request))
        return callback(null, 'studio.runtime[\'' + request.substring('babel-runtime/'.length) + '\']')
      callback()
    }
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/foo/)
  ]
}