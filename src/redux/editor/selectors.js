import { selectors } from '../entities'

export const getTabWithEntities = (state) => state.editor.tabs.map((t) => ({
  entity: t.type === 'entity' ? selectors.getById(state, t._id) : null,
  tab: t
}))

export const getActiveTab = (state) => state.editor.activeTab ? state.editor.tabs.filter((t) => t.key === state.editor.activeTab)[ 0 ] : null

export const getActiveEntity = (state) => {
  if (!state.editor.activeTab) {
    return null
  }

  const tab = getActiveTab(state)

  return tab.type === 'entity' ? selectors.getById(state, tab._id) : null
}

export const canRun = (state) => {
  const entity = getActiveEntity(state)

  return entity ? entity.__entityType === 'templates' : false
}

export const canRemove = (state) => {
  const entity = getActiveEntity(state)

  return entity ? !entity.__isNew : false
}

export const canSave = (state) => {
  const entity = getActiveEntity(state)

  return entity ? entity.__isDirty : false
}

export const canSaveAll = (state) => {
  return getTabWithEntities(state).filter((t) => t.entity && t.entity.__isDirty).length > 0
}
