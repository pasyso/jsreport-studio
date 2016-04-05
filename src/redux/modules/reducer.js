import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import objectDetails from './objectDetails'
import objectReferences from './objectReferences'
import editor from './editor'
import templates from './templates'

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  editor,
  templates,
  objectDetails,
  objectReferences
})
