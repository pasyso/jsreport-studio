const nanoid = require('nanoid')
const serveStatic = require('serve-static')
const favicon = require('serve-favicon')
const compression = require('compression')
const path = require('path')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const url = require('url')
const requestLog = require('./requestLog')

function addFolderEntity (reporter) {
  reporter.documentStore.registerEntityType('FolderType', {
    _id: { type: 'Edm.String', key: true },
    name: { type: 'Edm.String', publicKey: true },
    shortid: { type: 'Edm.String' },
    creationDate: { type: 'Edm.DateTimeOffset' },
    modificationDate: { type: 'Edm.DateTimeOffset' }
  })

  // expose it as an entity set
  reporter.documentStore.registerEntitySet('folders', {
    entityType: 'jsreport.FolderType',
    humanReadableKey: 'shortid'
  })

  reporter.documentStore.registerComplexType('FolderRefType', {
    'shortid': { type: 'Edm.String' }
  })

  // before document store initialization, extend all entity types with folder information
  reporter.documentStore.on('before-init', (documentStore) => {
    Object.entries(documentStore.model.entitySets).forEach(([k, entitySet]) => {
      const entityTypeName = entitySet.entityType.replace(documentStore.model.namespace + '.', '')

      documentStore.model.entityTypes[entityTypeName].folder = {
        type: 'jsreport.FolderRefType'
      }
    })
  })

  reporter.initializeListeners.add('studio-folder-test', async () => {
    reporter.documentStore.collection('folders').beforeInsertListeners.add('folders', (doc) => {
      doc.shortid = doc.shortid || nanoid(7)
      doc.creationDate = new Date()
    })

    reporter.documentStore.collection('folders').beforeUpdateListeners.add('folders', (query, update) => {
      update.$set.modificationDate = new Date()
    })

    reporter.documentStore.collection('folders').beforeRemoveListeners.add('folders', async (q) => {
      const foldersToRemove = await reporter.documentStore.collection('folders').find(q)

      for (const folder of foldersToRemove) {
        for (const c of Object.keys(reporter.documentStore.collections)) {
          const entities = await reporter.documentStore.collection(c).find({
            folder: folder.shortid
          })

          if (entities.length === 0) {
            continue
          }

          for (const e of entities) {
            await reporter.documentStore.collection(c).remove({
              _id: e._id
            })
          }
        }
      }
    })
  })
}

