module.exports = {
  entry: {
    main: './main_dev.js'
  },
  output: {
    path: __dirname,
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};