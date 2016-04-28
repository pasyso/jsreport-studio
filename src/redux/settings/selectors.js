import { selectors } from '../entities'

export const getLogsWithTemplates = (state) => ((state.settings.failedRequestsLog || []).map((l) => {
  let template = selectors.getByShortid(state, l.template.shortid, false)

  if (!template) {
    template = { name: 'anonymous' }
  }

  return {
    ...l,
    template: { ...template }
  }
}))

