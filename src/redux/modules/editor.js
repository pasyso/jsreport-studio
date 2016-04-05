import { fetchObjectDetail } from './objectDetails.js'

const OPEN_TAB = 'OPEN_TAB'
const CLOSE_TAB = 'CLOSE_TAB'
const ACTIVATE_TAB = 'ACTIVATE_TAB'

const initialState = {
  tabs: [],
  activeTab: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((t) => t._id === action._id).length ? state.tabs : [ ...state.tabs, {
          _id: action._id,
          objectType: action.objectType
        } ]
      }
    case CLOSE_TAB:
      let newTabs = state.tabs.filter((t) => t._id !== action._id)
      let newActivatTab = state.activeTab
      if (state.activeTab === action._id) {
        newActivatTab = newTabs.length ? newTabs[ newTabs.length - 1 ] : null
      }

      return {
        activeTab: newActivatTab,
        tabs: newTabs
      }
    case ACTIVATE_TAB:
      return {
        ...state,
        activeTab: action._id
      }
    default:
      return state
  }
}

export function closeTab (id) {
  return (dispatch) => dispatch({
    type: CLOSE_TAB,
    _id: id
  })
}

export function openTab (objectType, id) {
  return (dispatch, getState) => {
    return fetchObjectDetail(objectType, id)(dispatch, getState).then(function () {
      dispatch({
        type: OPEN_TAB,
        _id: id,
        objectType: objectType
      })
      dispatch({
        type: ACTIVATE_TAB,
        _id: id
      })
    })
  }
}

export function activateTab (id) {
  return (dispatch) => dispatch({
    type: ACTIVATE_TAB,
    _id: id
  })
}
