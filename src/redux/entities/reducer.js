import _omit from 'lodash/omit'
import createReducer from '../createReducer.js'
import * as ActionTypes from './constants.js'

const reducer = createReducer({})
export default reducer.export()

reducer.handleAction(ActionTypes.LOAD, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, state[action.entity._id], action.entity, {
    __isLoaded: true,
    __name: action.entity.name
  })
}))

reducer.handleAction(ActionTypes.UPDATE, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, state[action.entity._id], action.entity, { __isDirty: true })
}))

reducer.handleAction(ActionTypes.ADD, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, state[action.entity._id], action.entity, {
    __isDirty: true,
    __isNew: true,
    __name: action.entity.name
  })
}))

reducer.handleAction(ActionTypes.ADD_EXISTING, (state, action) => ({
  ...state,
  [action.entity._id]: Object.assign({}, action.entity, {
    __name: action.entity.name
  })
}))

reducer.handleAction(ActionTypes.SAVE, (state, action) => ({
  ...state,
  [action._id]: Object.assign({}, state[action._id], { __isDirty: false })
}))

reducer.handleAction(ActionTypes.SAVE_NEW, (state, action) => _omit({
  ...state,
  [action.entity._id]: Object.assign({}, state[action.oldId], action.entity, {
    __isDirty: false,
    __isNew: false
  })
}, action.oldId))

reducer.handleAction(ActionTypes.LOAD_REFERENCES, (state, action) => {
  let newStateRef = Object.assign({}, state)
  action.entities.forEach((e) => {
    e.__entitySet = action.entitySet
    e.__name = e.name
    newStateRef[e._id] = e
  })
  return newStateRef
})

reducer.handleAction(ActionTypes.SAVE, (state, action) => ({
  ...state,
  [action._id]: Object.assign({}, state[action._id], { __isDirty: false })
}))

reducer.handleAction(ActionTypes.REMOVE, (state, action) => _omit({ ...state }, action._id))

reducer.handleAction(ActionTypes.UNLOAD, (state, action) => ({
  ...state,
  [action._id]: {
    __isDirty: false,
    __isLoaded: false,
    __entitySet: state[action._id].__entitySet,
    __isNew: state[action._id].__isNew,
    __name: state[action._id].__name,
    name: state[action._id].__name,
    shortid: state[action._id].shortid,
    _id: action._id
  }
}))
