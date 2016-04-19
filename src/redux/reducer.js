import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import entities from './entities/reducer'
import editor from './editor/reducer'
import modal from './modal/reducer'
import progress from './progress/reducer'

export default combineReducers({
  routing: routerReducer,
  entities,
  editor,
  progress,
  modal
})
