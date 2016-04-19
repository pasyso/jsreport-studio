var webpack = require('webpack')

webpack({
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

      if (/react/.test(request)) {
        return callback(null, 'Studio.react')
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
          presets: [ 'react', 'es2015', 'stage-0' ],
          plugins: [ 'transform-runtime' ]
        }
      }
    ]
  }
}, function (err, stats) {
  if (err) {
    console.err(err)
    return process.exit(1)
  }

  var jsonStats = stats.toJson()

  if (jsonStats.errors.length > 0) {
    console.error(jsonStats.errors)
    process.exit(1)
  }

  console.log(stats.toString({ colors: true, chunks: true, cached: false }))

  console.log('webpack build ok')
})