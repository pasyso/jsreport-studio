import React, {Component} from 'react'
import ReactList from 'react-list'
import style from './EntityTree.scss'

export default class EntityTree extends Component {
  static propTypes = {
    entities: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onNewClick: React.PropTypes.func.isRequired
  }

  createRenderer (entityType) {
    return (index, key) => this.renderNode(this.props.entities[ entityType ][ index ])
  }

  renderNode (entity) {
    return <div key={entity._id}><a className={style.link} onClick={() => this.props.onClick(entity._id)}>{entity.name + (entity.__isDirty ? '*' : '')}</a></div>
  }

  renderObjectSubTree (k) {
    return <div key={k}>
      <span className={style.nodeTitle}>{k}</span>
      <a key={k + 'new'} onClick={() => this.props.onNewClick(k)} className={style.add}></a>
      <div className={style.nodeContainer}>
        <ReactList itemRenderer={this.createRenderer(k)} length={this.props.entities[k].length}/>
      </div>
    </div>
  }

  render () {
    const { entities } = this.props

    return <div className={style.treeListContainer}>
      {Object.keys(entities).map((k) => this.renderObjectSubTree(k))}
    </div>
  }
}
