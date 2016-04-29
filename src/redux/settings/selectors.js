import { selectors } from '../entities'

const getLogs = (logs, state) => ((logs || []).map((l) => {
  let template = selectors.getByShortid(state, l.template.shortid, false)

  if (!template) {
    template = { name: 'anonymous' }
  }

  return {
    ...l,
    template: { ...template }
  }
}))

export const getFailedLogsWithTemplates = (state) => getLogs(state.settings.failedRequestsLog, state)
export const getLogsWithTemplates = (state) => getLogs(state.settings.requestsLog, state)

