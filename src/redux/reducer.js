import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import entities from './entities/reducer'
import editor from './editor/reducer'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  entities,
  editor
})
