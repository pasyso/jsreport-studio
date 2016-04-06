import ApiClient from '../../helpers/ApiClient.js'

let client = new ApiClient()

const FETCH_OBJECT_REFERENCES = 'FETCH_OBJECT_REFERENCES'

const initialState = { templates: [] }

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case 'REGISTER_OBJECT_TYPE':
      return {
        ...state,
        [action.objectType]: []
      }
    case FETCH_OBJECT_REFERENCES:
      return action.result
    default:
      return state
  }
}

export function fetchObjectReferences () {
  return async function (dispatch, getState) {
    const response = await client.get('/odata/templates?$select=name')
    dispatch({
      type: FETCH_OBJECT_REFERENCES,
      result: response.value
    })
  }
}

