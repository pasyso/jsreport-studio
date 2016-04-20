import React, { Component } from 'react'

export default class ScheduleEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = { tasks: [] }
  }

  async componentWillMount () {
    const response = await Studio.api.get(`/odata/tasks?$filter=scheduleShortid eq '${this.props.entity.shortid}'`)
    this.setState({ tasks: response.value })
  }

  async openReport (t) {
    const reports = await Studio.api.get(`/odata/reports?$filter=taskId eq '${t._id}'`)
    const report = reports.value[0]
    console.log('report', report)
    Studio.preview(`/reports/${report._id}/content`)
  }

  render () {
    const { entity, onUpdate } = this.props
    const { tasks } = this.state

    return <div>
      <div>{entity.name} - {entity.nextRun}</div>
      <div>
        {tasks.map((t) => <div key={t._id}>
          <a style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => this.openReport(t)} key={t._id}>
            <span>{t.state}</span><span>{t.finishDate}</span>
          </a>
        </div>)}
      </div>
    </div>
  }
}

