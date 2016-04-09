import ApiClient from '../../helpers/ApiClient.js'
import _omit from 'lodash/object/omit'

export const LOAD = 'ENTITIES_LOAD'
export const ADD = 'ENTITIES_ADD'
export const SAVE = 'ENTITIES_SAVE'
export const SAVE_NEW = 'ENTITIES_SAVE_NEW'
export const UPDATE = 'ENTITIES_UPDATE'
export const LOAD_REFERENCES = 'LOAD_REFERENCES'
export const REMOVE = 'ENTITIES_REMOVE'

let client = new ApiClient()

const initialState = {}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.entity._id]: Object.assign({}, state[ action.entity._id ], action.entity, {
          __isDirty: false,
          __isLoaded: true
        })
      }
    case UPDATE:
      return {
        ...state,
        [action.entity._id]: Object.assign({}, state[ action.entity._id ], action.entity, { __isDirty: true })
      }
    case ADD:
      return {
        ...state,
        [action.entity._id]: Object.assign({}, state[ action.entity._id ], action.entity, {
          __isDirty: true,
          __isNew: true
        })
      }
    case SAVE:
      return {
        ...state,
        [action._id]: Object.assign({}, state[ action._id ], { __isDirty: false })
      }
    case SAVE_NEW:
      return _omit({
        ...state,
        [action.entity._id]: Object.assign({}, state[ action.oldId ], action.entity, {
          __isDirty: false,
          __isNew: false
        })
      }, action.oldId)
    case LOAD_REFERENCES:
      let newStateRef = Object.assign({}, state)
      action.entities.forEach((e) => {
        e.__entityType = action.entityType
        newStateRef[ e._id ] = e
      })
      return newStateRef
    case REMOVE:
      return _omit({ ...state }, action._id)
    default:
      return state
  }
}

export const getById = (state, id) => {
  if (!state.entities[ id ]) {
    throw new Error(`Unable to find entity with id ${id}`)
  }

  return state.entities[ id ]
}

export const getReferences = (state) => {
  let result = {}
  Object.keys(state.entities).filter((e) => state.entities[ e ]).forEach((eid) => {
    const entity = state.entities[ eid ]
    result[ entity.__entityType ] = result[ entity.__entityType ] || []
    result[ entity.__entityType ].push(entity)
  })

  return result
}

export function update (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to update')
  }

  return (dispatch) => dispatch({
    type: UPDATE,
    entity: entity
  })
}

export function remove (id) {
  return async function (dispatch, getState) {
    const entity = getById(getState(), id)
    await client.del(`/odata/${entity.__entityType}(${id})`)

    return dispatch({
      type: REMOVE,
      _id: id
    })
  }
}

export function add (entity) {
  if (!entity || !entity._id) {
    throw new Error('Invalid entity submitted to add')
  }

  return (dispatch) => dispatch({
    type: ADD,
    entity: entity
  })
}

export function load (id) {
  return async function (dispatch, getState) {
    const entity = getById(getState(), id)
    let response = await client.get(`/odata/${entity.__entityType}(${id})`)
    dispatch({
      type: LOAD,
      entity: response.value[ 0 ]
    })
  }
}

export function loadReferences (entityType) {
  return async function (dispatch) {
    let response = await client.get(`/odata/${entityType}?$select=name,shortid`)
    dispatch({
      type: LOAD_REFERENCES,
      entities: response.value,
      entityType: entityType
    })
  }
}

export function save (id) {
  return async function (dispatch, getState) {
    try {
      const entity = Object.assign({}, getById(getState(), id))

      if (entity.__isNew) {
        const oldId = entity._id
        delete entity._id
        const response = await client.post(`/odata/${entity.__entityType}`, { data: entity })
        entity._id = response._id
        dispatch({
          type: SAVE_NEW,
          oldId: oldId,
          entity: response
        })
        entity._id = response._id
      } else {
        await client.patch(`/odata/${entity.__entityType}(${entity._id})`, { data: entity })
        dispatch({
          type: SAVE,
          _id: entity._id
        })
      }

      return entity
    } catch (e) {
      console.error(e)
    }
  }
}
