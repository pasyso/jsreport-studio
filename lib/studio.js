const serveStatic = require('serve-static')
const favicon = require('serve-favicon')
const compression = require('compression')
const path = require('path')
const omit = require('lodash/omit')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const url = require('url')
const requestLog = require('./requestLog')
const getCloneName = require('../shared/getCloneName')

module.exports = (reporter, definition) => {
  reporter.addRequestContextMetaConfig('htmlTitle', { sandboxReadOnly: true })

  const distPath = reporter.execution ? reporter.execution.tempDirectory : path.join(__dirname, '../static/dist')
  requestLog(reporter)
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

  async function collectEntitiesInHierarchy (items, sourceEntity, referenceProperty) {
    if (sourceEntity.__entitySet === 'folders') {
      items.push(sourceEntity)

      const lookup = []

      Object.entries(reporter.documentStore.model.entitySets).forEach(([k, entitySet]) => {
        lookup.push(reporter.documentStore.collection(k).find({
          [referenceProperty]: {
            shortid: sourceEntity.shortid
          }
        }).then((results) => {
          if (results.length === 0) {
            return
          }

          if (k === 'folders') {
            return Promise.all(results.map((folder) => {
              return collectEntitiesInHierarchy(items, Object.assign(folder, { __entitySet: k }))
            }))
          } else {
            results.forEach((entity) => {
              items.push(Object.assign(entity, {
                __entitySet: k
              }))
            })
          }
        }))
      })

      await Promise.all(lookup)
    } else {
      items.push(sourceEntity)
    }
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

    app.use('/studio/hierarchyCopy', async (req, res) => {
      const source = req.body.source
      const target = req.body.target
      const entitySetNameAttrMap = req.body.entitySetNameAttrMap
      const shouldCut = req.body.cut === true

      if (!source || !target) {
        const missing = !source ? 'source' : 'target'
        return res.status(400).end(`No "${missing}" for specified in payload`)
      }

      if (!target.referenceProperty) {
        return res.status(400).end('target should specify ".referenceProperty"')
      }

      if (!target.shortid) {
        return res.status(400).end('target should specify ".shortid"')
      }

      const sourceCol = reporter.documentStore.collection(source.entitySet)

      if (!sourceCol) {
        return res.status(400).end(`Invalid entity set "${source.entitySet}" for source`)
      }

      try {
        const sourceEntity = await sourceCol.findOne({ _id: source.id })

        if (!sourceEntity) {
          return res.status(400).end('Source entity with specified id does not exists')
        }

        let items = []

        await collectEntitiesInHierarchy(
          items,
          Object.assign(sourceEntity, { __entitySet: source.entitySet }),
          target.referenceProperty
        )

        if (items.some((item) => item.shortid === target.shortid)) {
          return res.status(200).json({ items: [] })
        }

        if (shouldCut) {
          if (
            sourceEntity[target.referenceProperty] != null &&
            target.shortid != null &&
            sourceEntity[target.referenceProperty] === target.shortid
          ) {
            return res.status(200).end({
              items
            })
          }

          await reporter.documentStore.collection(sourceCol.entitySet).update({
            _id: sourceEntity._id
          }, {
            $set: {
              [target.referenceProperty]: {
                shortid: target.shortid
              }
            }
          })
        } else {
          const newItems = []
          const newHierarchyMap = {}

          await Promise.all(items.map(async (item) => {
            const entitySetName = item.__entitySet
            const nameAttr = entitySetNameAttrMap[entitySetName]

            let valid = false
            let newName

            while (!valid) {
              if (newName == null) {
                newName = getCloneName(item[nameAttr])
              } else {
                newName = getCloneName(newName)
              }

              const found = await reporter.documentStore.collection(entitySetName).findOne({
                [nameAttr]: newName
              })

              valid = found == null
            }

            const newEntity = {
              ...omit(item, ['_id', 'shortid', '__entitySet', target.referenceProperty]),
              [nameAttr]: newName
            }

            if (source.id === item._id) {
              newEntity[target.referenceProperty] = {
                shortid: target.shortid
              }
            }

            const result = await reporter.documentStore.collection(entitySetName).insert(newEntity)

            result.__entitySet = item.__entitySet

            newHierarchyMap[result._id] = { old: item, new: result, entitySet: result.__entitySet }

            newItems.push(result)
          }))

          await Promise.all(newItems.map(async (newItem) => {
            const newEntityRecord = newHierarchyMap[newItem._id]
            let newShortid = null

            if (newItem[target.referenceProperty] != null) {
              return
            }

            Object.keys(newHierarchyMap).some((newId) => {
              const currentItemRecord = newHierarchyMap[newId]

              if (
                newEntityRecord.old[target.referenceProperty] != null &&
                newEntityRecord.old[target.referenceProperty].shortid === currentItemRecord.old.shortid
              ) {
                newShortid = currentItemRecord.new.shortid
                return true
              }

              return false
            })

            // updating in-memory representation
            newItem[target.referenceProperty] = {
              shortid: newShortid
            }

            return reporter.documentStore.collection(newEntityRecord.entitySet).update({
              _id: newItem._id
            }, {
              $set: {
                [target.referenceProperty]: {
                  shortid: newShortid
                }
              }
            })
          }))

          items = newItems
        }

        res.status(200).json({
          items
        })
      } catch (e) {
        res.status(400).end(e.message)
      }
    })

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
