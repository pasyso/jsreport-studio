import ReactList from 'react-list'
import style from './ReportEditor.scss'
const React = Studio.react
const { Component } = Studio.react

let _activeReport
export default class ReportEditor extends Component {

  static get ActiveReport () {
    return _activeReport
  }

  constructor () {
    super()
    this.state = { reports: [], active: null }
    this.skip = 0
    this.top = 50
    this.pending = 0
    _activeReport = null
  }

  componentWillMount () {
    this.lazyFetch()
  }

  componentWillUnmount () {
    _activeReport = null
  }

  async openReport (r) {
    Studio.preview(`/reports/${r._id}/content`)
    this.setState({ active: r._id })
    _activeReport = r
  }

  async lazyFetch () {
    if (this.loading) {
      return
    }

    this.loading = true
    const response = await Studio.api.get(`/odata/reports?$orderby=creationDate desc&$count=true&$top=${this.top}&$skip=${this.skip}`)
    this.skip += this.top
    this.loading = false
    this.setState({ reports: this.state.reports.concat(response.value), count: response['@odata.count'] })
    if (this.state.reports.length <= this.pending && response.value.length) {
      this.lazyFetch()
    }
  }

  tryRenderItem (index) {
    const task = this.state.reports[index]
    if (!task) {
      this.pending = Math.max(this.pending, index)
      this.lazyFetch()
      return <div key={index} className={style.item}>
        <div><i className='fa fa-spinner fa-spin fa-fw'/></div>
      </div>
    }

    return this.renderItem(task, index)
  }

  renderItem (report, index) {
    return <div
      key={index} className={style.item + ' ' + ((this.state.active === report._id) ? style.active : '')}
      onClick={() => this.openReport(report)}>
      <div>{report.name}</div>
      <div>{report.creationDate.toLocaleString()}</div>
      <div>{report.recipe}</div>
    </div>
  }

  renderItems (items, ref) {
    return <div className={style.list} ref={ref}>{items}</div>
  }

  render () {
    const { count } = this.state

    return <div className={'block ' + style.editor}>
      <div className={style.header}>
        <h1><i className='fa fa-folder-open-o'/> Reports</h1>
      </div>
      <div className='block-item list' style={{ overflow: 'auto' }}>
        <ReactList
          type='uniform' itemsRenderer={this.renderItems} itemRenderer={(index) => this.tryRenderItem(index)}
          length={count}/>
      </div>
    </div>
  }
}

