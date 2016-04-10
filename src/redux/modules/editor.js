import * as entities from './entities.js'
import uid from '../../helpers/uid.js'

const OPEN_TAB = 'EDITOR_OPEN_TAB'
const CLOSE_TAB = 'EDITOR_CLOSE_TAB'
const ACTIVATE_TAB = 'EDITOR_ACTIVATE_TAB'
const OPEN_NEW_TAB = 'EDITOR_OPEN_NEW_TAB'
const OPEN_TAB_STARTED = 'EDITOR_OPEN_TAB_STARTED'
const SAVE_STARTED = 'EDITOR_SAVE_STARTED'
const SAVE_SUCCESS = 'EDITOR_SAVE_SUCCESS'

const initialState = {
  tabs: [],
  activeTab: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_TAB:
      return {
        ...state,
        tabs: state.tabs.includes(action._id) ? state.tabs : [ ...state.tabs, action._id ]
      }
    case OPEN_NEW_TAB:
      return {
        ...state,
        activeTab: action._id,
        tabs: [ ...state.tabs, action._id ]
      }
    case entities.REMOVE:
    case CLOSE_TAB:
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
    case ACTIVATE_TAB:
      return {
        ...state,
        activeTab: action._id
      }
    case entities.SAVE_NEW:
      let index = state.tabs.indexOf(action.oldId)

      return {
        tabs: [
          ...state.tabs.slice(0, index),
          action.entity._id,
          ...state.tabs.slice(index + 1) ],
        activeTab: action.entity._id
      }
    case SAVE_STARTED:
      return {
        ...state,
        isSaving: true
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false
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

export function openTab (id) {
  return async function (dispatch, getState) {
    await entities.load(id)(dispatch, getState)

    dispatch({
      type: OPEN_TAB,
      _id: id
    })
    dispatch({
      type: ACTIVATE_TAB,
      _id: id
    })
  }
}

export function openNewTab (entityType) {
  return (dispatch) => {
    let id = uid()
    dispatch(entities.add({ _id: id, __entityType: entityType, name: 'New ' + entityType }))
    dispatch({
      type: OPEN_NEW_TAB,
      _id: id,
      entityType: entityType
    })
  }
}

export function activateTab (id) {
  return (dispatch) => dispatch({
    type: ACTIVATE_TAB,
    _id: id
  })
}

export function update (entity) {
  return async function (dispatch, getState) {
    await entities.update(entity)(dispatch, getState)
  }
}

export function save () {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: SAVE_STARTED
      })
      await entities.save(getState().editor.activeTab)(dispatch, getState)
      dispatch({
        type: SAVE_SUCCESS
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export function saveAll () {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: SAVE_STARTED
      })

      await Promise.all(getState().editor.tabs.map((t) => entities.save(t)(dispatch, getState)))

      dispatch({
        type: SAVE_SUCCESS
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export function remove () {
  return async function (dispatch, getState) {
    await dispatch(entities.remove(getState().editor.activeTab))
  }
}

export const getTabWithEntities = (state) => state.editor.tabs.map((t) => entities.getById(state, t))
export const getActiveTab = (state) => state.editor.activeTab ? state.editor.tabs.filter((t) => t._id === state.editor.activeTab)[ 0 ] : null

export const getActiveEntity = (state) => {
  if (!state.editor.activeTab) {
    return null
  }

  return entities.getById(state, state.editor.activeTab)
}

