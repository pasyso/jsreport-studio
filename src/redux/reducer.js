import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import entities from './entities/reducer'
import editor from './editor/reducer'
import progress from './progress/reducer'
import settings from './settings/reducer'

export default combineReducers({
  routing: routerReducer,
  entities,
  editor,
  progress,
  settings
})
