import React, {Component} from 'react'
import ReactList from 'react-list'
import style from './EntityTree.scss'
import Studio from '../../Studio.js'

export default class EntityTree extends Component {
  static propTypes = {
    entities: React.PropTypes.object.isRequired,
    activeEntity: React.PropTypes.object,
    onClick: React.PropTypes.func.isRequired,
    onNewClick: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = { filter: '' }
  }

  createRenderer (entities) {
    return (index, key) => this.renderNode(entities[index])
  }

  renderNode (entity) {
    const { activeEntity } = this.props

    return <div
      onClick={() => this.props.onClick(entity._id)}
      key={entity._id}
      className={style.link + ' ' + ((activeEntity && entity._id === activeEntity._id) ? style.active : '')}>
      <i className={style.entityIcon + ' fa ' + (Studio.entitySets[entity.__entitySet].faIcon || style.entityDefaultIcon)}></i>
      <a>{entity[Studio.entitySets[entity.__entitySet].nameAttribute] + (entity.__isDirty ? '*' : '')}</a>
    </div>
  }

  collapse (k) {
    this.setState({ [k]: !this.state[k] })
  }

  renderObjectSubTree (k, entities) {
    return <div key={k} className={style.nodeBox}><span
      className={style.nodeTitle + ' ' + (this.state[k] ? style.collapsed : '')}
      onClick={() => this.collapse(k)}>{k}</span>
      <a key={k + 'new'} onClick={() => this.props.onNewClick(k)} className={style.add}></a>

      <div className={style.nodeContainer + ' ' + (this.state[k] ? style.collapsed : '')}>
        <ReactList itemRenderer={this.createRenderer(entities)} length={entities.length}/>
      </div>
    </div>
  }

  filterEntities (entities) {
    const filter = this.state.filter
    if (filter === '') {
      return entities
    }

    let result = {}
    Object.keys(entities).forEach((k) => {
      result[k] = entities[k].filter((e) => Studio.getEntityName(e).indexOf(filter) !== -1)
    })

    return result
  }

  setFilter (text) {
    this.setState({ filter: text })
  }

  render () {
    const entities = this.filterEntities(this.props.entities)

    return <div className={style.treeListContainer}>
      <div>
        <div className={style.search}><input type='text' onChange={(ev) => this.setFilter(ev.target.value)}></input>
        </div>
      </div>
      <div className={style.nodesBox}>
        {Object.keys(Studio.entitySets).map((k) => this.renderObjectSubTree(k, entities[k] || []))}
      </div>
    </div>
  }
}
