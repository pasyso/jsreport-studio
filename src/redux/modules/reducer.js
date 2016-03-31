import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import studio from './studio'
import templates from './templates'

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  studio,
  templates
})
