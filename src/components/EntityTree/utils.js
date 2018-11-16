
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
