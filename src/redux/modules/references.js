const UPDATE = 'REFERENCES_UPDATE'

const initialState = {}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return action.result
    default:
      return state
  }
}

export const getTree = (state) => state.references

export const getById = (state, entityType, id) => state.references[ entityType ] ? state.references[ entityType ][ id ] : null
