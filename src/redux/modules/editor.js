import * as entities from './entities.js'
import uid from '../../helpers/uid.js'
import ApiClient from '../../helpers/ApiClient.js'
let client = new ApiClient()

const OPEN_TAB = 'EDITOR_OPEN_TAB'
const CLOSE_TAB = 'EDITOR_CLOSE_TAB'
const ACTIVATE_TAB = 'EDITOR_ACTIVATE_TAB'
const OPEN_NEW_TAB = 'EDITOR_OPEN_NEW_TAB'
const SAVE_NEW = 'EDITOR_SAVE_NEW'

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
          entityType: action.entityType
        } ]
      }
    case OPEN_NEW_TAB:
      return {
        ...state,
        activeTab: action._id,
        tabs: [ ...state.tabs, { entityType: action.entityType, _id: action._id, name: 'New ' + action.entityType } ]
      }
    case CLOSE_TAB:
      let newTabs = state.tabs.filter((t) => t._id !== action._id)
      let newActivatTab = state.activeTab
      if (state.activeTab === action._id) {
        newActivatTab = newTabs.length ? newTabs[ newTabs.length - 1 ]._id : null
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
    case SAVE_NEW:
      let index = state.tabs.indexOf((t) => t._id === action.oldId)

      return {
        tabs: [
          ...state.tabs.slice(0, index),
          { _id: action.newId, entityType: action.entityType, name: action.name },
          ...state.tabs.slice(index + 1) ],
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

export function openTab (entityType, id) {
  return async function (dispatch, getState) {
    await entities.load(entityType, id)(dispatch, getState)

    dispatch({
      type: OPEN_TAB,
      _id: id,
      entityType: entityType
    })
    dispatch({
      type: ACTIVATE_TAB,
      _id: id
    })
  }
}

export function save () {
  return async function (dispatch, getState) {
    let entity = Object.assign({}, getActiveEntity(getState()))
    const tab = getActiveTab(getState())

    if (entity.__isNew) {
      let oldId = entity._id
      delete entity._id
      let response = await client.post(`/odata/${tab.entityType}`, { data: entity })
      entity._id = response._id
      entity.__isNew = false
      dispatch({
        type: SAVE_NEW,
        oldId: oldId,
        newId: entity._id,
        entityType: tab.entityType,
        name: entity.name
      })
    } else {
      await client.patch(`/odata/${tab.entityType}(${tab._id})`, { data: entity })
    }

    entities.update(tab.entityType, entity)
  }
}

export function remove (id) {
  return async function (dispatch, getState) {
    const tab = getState().editor.tabs.filter((t) => t._id === id)[ 0 ]
  }
}

export const getTabWithEntities = (state) => state.editor.tabs.map((t) => Object.assign({}, t, state.entities[ t.entityType ][ t._id ]))
export const getActiveTab = (state) => state.editor.activeTab ? state.editor.tabs.filter((t) => t._id === state.editor.activeTab)[ 0 ] : null

export const getActiveEntity = (state) => {
  if (!state.editor.activeTab) {
    return null
  }

  const currentTab = state.editor.tabs.filter((t) => t._id === state.editor.activeTab)[ 0 ]

  return state.entities[ currentTab.entityType ][ currentTab._id ]
}

export function openNewTab (entityType) {
  return (dispatch) => {
    let id = uid()
    dispatch(entities.update(entityType, { _id: id, __isNew: true }))
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
