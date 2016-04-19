const React = Studio.react
const { Component } = Studio.react

export default class ImageEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired
  }

  render () {
    const { entity } = this.props

    return (<div>
      <div>
        <div>Embed into template using: </div>
        <code>
          &lt;img src='{'{#image ' + entity.name + "}'"}/&gt;
        </code>
      </div>
      <div style={{overflow: 'auto'}}>
        <img src={'data:image/png;base64,' + entity.content} style={{display: 'block', margin: '3rem auto'}} />
      </div>
    </div>)
  }
}