module.exports = (reporter, definition) => {
  reporter.addRequestContextMetaConfig('htmlTitle', { sandboxReadOnly: true })

  addFolderEntity(reporter)

  const distPath = reporter.execution ? reporter.execution.tempDirectory : path.join(__dirname, '../static/dist')
  if (definition.options.requestLogEnabled !== false) {
    requestLog(reporter)
  }
  let compiler

  function sendIndex (req, res, next) {
    const indexHtml = path.join(distPath, 'index.html')

    function send (err, content) {
      if (err) {
        return next(err)
      }

      content = content.replace('client.js', reporter.options.appPath + 'studio/assets/client.js')

      res.send(content.replace('$jsreportTitle', req.context.htmlTitle || `jsreport ${reporter.version} ${reporter.options.mode}`))
    }

    function tryRead () {
      compiler.outputFileSystem.readFile(indexHtml, 'utf8', (err, content) => {
        if (err) {
          return setTimeout(tryRead, 1000)
        }

        send(null, content)
      })
    }

    if (reporter.options.mode === 'jsreport-development') {
      tryRead()
    } else {
      fs.readFile(indexHtml, 'utf8', send)
    }
  }

  function redirectOrSendIndex (req, res, next) {
    const reqUrl = url.parse(req.originalUrl)
    if (reqUrl.pathname[reqUrl.pathname.length - 1] !== '/') {
      return res.redirect(reqUrl.pathname + '/' + (reqUrl.search || ''))
    }

    sendIndex(req, res, next)
  }

  reporter.on('after-authentication-express-routes', () => reporter.express.app.get('/', redirectOrSendIndex))

  reporter.on('after-express-static-configure', () => {
    if (!reporter.authentication) {
      return reporter.express.app.get('/', redirectOrSendIndex)
    }
  })

  reporter.on('before-express-configure', () => {
    reporter.express.app.use('/api/report', (req, res, next) => {
      res.cookie('render-complete', true)
      next()
    })
  })

  reporter.on('express-configure', () => {
    const extsInNormalMode = []

    if (reporter.options.mode !== 'jsreport-development') {
      if (!fs.existsSync(path.join(distPath, 'extensions.client.js'))) {
        fs.renameSync(path.join(distPath, '1.client.js'), path.join(distPath, 'extensions.client.js'))
      }
      const webpackWrap = fs.readFileSync(path.join(distPath, 'extensions.client.js'), 'utf8')
      const webpackExtensions = webpackWrap.replace('$extensionsHere', () => {
        return reporter.extensionsManager.extensions.map((e) => {
          try {
            if (reporter.execution && reporter.execution.resource(e.name)) {
              return reporter.execution.resource(e.name)
            }
            return fs.readFileSync(path.join(e.directory, 'studio/main.js'))
          } catch (e) {
            return ''
          }
        }).join('\n')
      })
      fs.writeFileSync(path.join(distPath, '1.client.js'), webpackExtensions)
    } else {
      let extsConfiguredInDevMode = definition.options.extensionsInDevMode

      if (extsConfiguredInDevMode != null && !Array.isArray(extsConfiguredInDevMode)) {
        extsConfiguredInDevMode = [extsConfiguredInDevMode]
      }

      if (extsConfiguredInDevMode) {
        reporter.logger.debug(`studio extensions configured in dev mode: ${extsConfiguredInDevMode.join(', ')}`)
      } else {
        reporter.logger.debug('all studio extensions are configured in dev mode')
      }

      fs.writeFileSync(path.join(__dirname, '../src/extensions_dev.js'), reporter.extensionsManager.extensions.map((e) => {
        const shouldUseMainEntry = extsConfiguredInDevMode && !extsConfiguredInDevMode.includes(e.name)

        try {
          fs.statSync(path.join(e.directory, '/studio/main_dev.js'))

          const extensionPath = shouldUseMainEntry ? (
            path.join(e.directory, '/studio/main.js')
          ) : path.join(e.directory, '/studio/main_dev.js')

          if (shouldUseMainEntry) {
            extsInNormalMode.push(e)
          }

          return `import '${path.relative(path.join(__dirname, '../src'), extensionPath).replace(/\\/g, '/')}'`
        } catch (e) {
          return ''
        }
      }).join('\n'))
    }

    const app = reporter.express.app

    app.use(compression())
    app.use(favicon(path.join(reporter.execution ? distPath : path.join(__dirname, '../static'), 'favicon.ico')))

    if (reporter.options.mode === 'jsreport-development') {
      const webpack = require('jsreport-studio-dev').deps.webpack

      const webpackConfig = require('../webpack/dev.config')(
        reporter.extensionsManager.extensions,
        extsInNormalMode
      )

      compiler = webpack(webpackConfig)
      reporter.express.app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: '/studio/assets/',
        hot: true,
        inline: true,
        lazy: false,
        stats: { colors: true, chunks: false }
      }))
      reporter.express.app.use(require('webpack-hot-middleware')(compiler))
    }

    app.use('/studio/assets', serveStatic(reporter.execution ? reporter.execution.tempDirectory : path.join(__dirname, '../static', 'dist')))

    app.post('/studio/validate-entity-name', (req, res) => {
      const entityName = req.body.name

      try {
        reporter.validateEntityName(entityName)
        res.status(200).end()
      } catch (e) {
        res.status(400).end(e.message)
      }
    })

    app.get('/studio/*', sendIndex)
  })

  if (reporter.compilation) {
    reporter.compilation.exclude('webpack-dev-middleware', 'webpack-hot-middleware', 'webpack', 'babel-polyfill', 'html-webpack-plugin', 'jsreport-studio-dev')
    reporter.compilation.resourceInTemp('favicon.ico', path.join(__dirname, '../static', 'favicon.ico'))

    reporter.initializeListeners.add('studio', async () => {
      const mains = await Promise.all(reporter.extensionsManager.extensions.map(async (e) => {
        try {
          await fs.statAsync(path.join(e.directory, 'studio', 'main.js'))
          return e
        } catch (e) {
          return null
        }
      }))

      mains.forEach((e) => {
        if (e) {
          reporter.compilation.resource(e.name, path.join(e.directory, 'studio', 'main.js'))
        }
      })

      const files = await fs.readdirAsync(distPath)
      files.forEach(function (f) {
        if (f.indexOf('.map') === -1 && f.indexOf('1.client.js') === -1) {
          reporter.compilation.resourceInTemp(f, path.join(distPath, f))
        }
      })
    })
  }
}
