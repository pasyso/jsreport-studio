var Express = require('express')
var favicon = require('serve-favicon')
var compression = require('compression')
var path = require('path')
var fs = require('fs')
var requestLog = require('./requestLog')
var registeredExtensions = require('../extensions/extensions')

module.exports = function (reporter, definition) {
  requestLog(reporter)
  var compiler

  function sendIndex (req, res, next) {
    var indexHtml = path.join(__dirname, '../static/dist/index.html')

    function send (err, content) {
      if (err) {
        return next(err)
      }

      res.send(content.replace('$jsreportVersion', reporter.version).replace('$jsreportMode', reporter.options.mode))
    }

    function tryRead () {
      compiler.outputFileSystem.readFile(indexHtml, 'utf8', function (err, content) {
        if (err) {
          return setTimeout(tryRead, 1000)
        }
        send(null, content)
      })
    }

    if (reporter.options.mode !== 'production') {
      tryRead()
    } else {
      fs.readFile(indexHtml, 'utf8', send)
    }
  }

  reporter.on('after-express-static-configure', function () {
    function handleIndex () {
      reporter.express.app.get('/', sendIndex)
    }

    if (!reporter.authentication) {
      return handleIndex()
    }

    reporter.on('after-authentication-express-routes', function () {
      handleIndex()
    })
  })

  reporter.on('before-express-configure', function () {
    reporter.express.app.use('/api/report', function (req, res, next) {
      res.cookie('render-complete', true)
      next()
    })
  })

  reporter.on('express-configure', function () {
    if (reporter.options.mode === 'production') {
      if (!fs.existsSync(path.join(__dirname, '../static/dist/extensions.client.js'))) {
        fs.renameSync(path.join(__dirname, '../static/dist/1.client.js'), path.join(__dirname, '../static/dist/extensions.client.js'))
      }
      var webpackWrap = fs.readFileSync(path.join(__dirname, '../static/dist/extensions.client.js'), 'utf8')
      var webpackExtensions = webpackWrap.replace('$extensionsHere', function () {
        return registeredExtensions.map(function (e) {
          return fs.readFileSync(path.join(e.directory, 'public/main.js'))
        }).join('\n')
      })
      fs.writeFileSync(path.join(__dirname, '../static/dist/1.client.js'), webpackExtensions)
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
      compiler = webpack(webpackConfig)
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

    app.get('/studio/*', sendIndex)
  })
}
