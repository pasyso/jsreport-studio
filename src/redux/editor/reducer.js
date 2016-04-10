import * as ActionTypes from './constants.js'
import { ActionTypes as EntityActionTypes } from '../entities'

const initialState = {
  tabs: [],
  activeTab: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.OPEN_TAB:
      return {
        ...state,
        tabs: state.tabs.includes(action._id) ? state.tabs : [ ...state.tabs, action._id ]
      }
    case ActionTypes.OPEN_NEW_TAB:
      return {
        ...state,
        activeTab: action._id,
        tabs: [ ...state.tabs, action._id ]
      }
    case EntityActionTypes.REMOVE:
    case ActionTypes.CLOSE_TAB:
      let newTabs = state.tabs.filter((t) => t !== action._id)
      let newActivatTab = state.activeTab
      if (state.activeTab === action._id) {
        newActivatTab = newTabs.length ? newTabs[ newTabs.length - 1 ] : null
      }

      return {
        ...state,
        activeTab: newActivatTab,
        tabs: newTabs
      }
    case ActionTypes.ACTIVATE_TAB:
      return {
        ...state,
        activeTab: action._id
      }
    case EntityActionTypes.SAVE_NEW:
      let index = state.tabs.indexOf(action.oldId)

      return {
        tabs: [
          ...state.tabs.slice(0, index),
          action.entity._id,
          ...state.tabs.slice(index + 1) ],
        activeTab: action.entity._id
      }
    case ActionTypes.SAVE_STARTED:
      return {
        ...state,
        isSaving: true
      }
    case ActionTypes.SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false
      }
    default:
      return state
  }
}