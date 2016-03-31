import ApiClient from '../../helpers/ApiClient.js'

let client = new ApiClient()

const LIST = 'templates/LIST'
const LIST_SUCCESS = 'templates/LIST_SUCCESS'
const LIST_FAIL = 'templates/LIST_FAIL'

const initialState = {
  list: [],
  detail: null,
  error: null,
  loading: false,
  loaded: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LIST:
      return {
        ...state,
        loading: true
      }
    case LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.value,
        error: null
      }
    case LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        error: action.error
      }
    default:
      return state
  }
}

export function list () {
  return (dispatch) => {
    dispatch({ type: LIST })
    return client.get('/odata/templates').then((r) => dispatch({ type: LIST_SUCCESS, result: r }))
  }
}
