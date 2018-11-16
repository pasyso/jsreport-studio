import React, {Component} from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/editor'
import { actions as settingsActions, selectors } from '../../redux/settings'
import api from '../../helpers/api.js'
import { previewFrameChangeHandler } from '../../lib/configuration.js'
import intl from 'react-intl-universal'

@connect((state) => ({
  activeTabKey: state.editor.activeTabKey,
  logsWithTemplates: selectors.getLogsWithTemplates(state),
  failedLogsWithTemplates: selectors.getFailedLogsWithTemplates(state)
}), { ...actions, ...settingsActions }, undefined, { withRef: true })
export default class Startup extends Component {
  constructor () {
    super()
    this.state = { templates: [] }
  }

  onTabActive () {
    this.loadLastModifiedTemplates()
  }

  async loadLastModifiedTemplates () {
    if (this.fetchRequested) {
      return
    }

    this.fetchRequested = true
    const response = await api.get('/odata/templates?$top=5&$select=name,recipe,modificationDate&$orderby=modificationDate desc')
    await this.props.load()
    this.setState({ templates: response.value })
    this.fetchRequested = false
  }

  shouldComponentUpdate (props) {
    return props.activeTabKey === 'StartupPage'
  }

  openLogs (m) {
    const errorMessage = m.error ? (m.error.message + '<br/>' + m.error.stack + '<br/><br/><br/>') : ''

    let logs = ''
    if (m.logs && m.logs.length) {
      const start = new Date(m.logs[0].timestamp).getTime()
      const rows = m.logs.map((m) => {
        const time = (new Date(m.timestamp).getTime() - start)
        return `<tr><td>+${time}</td><td>${m.message}</td></tr>`
      }).join('')
      logs = '<table>' + rows + '</table>'
    }

    return previewFrameChangeHandler('data:text/html;charset=utf-8,' + encodeURI(errorMessage + logs))
  }

  render () {
    const { templates } = this.state
    const { openTab, logsWithTemplates, failedLogsWithTemplates } = this.props

    return <div className='block custom-editor' style={{overflow: 'auto', minHeight: 0, height: 'auto'}}>
      <h2>{intl.get('startup.lastEditedTemplates').d('Last edited templates')}</h2>

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>{intl.get('startup.name').d('name')}</th>
              <th>{intl.get('startup.recipe').d('recipe')}</th>
              <th>{intl.get('startup.lastModified').d('last modified')}</th>
            </tr>
          </thead>
          <tbody>
          {templates.map((t) => <tr key={t._id} onClick={() => openTab({_id: t._id})}>
            <td className='selection'>{t.name}</td>
            <td>{t.recipe}</td>
            <td>{t.modificationDate.toLocaleString()}</td>
          </tr>)}
          </tbody>
        </table>
      </div>
      <h2>{intl.get('startup.lastRequests').d('Last requests')}</h2>

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>{intl.get('startup.template').d('template')}</th>
              <th>{intl.get('startup.started').d('started')}</th>
            </tr>
          </thead>
          <tbody>
          {(logsWithTemplates).map((l, k) => <tr key={k} onClick={() => this.openLogs(l)}>
            <td className='selection'><a style={{textDecoration: 'underline'}} onClick={() => l.template._id ? openTab({_id: l.template._id}) : null}>{l.template.name}</a></td>
            <td>{new Date(l.timestamp).toLocaleString()}</td>
          </tr>)}
          </tbody>
        </table>
      </div>

      <h2>{intl.get('startup.lastFailedRequests').d('Last failed requests')}</h2>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>{intl.get('startup.template').d('template')}</th>
              <th>{intl.get('startup.error').d('error')}</th>
              <th>{intl.get('startup.started').d('started')}</th>
            </tr>
          </thead>
          <tbody>
          {(failedLogsWithTemplates).map((l, k) => <tr key={k} onClick={() => this.openLogs(l)}>
            <td className='selection'><a style={{textDecoration: 'underline'}} onClick={() => l.template._id ? openTab({_id: l.template._id}) : null}>{l.template.name}</a></td>
            <td>{!l.error.message || l.error.message.length < 90 ? l.error.message : (l.error.message.substring(0, 80) + '...')}</td>
            <td>{new Date(l.timestamp).toLocaleString()}</td>
          </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  }
}
