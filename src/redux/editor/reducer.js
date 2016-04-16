import * as ActionTypes from './constants.js'
import { ActionTypes as EntityActionTypes } from '../entities'
import createReducer from '../createReducer.js'

const reducer = createReducer({
  tabs: [],
  activeTab: null
})
export default reducer.export()

reducer.handleAction(ActionTypes.OPEN_TAB, (state, { tab }) => ({
  ...state,
  tabs: state.tabs.filter((t) => t.key === tab.key).length ? state.tabs : [ ...state.tabs, tab ]
}))

reducer.handleAction(ActionTypes.OPEN_NEW_TAB, (state, { tab }) => ({
  ...state,
  activeTab: tab.key,
  tabs: [ ...state.tabs, tab ]
}))

reducer.handleActions([EntityActionTypes.REMOVE, ActionTypes.CLOSE_TAB], (state, action) => {
  let newTabs = state.tabs.filter((t) => t.key !== action.key && (!action._id || t._id !== action._id))
  let newActivatTab = state.activeTab
  if (state.activeTab === action.key || state.activeTab === action._id) {
    newActivatTab = newTabs.length ? newTabs[ newTabs.length - 1 ].key : null
  }

  return {
    ...state,
    activeTab: newActivatTab,
    tabs: newTabs
  }
})

reducer.handleAction(ActionTypes.ACTIVATE_TAB, (state, action) => ({
  ...state,
  activeTab: action.key
}))

reducer.handleAction(EntityActionTypes.SAVE_NEW, (state, action) => {
  let index = state.tabs.indexOf(state.tabs.filter((t) => t.key === action.oldId)[0])
  const tab = Object.assign({}, state.tabs[index])
  tab.key = action.entity._id
  tab._id = tab.key

  return {
    tabs: [
      ...state.tabs.slice(0, index),
      tab,
      ...state.tabs.slice(index + 1) ],
    activeTab: action.entity._id
  }
})

reducer.handleAction(ActionTypes.SAVE_STARTED, (state, action) => ({
  ...state,
  isSaving: true
}))

reducer.handleAction(ActionTypes.SAVE_SUCCESS, (state, action) => ({
  ...state,
  isSaving: false
}))
