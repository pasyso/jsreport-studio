import React, {Component} from 'react'
import {connect} from 'react-redux'
import { actions } from '../../redux/editor'
import { actions as settingsActions, selectors } from '../../redux/settings'
import api from '../../helpers/api.js'

@connect((state) => ({
  activeTab: state.editor.activeTab,
  logsWithTemplates: selectors.getLogsWithTemplates(state)
}), { ...actions, ...settingsActions })
export default class Startup extends Component {
  constructor () {
    super()
    this.state = { templates: [] }
  }

  componentDidMount () {
    this.loadLastModifiedTemplates()
  }

  async loadLastModifiedTemplates () {
    this.fetchRequested = true
    const response = await api.get('/odata/templates?$top=5&$select=name,recipe,modificationDate&$orderby=modificationDate desc')
    await this.props.load()
    this.setState({ templates: response.value })
    this.fetchRequested = false
  }

  componentDidUpdate (props) {
    if (!this.fetchRequested) {
      this.loadLastModifiedTemplates()
    }
  }

  shouldComponentUpdate (props) {
    return props.activeTab === 'StartupPage'
  }

  openLogs (l) {
    const start = l[0].timestamp.getTime()
    const rows = l.map((m) => {
      const time = (m.timestamp.getTime() - start)
      return `<tr><td>+${time}</td><td>${m.message}</td></tr>`
    }).join('')
    const log = '<table>' + rows + '</table>'

    return Studio.setPreviewFrameSrc('data:text/html;charset=utf-8,' + encodeURI(log))
  }

  render () {
    const { templates } = this.state
    const { openTab, logsWithTemplates } = this.props

    return <div className='block custom-editor' style={{overflow: 'auto', minHeight: 0, height: 'auto'}}>
      <h2>Last edited templates</h2>

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>name</th>
              <th>recipe</th>
              <th>last modified</th>
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
      <h2>Last requests</h2>

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>template</th>
              <th>started</th>
            </tr>
          </thead>
          <tbody>
          {(logsWithTemplates).map((l, k) => <tr key={k} onClick={() => this.openLogs(l.logs)}>
            <td className='selection'><a style={{textDecoration: 'underline'}} onClick={() => l.template._id ? openTab({_id: l.template}) : null}>{l.template.name}</a></td>
            <td>{l.timestamp.toLocaleString()}</td>
          </tr>)}
          </tbody>
        </table>
      </div>

      <h2>Request failed requests</h2>
      <div>
        TODO
      </div>
    </div>
  }
}
