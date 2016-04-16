import _omit from 'lodash/omit'
import createReducer from '../createReducer.js'
import * as ActionTypes from './constants.js'

const reducer = createReducer({})
export default reducer.export()

reducer.handleAction(ActionTypes.LOAD, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, state[ action.entity._id ], action.entity, {
    __isLoaded: true
  })
}))

reducer.handleAction(ActionTypes.UPDATE, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, state[ action.entity._id ], action.entity, { __isDirty: true })
}))

reducer.handleAction(ActionTypes.ADD, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, state[ action.entity._id ], action.entity, {
    __isDirty: true,
    __isNew: true
  })
}))

reducer.handleAction(ActionTypes.SAVE, (state, action) => ({
  ...state,
  [action._id]: Object.assign({}, state[ action._id ], { __isDirty: false })
}))

reducer.handleAction(ActionTypes.SAVE_NEW, (state, action) => _omit({
  ...state,
  [action.entity._id]: Object.assign({}, state[ action.oldId ], action.entity, {
    __isDirty: false,
    __isNew: false
  })
}, action.oldId))

reducer.handleAction(ActionTypes.LOAD_REFERENCES, (state, action) => {
  let newStateRef = Object.assign({}, state)
  action.entities.forEach((e) => {
    e.__entityType = action.entityType
    newStateRef[ e._id ] = e
  })
  return newStateRef
})

reducer.handleAction(ActionTypes.SAVE, (state, action) => ({
  ...state,
  [action._id]: Object.assign({}, state[ action._id ], { __isDirty: false })
}))

reducer.handleAction(ActionTypes.REMOVE, (state, action) => _omit({ ...state }, action._id))

reducer.handleAction(ActionTypes.UNLOAD, (state, action) => ({
  ...state,
  [action._id]: Object.assign({}, state[ action._id ], { __isDirty: false, __isLoaded: false })
}))
