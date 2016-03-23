/*eslint-disable */
var Express = require('express');
var config = require( './config');
var favicon = require('serve-favicon');
var compression = require('compression');
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var webpackConfig = require('../webpack/dev.config');

module.exports = function(reporter, definition) {

  fs.writeFileSync(path.join(__dirname, 'dev-extensions-require.js'), "import '../extensions/data/public/main_dev.js'");

  reporter.on('after-express-static-configure', function() {
    reporter.express.app.get('/', function response(req, res) {
      res.sendFile(path.join(__dirname, '../static/dist/index.html'));
    });
  });

  reporter.on('express-configure', function() {
    var app = reporter.express.app;

    app.use(compression());
    app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
    app.use('/extension/data', Express.static(path.join(__dirname, '../', 'extensions', 'data')));
    var compiler = webpack(webpackConfig);
    var host = config.host || 'localhost';
    var port = config.port;
    app.use(require('webpack-dev-middleware')(compiler, {
      quiet: true,
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      stats: {colors: true}
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    app.get('*', function response(req, res) {
      res.sendFile(path.join(__dirname, '../static/dist/index.html'));
    });
  });
}
