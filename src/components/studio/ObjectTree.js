import React, {Component} from 'react'
import ReactList from 'react-list'

export default class ObjectTree extends Component {
  static propTypes = {
    objects: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onNewClick: React.PropTypes.func.isRequired
  }

  createRenderer (entityType) {
    return (index, key) => this.renderNode(this.props.objects[ entityType ][ index ])
  }

  renderNode (entity) {
    return <button key={entity._id} onClick={() => this.props.onClick(entity._id)}>{entity.name}</button>
  }

  renderObjectSubTree (k) {
    return <div key={k}>{k}:
      <button key={k + 'new'} onClick={() => this.props.onNewClick(k)}>+</button>
      <ReactList itemRenderer={this.createRenderer(k)} length={this.props.objects[k].length}/>
    </div>
  }

  render () {
    const { objects } = this.props

    return <div>
      {Object.keys(objects).map((k) => this.renderObjectSubTree(k))}
    </div>
  }
}
