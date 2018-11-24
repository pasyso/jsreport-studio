import * as ActionTypes from './constants.js'
import api from '../../helpers/api.js'
import getVisibleEntitySetsInTree from '../../helpers/getVisibleEntitySetsInTree'
import * as selectors from './selectors.js'
import { entitySets, referencesLoader } from '../../lib/configuration.js'

export const prune = (entity) => {
  let pruned = {}
  Object.keys(entity).forEach((k) => {
    if (k.indexOf('__') !== 0 && k.indexOf('@')) {
      pruned[k] = entity[k]
    }
  })

  return pruned
}

export function update (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to update')
  }

  return (dispatch) => dispatch({
    type: ActionTypes.UPDATE,
    entity: entity
  })
}

export function groupedUpdate (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to debounced update')
  }

  return (dispatch) => dispatch({
    type: ActionTypes.GROUPED_UPDATE,
    entity: entity
  })
}

export function remove (id, children) {
  return async function (dispatch, getState) {
    const entity = selectors.getById(getState(), id)

    if (entity.__isNew) {
      return dispatch({
        type: ActionTypes.REMOVE,
        _id: id,
        children
      })
    }

    dispatch(apiStart())
    try {
      await api.del(`/odata/${entity.__entitySet}(${id})`)

      dispatch({
        type: ActionTypes.REMOVE,
        _id: id,
        children
      })

      dispatch(apiDone())
    } catch (e) {
      dispatch(apiFailed(e))
      throw e
    }
  }
}

export function removeExisting (id, children) {
  return (dispatch) => dispatch({
    type: ActionTypes.REMOVE,
    _id: id,
    children
  })
}

export function add (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to add')
  }

  return (dispatch) => dispatch({
    type: ActionTypes.ADD,
    entity: entity
  })
}

export function addExisting (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to add')
  }

  return (dispatch) => dispatch({
    type: ActionTypes.ADD_EXISTING,
    entity: entity
  })
}

export function load (id, force) {
  return async function (dispatch, getState) {
    let entity = selectors.getById(getState(), id)

    if (!force && (entity.__isLoaded || entity.__isNew)) {
      return
    }

    dispatch(apiStart())
    try {
      entity = (await api.get(`/odata/${entity.__entitySet}(${id})`)).value[0]

      dispatch(apiDone())

      dispatch({
        type: ActionTypes.LOAD,
        entity: entity
      })
    } catch (e) {
      dispatch(apiFailed(e))
      throw e
    }
  }
}

export function loadChildren (id, force) {
  return async function (dispatch, getState) {
    let entity = selectors.getById(getState(), id)

    if (!force && (entity.__childrenLoaded || entity.__isNew)) {
      return
    }

    dispatch(apiStart())
    try {
      const setsToLoad = [entitySets.folders, ...getVisibleEntitySetsInTree(entitySets)]
      const requests = []
      let requestResults
      let children = []

      setsToLoad.forEach((entitySet) => {
        const nameAttribute = entitySet.nameAttribute
        const referenceAttributes = entitySet.referenceAttributes
        requests.push(
          api.get(`/odata/${entitySet.name}?$filter=folder/shortid eq '${entity.shortid}'&$select=${referenceAttributes}&$orderby=${nameAttribute}`)
          .then((r) => r.value.map((e) => Object.assign({}, e, { __entitySet: entitySet.name })))
        )
      })

      requestResults = await Promise.all(requests)

      requestResults.forEach((result) => {
        result.forEach((e) => children.push(e))
      })

      dispatch(apiDone())

      dispatch({
        type: ActionTypes.LOAD_CHILDREN,
        entity: entity,
        children
      })
    } catch (e) {
      dispatch(apiFailed(e))
      throw e
    }
  }
}

export function unload (id) {
  return async function (dispatch, getState) {
    return dispatch({
      type: ActionTypes.UNLOAD,
      _id: id
    })
  }
}

export function unloadAll () {
  return async function (dispatch, getState) {
    return dispatch({
      type: ActionTypes.UNLOAD_ALL
    })
  }
}

export function loadReferences (entitySet, lazy = true) {
  return async function (dispatch) {
    let entities

    if (referencesLoader) {
      entities = await referencesLoader(entitySet, lazy)
    } else {
      const nameAttribute = entitySets[entitySet].nameAttribute
      const referenceAttributes = entitySets[entitySet].referenceAttributes

      let entitiesUrl

      if (lazy === true) {
        entitiesUrl = `/odata/${entitySet}?$filter=folder eq null&$select=${referenceAttributes}&$orderby=${nameAttribute}`
      } else {
        entitiesUrl = `/odata/${entitySet}?$select=${referenceAttributes}&$orderby=${nameAttribute}`
      }

      entities = (await api.get(entitiesUrl)).value
    }

    dispatch({
      type: ActionTypes.LOAD_REFERENCES,
      entities: entities,
      entitySet: entitySet,
      lazy
    })
  }
}

export const flushUpdates = () => ({
  type: ActionTypes.FLUSH_UPDATES
})

export const apiDone = () => ({
  type: ActionTypes.API_DONE
})

export const apiStart = () => ({
  type: ActionTypes.API_START
})

export const apiFailed = (e) => ({
  type: ActionTypes.API_FAILED,
  error: e
})

export const replace = (oldId, entity) => ({
  type: ActionTypes.REPLACE,
  oldId: oldId,
  entity: entity
})

export function save (id) {
  return async function (dispatch, getState) {
    try {
      const entity = Object.assign({}, selectors.getById(getState(), id))
      dispatch(apiStart())

      if (entity.__isNew) {
        const oldId = entity._id
        delete entity._id
        const response = await api.post(`/odata/${entity.__entitySet}`, { data: prune(entity) })
        entity._id = response._id
        dispatch(apiDone())
        dispatch({
          type: ActionTypes.SAVE_NEW,
          oldId: oldId,
          entity: response
        })
        entity._id = response._id
      } else {
        await api.patch(`/odata/${entity.__entitySet}(${entity._id})`, { data: prune(entity) })
        dispatch(apiDone())
        dispatch({
          type: ActionTypes.SAVE,
          _id: entity._id
        })
      }

      return entity
    } catch (e) {
      dispatch(apiFailed(e))
      throw e
    }
  }
}
