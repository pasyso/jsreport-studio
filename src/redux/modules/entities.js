export const LOAD = 'ENTITIES_LOAD'
export const SAVE = 'ENTITIES_SAVE'
export const UPDATE = 'ENTITIES_UPDATE'

import ApiClient from '../../helpers/ApiClient.js'
import Promise from 'bluebird'

let client = new ApiClient()

const initialState = {}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      const entitiesToLoad = state[action.entityType] || {}

      return {
        ...state,
        [action.entityType]: {
          ...entitiesToLoad,
          [action.entity._id]: action.entity
        }
      }
    case UPDATE:
      const entitiesToUpdate = state[action.entityType] || {}

      return {
        ...state,
        [action.entityType]: {
          ...entitiesToUpdate,
          [action.entity._id]: action.entity
        }
      }

    default:
      return state
  }
}

export const getById = (state, entityType, id) => state.entities[entityType] ? state.entities[entityType][id] : null

export function update (entityType, entity) {
  return (dispatch) => dispatch({
    type: UPDATE,
    entity: entity,
    entityType: entityType
  })
}

export function load (entityType, id) {
  return async function (dispatch, getState) {
    // there should be likely another check in the reducer or other lock preventing duplicated details
    if (!getById(getState())) {
      let response = await client.get(`/odata/${entityType}(${id})`)
      dispatch({
        type: LOAD,
        entityType: entityType,
        entity: response.value[ 0 ]
      })
    }

    return Promise.resolve()
  }
}
