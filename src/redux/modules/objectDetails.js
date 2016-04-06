import ApiClient from '../../helpers/ApiClient.js'
import Promise from 'bluebird'

let client = new ApiClient()

const FETCH_OBJECT_DETAIL = 'FETCH_OBJECT_DETAIL'
const UPDATE = 'UPDATE'

const initialState = { templates: [] }

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case 'REGISTER_OBJECT_TYPE':
      return {
        ...state,
        [action.objectType]: []
      }
    case FETCH_OBJECT_DETAIL:
      return {
        ...state,
        [action.objectType]: [ ...state[ action.objectType ] || [], action.result ]
      }
    case UPDATE:
      let index = state[ action.objectType ].map((t) => t._id).indexOf(action.object._id)

      return {
        ...state,
        [ action.objectType ]: [
          ...state[ action.objectType ].slice(0, index),
          Object.assign({}, state[ action.objectType ][ index ], action.object),
          ...state[ action.objectType ].slice(index + 1)
        ]
      }
    default:
      return state
  }
}

export function update (objectType, object) {
  return (dispatch) => dispatch({
    type: UPDATE,
    object: object,
    objectType: objectType
  })
}

export function fetchObjectDetail (objectType, id) {
  return async function (dispatch, getState) {
    // there should be likely another check in the reducer or other lock preventing duplicated details
    if (!getState().objectDetails[ objectType ] || !getState().objectDetails[ objectType ].filter((d) => d._id === id).length) {
      let response = await client.get(`/odata/${objectType}(${id})`)
      dispatch({
        type: FETCH_OBJECT_DETAIL,
        objectType: objectType,
        result: response.value[ 0 ],
        _id: id
      })
    }

    return Promise.resolve()
  }
}