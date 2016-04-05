import ApiClient from '../../helpers/ApiClient.js'

let client = new ApiClient()

const FETCH_OBJECT_REFERENCES = 'FETCH_OBJECT_REFERENCES'

const initialState = {templates: []}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OBJECT_REFERENCES:
      return action.result
    default:
      return state
  }
}

export function fetchObjectReferences () {
  return (dispatch, getState) => {
    return client.get('/odata/templates?$select=name').then((r) => dispatch({
      type: FETCH_OBJECT_REFERENCES,
      result: r.value
    }))
  }
}

