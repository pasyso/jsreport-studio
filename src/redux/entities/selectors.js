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