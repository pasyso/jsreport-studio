import { selectors } from '../entities'

export const getLogsWithTemplates = (state) => ((state.settings.failedRequestsLog || []).map((l) => ({
  ...l,
  templateName: selectors.getById(state, l.template) ? selectors.getById(state, l.template).name : 'not found'
})))

