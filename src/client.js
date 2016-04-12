import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import getRoutes from './routes'
import fetchExtension from './fetchExtensions'
import './theme/style.scss'
import ApiClient from './helpers/ApiClient.js'
import AceEditor from 'react-ace'
import * as entities from 'redux/entities'
import * as editor from 'redux/editor'
import Promise from 'bluebird'
import TemplateEditor from './components/Editor/TemplateEditor.js'
import TemplateProperties from './components/Properties/TemplateProperties.js'
import Startup from './containers/Startup/Startup.js'
import { syncHistoryWithStore } from 'react-router-redux'

window.React = React

const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

var studio = window.studio = {
  editor: editor,
  dispatch: store.dispatch,
  routes: [],
  runtime: {},
  react: React,
  properties: [TemplateProperties],
  api: new ApiClient(),
  detailComponents: { templates: TemplateEditor, startup: Startup },
  references: {},
  initializeListeners: [],
  AceEditor: AceEditor,
  entityTypes: [ 'templates' ]
}

studio.runtime[ 'core-js/object/get-prototype-of' ] = require('babel-runtime/core-js/object/get-prototype-of')
studio.runtime[ 'core-js/object/keys' ] = require('babel-runtime/core-js/object/keys')
studio.runtime[ 'helpers/classCallCheck' ] = require('babel-runtime/helpers/classCallCheck')
studio.runtime[ 'helpers/createClass' ] = require('babel-runtime/helpers/createClass')
studio.runtime[ 'helpers/possibleConstructorReturn' ] = require('babel-runtime/helpers/possibleConstructorReturn')
studio.runtime[ 'helpers/inherits' ] = require('babel-runtime/helpers/inherits')

function start () {
  console.log('getting routes from ', window.studio.routes)
  const routes = getRoutes(window.studio.routes)

  let component = <Router history={history}>{routes}</Router>

  ReactDOM.render(
    <Provider store={store} key='provider'>
      {component}
    </Provider>,
    document.getElementById('content')
  )

  //if (__DEVTOOLS__ && !window.devToolsExtension) {
  //  const DevTools = require('./containers/DevTools/DevTools')
  //  ReactDOM.render(
  //    <Provider store={store} key='provider'>
  //      <div>
  //        {component}
  //        <DevTools />
  //      </div>
  //    </Provider>,
  //    document.getElementById('content')
  //  )
  //}
}

fetchExtension(async function () {
  //studio.initializeListeners[ 0 ](function () {
  await Promise.all(studio.entityTypes.map((t) => entities.actions.loadReferences(t)(store.dispatch)))

  studio.recipes = await studio.api.get('/api/recipe')
  studio.engines = await studio.api.get('/api/engine')
  start()
  //})
})