import * as entities from '../entities'
import * as ActionTypes from './constants.js'
import uid from '../../helpers/uid.js'
import * as selectors from './selectors.js'
import { push } from 'react-router-redux'

export function closeTab (id) {
  return (dispatch) => dispatch({
    type: ActionTypes.CLOSE_TAB,
    key: id
  })
}

export function openTab (tab) {
  return async function (dispatch, getState) {
    if (tab.shortid) {
      tab._id = entities.selectors.getByShortid(getState(), tab.shortid)._id
    }

    if (tab._id) {
      await entities.actions.load(tab._id)(dispatch, getState)
    }

    tab.type = tab._id ? 'entity' : 'custom'
    tab.key = tab.key || tab._id

    dispatch({
      type: ActionTypes.OPEN_TAB,
      tab: tab
    })

    dispatch({
      type: ActionTypes.ACTIVATE_TAB,
      key: tab.key
    })
  }
}

export function openNewTab (entityType) {
  return (dispatch) => {
    let id = uid()
    dispatch(entities.actions.add({ _id: id, __entityType: entityType, name: 'New ' + entityType }))
    dispatch({
      type: ActionTypes.OPEN_NEW_TAB,
      tab: {
        _id: id,
        key: id,
        type: 'entity'
      }
    })
  }
}

export function activateTab (id) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.ACTIVATE_TAB,
      key: id
    })
  }
}

export function updateHistory () {
  return (dispatch, getState) => {
    const entity = selectors.getActiveEntity(getState())
    let path
    if (entity && entity.shortid) {
      path = `/studio/${entity.__entityType}/${entity.shortid}`
    } else {
      path = '/'
    }

    if (path !== getState().routing.locationBeforeTransitions.pathname) {
      dispatch(push(path))
    }
  }
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
      await entities.actions.save(selectors.getActiveTab(getState())._id)(dispatch, getState)
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

      await Promise.all(getState().editor.tabs.filter((t) => t.type === 'entity').map((t) => entities.actions.save(t._id)(dispatch, getState)))

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
    const tab = selectors.getActiveTab(getState())
    await dispatch(entities.actions.remove(tab._id))
  }
}