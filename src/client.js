import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './redux/create'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import getRoutes from './routes'
import fetchExtension from 'lib/fetchExtensions'
import './theme/style.scss'
import * as entities from 'redux/entities'
import Promise from 'bluebird'
import jsreport from './jsreport'

import { syncHistoryWithStore } from 'react-router-redux'
window.React = React

const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

var studio = window.studio = jsreport(store)

const start = async () => {
  await fetchExtension()
  await Promise.all(studio.entityTypes.map((t) => entities.actions.loadReferences(t)(store.dispatch)))

  studio.recipes = await studio.api.get('/api/recipe')
  studio.engines = await studio.api.get('/api/engine')

  const routes = getRoutes(window.studio.routes)

  let component = <Router history={history}>{routes}</Router>

  ReactDOM.render(
    <Provider store={store} key='provider'>
      {component}
    </Provider>,
    document.getElementById('content')
  )
}

start()
