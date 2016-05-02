import * as entities from '../entities'
import * as ActionTypes from './constants.js'
import uid from '../../helpers/uid.js'
import * as selectors from './selectors.js'
import { push } from 'react-router-redux'
import shortid from 'shortid'
import preview from '../../helpers/preview'
import { engines, recipes, entitySets, previewListeners } from '../../lib/configuration.js'

export function closeTab (id) {
  return async (dispatch, getState) => {
    const activeEntity = selectors.getActiveEntity(getState())

    if (activeEntity && activeEntity._id === id) {
      await entities.actions.unload(id)(dispatch, getState)
    }

    dispatch({
      type: ActionTypes.CLOSE_TAB,
      key: id
    })
  }
}

export function openTab (tab) {
  return async function (dispatch, getState) {
    if (tab.shortid && !tab._id) {
      try {
        tab._id = entities.selectors.getByShortid(getState(), tab.shortid)._id
      } catch (e) {
        dispatch(push('/'))
        return
      }
    }

    if (tab._id) {
      await entities.actions.load(tab._id)(dispatch, getState)
      tab.entitySet = entities.selectors.getById(getState(), tab._id).__entitySet
    }

    tab.type = tab._id ? 'entity' : 'custom'
    tab.key = tab.key || tab._id

    dispatch({
      type: ActionTypes.OPEN_TAB,
      tab: tab
    })

    dispatch(activateTab(tab.key))
  }
}

export function openNewTab ({ entitySet, name }) {
  return (dispatch) => {
    let id = uid()
    let entity = {
      _id: id,
      __entitySet: entitySet,
      shortid: shortid.generate(),
      [entitySets[entitySet].nameAttribute]: name
    }

    if (entitySet === 'templates') {
      entity.recipe = recipes.includes('phantom-pdf') ? 'phantom-pdf' : recipes[0]
      entity.engine = engines.includes('handlebars') ? 'handlebars' : engines[0]
    }

    dispatch(entities.actions.add(entity))
    dispatch({
      type: ActionTypes.OPEN_NEW_TAB,
      tab: {
        _id: id,
        key: id,
        entitySet: entitySet,
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
      path = `/studio/${entity.__entitySet}/${entity.shortid}`
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

export function run () {
  return async function (dispatch, getState) {
    let template = Object.assign({}, selectors.getLastActiveTemplate(getState()))
    let request = { template: template, options: {} }
    const entities = Object.assign({}, getState().entities)
    await Promise.all([...previewListeners.map((l) => l(request, entities))])
    dispatch({type: ActionTypes.RUN})
    preview(request, 'previewFrame')
  }
}

