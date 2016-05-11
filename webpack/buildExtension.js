var webpack = require('webpack')

const exposedLibraries = ['react', 'react-dom', 'superagent', 'react-list', 'bluebird']

webpack({
  devtool: 'hidden-source-map',
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

      if (exposedLibraries.indexOf(request) > -1) {
        return callback(null, 'Studio.libraries[\'' + request + '\']')
      }

      if (request === 'jsreport-studio') {
        return callback(null, 'Studio')
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
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEVELOPMENT__: false
    }),
    //
    //// optimizations
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  }
    //})
  ]
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