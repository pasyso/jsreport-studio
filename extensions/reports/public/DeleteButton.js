const React = Studio.react
const ReactDom = Studio.ReactDom
const { Component } = Studio.react
import ReportEditor from './ReportEditor'

export default class DeleteButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  remove () {
    if (ReportEditor.ActiveReport) {
      window.open(`/reports/${ReportEditor.ActiveReport._id}/content`, '_blank')
    }
  }

  render () {
    if (!this.props.tab || (this.props.tab.key !== 'Reports') || !ReportEditor.ActiveReport) {
      return <div/>
    }

    return <div className='toolbar-button' onClick={() => this.remove()}>
      <i className='fa fa-trash'/>Delete
    </div>
  }
}

