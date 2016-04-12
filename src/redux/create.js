import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import invariant from 'redux-immutable-state-invariant'
import { enableBatching } from 'redux-batched-actions'

const logger = createLogger()

export default function createStore (history) {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = [ invariant(), thunk, reduxRouterMiddleware, logger ]

  let finalCreateStore
  if (__DEVELOPMENT__) {
    const { persistState } = require('redux-devtools')
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore)
  }

  const reducer = require('./reducer')
  const store = finalCreateStore(enableBatching(reducer))

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'))
    })
  }

  return store
}
