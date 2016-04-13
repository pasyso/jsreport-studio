import 'should'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../../src/redux/reducer'
import { stub as api } from '../../src/helpers/api.js'
import Promise from 'bluebird'

export const itAsync = (name, fn) => {
  it(name, (done) => {
    fn().then(done).catch(done)
  })
}

// this enhanced middlaware is checking the action output promise and if it fails, it returns flow back to the test caller
const safeThunkMiddleware = (reject) => ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (typeof action === 'function') {
      let res = action(dispatch, getState)
      if (res && typeof res.catch === 'function') {
        res.catch((e) => {
          console.error(e)
          reject(e)
        })
      }
      return res
    }

    return next(action)
  }
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

      let res
      let rej
      let _store = createStore(reducer, applyMiddleware(actionHistoryMiddleware(history), safeThunkMiddleware((e) => rej(e))))

      _store.subscribe(() => {
        res(_store.getState())
      })

      store.getState = _store.getState
      store.dispatchAsync = (a) => {
        const promise = new Promise((resolve, reject) => {
          res = resolve
          rej = reject
        })
        _store.dispatch(a)
        return promise
      }
    })

    nestedDescribe({ store: store, api: api, history: history })
  })
}

