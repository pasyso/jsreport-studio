import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import getRoutes from './routes'
import fetchExtension from './fetchExtensions'
import './theme/style.scss'
import ApiClient from './helpers/ApiClient.js'
import AceEditor from 'react-ace'
import * as entities from './redux/modules/entities.js'
import Promise from 'bluebird'

window.React = React

const history = useScroll(() => browserHistory)()
const store = createStore(history)

var studio = window.studio = {
  routes: [],
  runtime: {},
  react: React,
  properties: [],
  api: new ApiClient(),
  detailComponents: {},
  references: {},
  initializeListeners: [],
  AceEditor: AceEditor,
  entityTypes: [ 'templates' ]
}

studio.runtime[ 'core-js/object/get-prototype-of' ] = require('babel-runtime/core-js/object/get-prototype-of')
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

fetchExtension(function () {
  //studio.initializeListeners[ 0 ](function () {
    Promise.all(studio.entityTypes.map((t) => entities.loadReferences(t)(store.dispatch))).then(start)
  //})
})