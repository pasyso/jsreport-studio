import * as ActionTypes from './constants.js'
import ApiClient from '../../helpers/ApiClient.js'
import * as selectors from './selectors.js'
let client = new ApiClient()


export function update (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to update')
  }

  return (dispatch) => dispatch({
    type: ActionTypes.UPDATE,
    entity: entity
  })
}

export function remove (id) {
  return async function (dispatch, getState) {
    const entity = selectors.getById(getState(), id)
    await client.del(`/odata/${entity.__entityType}(${id})`)

    return dispatch({
      type: ActionTypes.REMOVE,
      _id: id
    })
  }
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

export function load (id) {
  return async function (dispatch, getState) {
    let entity = selectors.getById(getState(), id)
    if (!entity.__isLoaded && !entity.__isNew) {
      entity = (await client.get(`/odata/${entity.__entityType}(${id})`)).value[ 0 ]
    }
    dispatch({
      type: ActionTypes.LOAD,
      entity: entity
    })
  }
}

export function loadReferences (entityType) {
  return async function (dispatch) {
    let response = await client.get(`/odata/${entityType}?$select=name,shortid`)
    dispatch({
      type: ActionTypes.LOAD_REFERENCES,
      entities: response.value,
      entityType: entityType
    })
  }
}

export function save (id) {
  return async function (dispatch, getState) {
    try {
      const entity = Object.assign({}, selectors.getById(getState(), id))

      if (entity.__isNew) {
        const oldId = entity._id
        delete entity._id
        const response = await client.post(`/odata/${entity.__entityType}`, { data: entity })
        entity._id = response._id
        dispatch({
          type: ActionTypes.SAVE_NEW,
          oldId: oldId,
          entity: response
        })
        entity._id = response._id
      } else {
        await client.patch(`/odata/${entity.__entityType}(${entity._id})`, { data: entity })
        dispatch({
          type: ActionTypes.SAVE,
          _id: entity._id
        })
      }

      return entity
    } catch (e) {
      console.error(e)
    }
  }
}
