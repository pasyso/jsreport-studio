import * as ActionTypes from './constants.js'
import createReducer from '../createReducer.js'

const reducer = createReducer({})

export default reducer.export()

reducer.handleAction([ActionTypes.SETTINGS_LOAD], (state, action) => {
  let newState = {}
  action.settings.forEach((s) => (newState[s.key] = s.value))
  return newState
})
