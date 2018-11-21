
export function getVisibleEntitySetsInTree (entitySets) {
  const sets = []

  Object.keys(entitySets).forEach((setName) => {
    const entitySet = entitySets[setName]

    if (entitySet.visibleInTree === false) {
      return
    }

    sets.push(entitySet)
  })

  return sets
}

export function checkIsGroupNode (node) {
  return node.isEntitySet === true || node.isGroup === true
}

export function checkIsGroupEntityNode (node) {
  if (checkIsGroupNode(node)) {
    return node.isEntity === true
  }

  return false
}

export function getNodeDOMId (entity) {
  return `entityNode--${entity.__entitySet}--${entity.shortid}`
}

export function getNodeTitleDOMId (entity) {
  const nodeDOMId = getNodeDOMId(entity)

  if (!nodeDOMId) {
    return undefined
  }

  return `${nodeDOMId}--title`
}

export function getAllEntitiesInHierarchy (node, includeRoot = false, allEntities) {
  const entities = allEntities == null ? [] : allEntities

  if (!node) {
    return entities
  }

  if (includeRoot === true) {
    if (checkIsGroupNode(node)) {
      if (checkIsGroupEntityNode(node)) {
        entities.push(node.data._id)
      }
    } else {
      entities.push(node.data._id)
    }
  }

  if (node.items) {
    node.items.forEach((cNode) => getAllEntitiesInHierarchy(cNode, true, entities))
  }

  return entities
}
