import { selectors } from '../entities'

export const getTabWithEntities = (state) => state.editor.tabs.map((t) => selectors.getById(state, t))
export const getActiveTab = (state) => state.editor.activeTab ? state.editor.tabs.filter((t) => t._id === state.editor.activeTab)[ 0 ] : null

export const getActiveEntity = (state) => {
  if (!state.editor.activeTab) {
    return null
  }

  return selectors.getById(state, state.editor.activeTab)
}
