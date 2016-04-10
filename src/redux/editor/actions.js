import * as entities from '../entities'
import * as ActionTypes from './constants.js'
import uid from '../../helpers/uid.js'

export function closeTab (id) {
  return (dispatch) => dispatch({
    type: ActionTypes.CLOSE_TAB,
    _id: id
  })
}

export function openTab (id) {
  return async function (dispatch, getState) {
    await entities.actions.load(id)(dispatch, getState)

    dispatch({
      type: ActionTypes.OPEN_TAB,
      _id: id
    })
    dispatch({
      type: ActionTypes.ACTIVATE_TAB,
      _id: id
    })
  }
}

export function openNewTab (entityType) {
  return (dispatch) => {
    let id = uid()
    dispatch(entities.actions.add({ _id: id, __entityType: entityType, name: 'New ' + entityType }))
    dispatch({
      type: ActionTypes.OPEN_NEW_TAB,
      _id: id,
      entityType: entityType
    })
  }
}

export function activateTab (id) {
  return (dispatch) => dispatch({
    type: ActionTypes.ACTIVATE_TAB,
    _id: id
  })
}

export function update (entity) {
  return async function (dispatch, getState) {
    await entities.actions.update(entity)(dispatch, getState)
  }
}

export function save () {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: ActionTypes.SAVE_STARTED
      })
      await entities.actions.save(getState().editor.activeTab)(dispatch, getState)
      dispatch({
        type: ActionTypes.SAVE_SUCCESS
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
        type: ActionTypes.SAVE_STARTED
      })

      await Promise.all(getState().editor.tabs.map((t) => entities.actions.save(t)(dispatch, getState)))

      dispatch({
        type: ActionTypes.SAVE_SUCCESS
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export function remove () {
  return async function (dispatch, getState) {
    await dispatch(entities.actions.remove(getState().editor.activeTab))
  }
}