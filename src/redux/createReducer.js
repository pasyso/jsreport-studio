export default function createReducer (initialState) {
  return new Reducer(initialState)
}

function Reducer (state) {
  this.handlers = {}
  this.initialState = state
}

Reducer.prototype.export = function () {
  return (state = this.initialState, action = {}) => {
    if (!this.handlers[ action.type ]) {
      return state
    }

    return this.handlers[ action.type ](state, action)
  }
}

Reducer.prototype.handleAction = function (type, fn) {
  this.handlers[ type ] = fn
}
