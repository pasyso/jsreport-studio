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
