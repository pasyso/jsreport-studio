import 'babel-polyfill'
import Promise from 'bluebird'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactModal from 'react-modal'
import zipObject from 'lodash/zipObject'
import createStore from './redux/create'
import getRoutes from './routes'
import fetchExtensions from './lib/fetchExtensions'
import './theme/style.scss'
import * as entities from './redux/entities'
import * as settings from './redux/settings'
import * as configuration from './lib/configuration.js'
import { createStudio as createStudio } from './Studio'
import defaults from './configurationDefaults.js'
import getEntityTreeOrder from './helpers/getEntityTreeOrder'

import intl from 'react-intl-universal'
import cookies from 'js-cookie'

window.React = React

ReactModal.setAppElement(getAppElement())

__webpack_public_path__ = configuration.rootPath() + '/studio/assets/'

defaults()

const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

var Studio = window.Studio = createStudio(store)

const start = async () => {
  await fetchExtensions()

  const extensionsArray = await Studio.api.get('/api/extensions')
  configuration.extensions = zipObject(extensionsArray.map((e) => e.name), extensionsArray)

  for (const key in Studio.initializeListeners) {
    await Studio.initializeListeners[key]()
  }

  // add folders to referenceAttributes for all entities
  Object.keys(Studio.entitySets).forEach((entitySetName) => {
    let entitySet = Studio.entitySets[entitySetName]

    if (entitySet.referenceAttributes.indexOf('folder') === -1) {
      entitySet.referenceAttributes.push('folder')
    }
  })

  // calculate EntityTree order after initializeListeners
  configuration.entityTreeOrder = getEntityTreeOrder(
    configuration.extensions['studio'].options.entityTreeOrder,
    Studio.entitySets
  )

  const locales = {
    "en": require('./i18n/en.json'),
    "ru": require('./i18n/ru.json'),
  }

  const currentLocale = intl.determineLocale({urlLocaleKey: 'lang', cookieLocaleKey: 'lang'}).substr(0, 2)
  cookies.set('lang', currentLocale)

  await Promise.all(
    [
      // react-intl-universal is singleton, so you should init it only once in your app
      intl.init({
        currentLocale: currentLocale,
        locales
      }),
      ...Object.keys(Studio.entitySets).map((t) => entities.actions.loadReferences(t)(store.dispatch)),
      Studio.api.get('/api/engine').then((engs) => (configuration.engines = engs)),
      Studio.api.get('/api/recipe').then((recs) => (configuration.recipes = recs)),
      settings.actions.load()(store.dispatch)
    ]
  )

  const routes = getRoutes(window.Studio.routes)

  let component = <Router history={history}>{routes}</Router>

  ReactDOM.render(
    <Provider store={store} key='provider'>
      {component}
    </Provider>,
    getAppElement()
  )

  document.getElementById('loader').style.display = 'none'

  for (const key in Studio.readyListeners) {
    await Studio.readyListeners[key]()
  }
}

function getAppElement () {
  return document.getElementById('content')
}

start()
