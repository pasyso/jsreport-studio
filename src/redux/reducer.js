import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import entities from './entities/reducer'
import editor from './editor/reducer'

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  entities,
  editor
})
