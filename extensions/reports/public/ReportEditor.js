const React = Studio.react
const { Component } = Studio.react

export default class ImageEditor extends Component {
  static propTypes = {}

  constructor () {
    super()
    this.state = { reports: [] }
  }

  async componentWillMount () {
    const response = await Studio.api.get('/odata/reports')
    this.setState({ reports: response.value })
  }

  render () {
    const { reports } = this.state

    return (<div>
      {reports.map((t) => <div key={t._id}>
        <a style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => Studio.preview(`reports/${t._id}/content`)} key={t._id}>{t.name}</a>
      </div>)}
    </div>)
  }
}

