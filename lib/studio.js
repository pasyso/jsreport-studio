var Express = require('express')
var favicon = require('serve-favicon')
var compression = require('compression')
var path = require('path')
var fs = require('fs')
var registeredExtensions = require('../extensions/extensions')

module.exports = function (reporter, definition) {
  reporter.on('after-authentication-express-routes', function () {
    reporter.express.app.get('/', function response (req, res) {
      res.sendFile(path.join(__dirname, '../static/index.html'))
    })
  })

  reporter.on('express-configure', function () {
    if (reporter.options.mode === 'production') {
      fs.writeFileSync(path.join(__dirname, '../static/dist/extensions.js'), registeredExtensions.map(function (e) {
        return fs.readFileSync(path.join(e.directory, 'public/main.js'))
      }).join('\n'))
    } else {
      fs.writeFileSync(path.join(__dirname, '../src/extensions_dev.js'), registeredExtensions.map(function (e) {
        return "import '" + path.relative(path.join(__dirname, '../src'), path.join(e.directory, '/public/main_dev.js')).replace(/\\/g, '/') + "'"
      }).join('\n'))
    }

    var app = reporter.express.app

    app.use(compression())
    app.use(favicon(path.join(__dirname, '../static', 'favicon.ico')))

    if (reporter.options.mode !== 'production') {
      var webpack = require('webpack')
      var webpackConfig = require('../webpack/dev.config')
      var compiler = webpack(webpackConfig)
      reporter.express.app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: '/studio/assets/',
        hot: true,
        inline: true,
        lazy: false,
        stats: { colors: true }
      }))
      reporter.express.app.use(require('webpack-hot-middleware')(compiler))
    }

    app.use('/studio/assets', Express.static(path.join(__dirname, '../static', 'dist')))

    app.get('/studio/*', function response (req, res) {
      res.sendFile(path.join(__dirname, '../static/index.html'))
    })
  })
}
