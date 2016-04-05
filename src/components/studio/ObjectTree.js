import React, {Component} from 'react'

export default class ObjectTree extends Component {
  static propTypes = {
    objects: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  }

  renderObjectSubTree (k) {
    return <div key={k}>{k}: {this.props.objects[k].map((c) => <button key={c._id} onClick={() => this.props.onClick(k, c._id)}>{c.name}</button>)}</div>
  }

  render () {
    const { objects } = this.props

    return <div>
      {Object.keys(objects).map((k) => this.renderObjectSubTree(k))}
    </div>
  }
}
