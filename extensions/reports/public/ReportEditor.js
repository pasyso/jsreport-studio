import ReactList from 'react-list'
import style from './ReportEditor.scss'
import React, { Component} from 'react'
import Studio from 'jsreport-studio'

let _instance
export default class ReportEditor extends Component {

  static get Instance () {
    return _instance
  }

  constructor () {
    super()
    this.state = { reports: [], active: null }
    this.skip = 0
    this.top = 50
    this.pending = 0
    this.ActiveReport = null
    _instance = this
  }

  componentWillMount () {
    this.lazyFetch()
  }

  componentWillUnmount () {
    this.ActiveReport = null
  }

  async openReport (r) {
    Studio.setPreviewFrameSrc(`/reports/${r._id}/content`)
    this.setState({ active: r._id })
    this.ActiveReport = r
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

  async remove () {
    const id = this.ActiveReport._id
    this.ActiveReport = null
    await Studio.api.del(`/odata/reports(${id})`)
    this.setState({reports: this.state.reports.filter((r) => r._id !== id)})
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

    return <div className='block custom-editor'>
      <div>
        <h1><i className='fa fa-folder-open-o'/> Reports</h1>
      </div>
      <div className={style.listContainer + ' block-item'}>
        <ReactList
          type='uniform' itemsRenderer={this.renderItems} itemRenderer={(index) => this.tryRenderItem(index)}
          length={count}/>
      </div>
    </div>
  }
}

