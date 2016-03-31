import ApiClient from '../../helpers/ApiClient.js'
let client = new ApiClient()

const FETCH_TEMPLATES_NAMES = 'FETCH_TEMPLATES_NAMES'
const FETCH_TEMPLATE = 'FETCH_TEMPLATE'
const SET_CURRENT = 'SET_CURRENT'

const initialState = {
  templateList: [],
  templateDetails: [],
  currentDetail: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TEMPLATES_NAMES:
      return Object.assign({}, state, {
        templateList: action.result.value
      })
    case FETCH_TEMPLATE:
      let template = action.result.value[0]
      let details = Object.assign([], state.templateDetails)
      if (!details.filter((t) => t._id === template._id).length) {
        details.push(template)
      }

      return Object.assign({}, state, {
        templateDetails: details,
        currentDetail: template
      })
    case SET_CURRENT:
      return Object.assign({}, state, {
        currentDetail: action.result
      })
    default:
      return state
  }
}

export function fetchTemplateNames () {
  return (dispatch, getState) => {
    return client.get('/odata/templates?$select=name').then((r) => {
      dispatch({ type: FETCH_TEMPLATES_NAMES, result: r })

      if (!getState().studio.currentDetail && r.value.length) {
        return client.get(`/odata/templates(${r.value[ 0 ]._id})`).then((r) => {
          dispatch({ type: FETCH_TEMPLATE, result: r })
        })
      }
    })
  }
}

export function fetchTemplate (id) {
  return (dispatch, getState) => {
    let found = getState().studio.templateDetails.filter((d) => d._id === id)
    if (found.length) {
      return dispatch({type: SET_CURRENT, result: found[0]})
    }
    return client.get(`/odata/templates(${id})`).then((r) => dispatch({ type: FETCH_TEMPLATE, result: r }))
  }
}