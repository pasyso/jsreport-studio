import ApiClient from '../../helpers/ApiClient.js'
import Promise from 'bluebird'

let client = new ApiClient()

const FETCH_OBJECT_DETAIL = 'FETCH_OBJECT_DETAIL'
const UPDATE_TEMPLATE_CONTENT = 'UPDATE_TEMPLATE_CONTENT'

const initialState = { templates: [] }

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OBJECT_DETAIL:
      return {
        templates: [ ...state.templates, action.result ]
      }
    case UPDATE_TEMPLATE_CONTENT:
      let index = state.templates.map((t) => t._id).indexOf(action._id)
      return {
        templates: [
          ...state.templates.slice(0, index),
          Object.assign({}, state.templates[ index ], { content: action.content }),
          ...state.templates.slice(index + 1)
        ]
      }
    default:
      return state
  }
}

export function fetchObjectDetail (id) {
  return (dispatch, getState) => {
    // there should be likely another check in the reducer or other lock preventing duplicated details
    if (!getState().objectDetails.templates.filter((d) => d._id === id).length) {
      return client.get(`/odata/templates(${id})`).then((r) => dispatch({
        type: FETCH_OBJECT_DETAIL,
        result: r.value[ 0 ],
        _id: id
      }))
    }

    return Promise.resolve()
  }
}

export function updateTemplateContent (id, content) {
  return (dispatch, getState) => dispatch({
    type: UPDATE_TEMPLATE_CONTENT,
    _id: id,
    content: content
  })
}

