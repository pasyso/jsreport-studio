module.exports = {
  entry: {
    main: './main_dev.js'
  },
  output: {
    filename: 'main.js'
  },
  externals: [
    function (context, request, callback) {
      if (/babel-runtime/.test(request)) {
        return callback(null, 'Studio.runtime[\'' + request.substring('babel-runtime/'.length) + '\']')
      }
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
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}