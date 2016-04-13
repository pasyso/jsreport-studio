import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import entities from './entities/reducer'
import editor from './editor/reducer'

export default combineReducers({
  routing: routerReducer,
  entities,
  editor
})
