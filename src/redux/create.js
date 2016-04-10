import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { syncHistory } from 'react-router-redux'
import invariant from 'redux-immutable-state-invariant'
import { enableBatching } from 'redux-batched-actions'

const logger = createLogger()

export default function createStore (history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history)

  const middleware = [ invariant(), thunk, reduxRouterMiddleware, logger ]

  let finalCreateStore
  if (__DEVELOPMENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools')
    const DevTools = require('../containers/DevTools/DevTools')
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore)
  }

  const reducer = require('./reducer')
  const store = finalCreateStore(enableBatching(reducer), data)

  reduxRouterMiddleware.listenForReplays(store)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'))
    })
  }

  return store
}
