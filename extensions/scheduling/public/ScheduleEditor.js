import React, { Component } from 'react'
import ReactList from 'react-list'
import style from './ScheduleEditor.scss'

let _activeReport
export default class ScheduleEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = { tasks: [], active: null }
    this.skip = 0
    this.top = 50
    this.pending = 0
  }

  static get ActiveReport () {
    return _activeReport
  }

  componentWillMount () {
    this.lazyFetch()
  }

  async openReport (t) {
    const reports = await Studio.api.get(`/odata/reports?$filter=taskId eq '${t._id}'`)
    const report = reports.value[0]
    Studio.preview(`/reports/${report._id}/content`)
    this.setState({ active: t._id })
    _activeReport = report
  }

  async lazyFetch () {
    if (this.loading) {
      return
    }

    this.loading = true
    const response = await Studio.api.get(`/odata/tasks?$orderby=finishDate desc&$count=true&$top=${this.top}&$skip=${this.skip}&$filter=scheduleShortid eq '${this.props.entity.shortid}'`)
    this.skip += this.top
    this.loading = false
    this.setState({ tasks: this.state.tasks.concat(response.value), count: response['@odata.count'] })
    if (this.state.tasks.length <= this.pending && response.value.length) {
      this.lazyFetch()
    }
  }

  tryRenderItem (index) {
    const task = this.state.tasks[index]
    if (!task) {
      this.pending = Math.max(this.pending, index)
      this.lazyFetch()
      return <div key={index} className={style.item}>
        <div><i className='fa fa-spinner fa-spin fa-fw'/></div>
      </div>
    }

    return this.renderItem(task, index)
  }

  renderItem (task, index) {
    return <div
      key={index} className={style.item + ' ' + ((this.state.active === task._id) ? style.active : '')}
      onClick={() => this.openReport(task)}>
      <div
        className={style.state + ' ' + (task.state === 'error' ? style.error : (task.state === 'success' ? style.success : style.canceled))}>{task.state}</div>
      <div className={style.date}>
        <div className={style.label}>start</div>
        <span className={style.value}>{task.creationDate ? task.creationDate.toLocaleString() : ''}</span>
      </div>
      <div className={style.date}>
        <div className={style.label}>finish</div>
        <div className={style.value}>{task.finishDate ? task.finishDate.toLocaleString() : ''}</div>
      </div>
    </div>
  }

  renderItems (items, ref) {
    return <div className={style.list} ref={ref}>{items}</div>
  }

  render () {
    const { entity } = this.props
    const { count } = this.state

    return <div className='block custom-editor'>
      <div><h1><i className='fa fa-calendar'/> {entity.name}</h1>
        {entity.nextRun ? (<div><span>next run&nbsp;&nbsp;</span>
          <small>{entity.nextRun.toLocaleString()}</small>
        </div>) : <div>Not planned yet. Fill CRON expression and report template in the properties.</div>}
      </div>
      <div className={style.listContainer + ' block-item'}>
        <ReactList
          type='uniform' itemsRenderer={this.renderItems} itemRenderer={(index) => this.tryRenderItem(index)}
          length={count}/>
      </div>
    </div>
  }
}
