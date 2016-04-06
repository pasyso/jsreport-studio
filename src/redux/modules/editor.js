import { fetchObjectDetail } from './objectDetails.js'
import uid from '../../helpers/uid.js'
import ApiClient from '../../helpers/ApiClient.js'
let client = new ApiClient()

const OPEN_TAB = 'OPEN_TAB'
const CLOSE_TAB = 'CLOSE_TAB'
const ACTIVATE_TAB = 'ACTIVATE_TAB'
const OPEN_NEW_TAB = 'OPEN_NEW_TAB'

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
    case OPEN_NEW_TAB:
      let id = uid()
      return {
        ...state,
        activeTab: id,
        tabs: [ ...state.tabs, { objectType: action.objectType, _id: id, name: 'New ' + action.objectType } ]
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
  return async function (dispatch, getState) {
    await fetchObjectDetail(objectType, id)(dispatch, getState)

    dispatch({
      type: OPEN_TAB,
      _id: id,
      objectType: objectType
    })
    dispatch({
      type: ACTIVATE_TAB,
      _id: id
    })
  }
}

export function save () {
  return async function (dispatch, getState) {
    let editorState = getState().editor
    let objectDetailsState = getState().objectDetails

    let tab = editorState.tabs.filter((t) => t._id === editorState.activeTab)[ 0 ]
    let object = objectDetailsState[ tab.objectType ].filter((o) => o._id === tab._id)[ 0 ]

    let response = await client.patch(`/odata/${tab.objectType}(${tab._id})`, { data: object })
  }
}

export function openNewTab (objectType) {
  return (dispatch) => dispatch({
    type: OPEN_NEW_TAB,
    objectType: objectType
  })
}

export function activateTab (id) {
  return (dispatch) => dispatch({
    type: ACTIVATE_TAB,
    _id: id
  })
}
