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
import StudioInst, { init } from './Studio'

import { syncHistoryWithStore } from 'react-router-redux'
window.React = React

const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

var Studio = window.Studio = StudioInst
init(store)

const start = async () => {
  await fetchExtension()
  await Promise.all(
    [ ...Studio.entityTypes.map((t) => entities.actions.loadReferences(t)(store.dispatch)),
      Studio.api.get('/api/engine').then((engines) => (Studio.engines = engines)),
      Studio.api.get('/api/recipe').then((recipes) => (Studio.recipes = recipes))
    ]
  )

  const routes = getRoutes(window.Studio.routes)

  let component = <Router history={history}>{routes}</Router>

  ReactDOM.render(
    <Provider store={store} key='provider'>
      {component}
    </Provider>,
    document.getElementById('content')
  )
}

start()
