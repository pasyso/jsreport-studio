export const getById = (state, id) => {
  if (!state.entities[ id ]) {
    throw new Error(`Unable to find entity with id ${id}`)
  }

  return state.entities[ id ]
}

export const getByShortid = (state, shortid) => {
  const entities = Object.keys(state.entities).map((e) => state.entities[ e ]).filter((e) => e.shortid === shortid)
  return entities.length ? entities[0] : 0
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