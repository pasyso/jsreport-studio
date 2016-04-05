const React = studio.react
const { Component } = studio.react

export default class Properties extends Component {
  render () {
    return (
      <div>
        Data Properties: {this.props.object && this.props.object.data  ? this.props.object.data.shortid : ''}
      </div>
    )
  }
}

