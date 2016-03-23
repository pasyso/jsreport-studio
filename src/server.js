var Express = require('express');
var config = require( './config');
var favicon = require('serve-favicon');
var compression = require('compression');
var path = require('path');
var http = require('http');
var app = new Express();
var server = new http.Server(app);
var fs = require('fs');

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use('/extension/data', Express.static(path.join(__dirname, '../', 'extensions', 'data')));
var webpack = require('webpack');
var webpackConfig = require('../webpack/dev.config');
var compiler = webpack(webpackConfig);

var host = config.host || 'localhost';
var port = config.port;

app.use(require('webpack-dev-middleware')(compiler));
app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, '../static/dist/index.html'));
});

var jsreport = require('jsreport')({
  express: {app: app}
});

jsreport.init().then(function() {
  fs.writeFileSync(path.join(__dirname, 'dev-extensions-require.js'), "import '../extensions/data/public/main_dev.js'");

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../static/dist/index.html'));
  });

  if (config.port) {
    server.listen(config.port, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    });
  } else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
  }
});

