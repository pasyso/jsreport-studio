import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import entities from './entities'
import references from './references'
import editor from './editor'

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  editor,
  entities,
  references
})
