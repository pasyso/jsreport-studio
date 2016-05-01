import 'should'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../../src/redux/reducer'
import thunk from 'redux-thunk'
import { stub as api } from '../../src/helpers/api.js'
import * as configuration from '../../src/lib/configuration.js'

export const itAsync = (name, fn) => {
  it(name, (done) => {
    fn().then(done).catch(done)
  })
}

const actionHistoryMiddleware = (history) => ({ dispatch, getState }) => (next) => (action) => {
  history[ action.type ] = action
  next(action)
}

export const describeAsyncStore = (name, nestedDescribe) => {
  let store = {}
  let history = {}

  describe(name, () => {
    beforeEach(() => {
      Object.keys(history).forEach((a) => delete history[ a ])
      configuration.entitySets = { 'testEntity': {} }

      let _store = createStore(reducer, applyMiddleware(thunk, actionHistoryMiddleware(history)))

      store.getState = _store.getState
      store.dispatch = _store.dispatch
    })

    nestedDescribe({ store: store, api: api, history: history })
  })
}

