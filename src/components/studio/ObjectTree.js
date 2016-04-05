import React, {Component} from 'react'

export default class ObjectTree extends Component {
  static propTypes = {
    objects: React.PropTypes.object.isRequired
  }

  render () {
    const { objects } = this.props

    return <div>
      {objects.templates.map((o) => <button key={o._id} onClick={() => this.props.onClick(o._id)}>{o.name}</button>)}
    </div>
  }
}
