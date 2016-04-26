export const getById = (state, id, shouldThrow = true) => {
  if (!state.entities[ id ] && shouldThrow) {
    throw new Error(`Unable to find entity with id ${id}`)
  }

  return state.entities[ id ]
}

export const getByShortid = (state, shortid) => {
  const entities = Object.keys(state.entities).map((e) => state.entities[ e ]).filter((e) => e.shortid === shortid)

  if (!entities.length) {
    throw new Error(`Unable to find entity with shprtod ${shortid}`)
  }

  return entities[0]
}

export const getReferences = (state) => {
  let result = {}
  Object.keys(state.entities).filter((e) => state.entities[ e ]).forEach((eid) => {
    const entity = state.entities[ eid ]
    result[ entity.__entitySet ] = result[ entity.__entitySet ] || []
    result[ entity.__entitySet ].push(entity)
  })

  return result
}