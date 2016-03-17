const LIST = 'templates/LIST';
const LIST_SUCCESS = 'templates/LIST_SUCCESS';
const LIST_FAIL = 'templates/LIST_FAIL';

const initialState = {
  list: [],
  error: null,
  loading: false,
  loaded: false
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case LIST:
      return {
        ...state,
        loading: true
      };
    case LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.value,
        error: null
      };
    case LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        error: action.error
      };
    default:
      return state;
  }
}

export function list() {
  return {
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get('/odata/templates')
  };
}
