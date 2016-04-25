import React, { Component } from 'react'
import ReportEditor from './ReportEditor'

export default class DownloadButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  download () {
    if (ReportEditor.ActiveReport) {
      window.open(`/reports/${ReportEditor.ActiveReport._id}/content`, '_blank')
    }
  }

  render () {
    if (!this.props.tab || (this.props.tab.key !== 'Reports') || !ReportEditor.ActiveReport) {
      return <div/>
    }

    return <div className='toolbar-button' onClick={() => this.download()}>
      <i className='fa fa-download'/>Download
    </div>
  }
}

