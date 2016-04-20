const React = Studio.react
const ReactDom = Studio.ReactDom
const { Component } = Studio.react

export default class ReportsButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  openReports () {
    Studio.openTab({ key: 'Reports', editorComponentKey: 'reports', title: 'Reports' })
  }

  render () {
    return <div className='toolbar-button' onClick={() => this.openReports()}>
      <i className='fa fa-cloud-upload'/>Reports
    </div>
  }
}

