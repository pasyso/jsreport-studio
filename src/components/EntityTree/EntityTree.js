import React, {Component} from 'react'
import ReactList from 'react-list'
import style from './EntityTree.scss'
import { entitySets, entityTreeToolbarComponents, entityTreeItemComponents, entityTreeIconResolvers } from '../../lib/configuration.js'

const getEntityName = (e) => entitySets[e.__entitySet].nameAttribute ? e[entitySets[e.__entitySet].nameAttribute] : e.name

export default class EntityTree extends Component {
  static propTypes = {
    entities: React.PropTypes.object.isRequired,
    activeEntity: React.PropTypes.object,
    // specifies if the tree should render a toolbar in his header
    toolbar: React.PropTypes.bool,
    // specifies that the tree is in selectable mode,
    // in this mode, filtering is disabled, all items (incluiding in subtrees)
    // have a checkbox for single or multiple selection and contextmenu actions are disabled
    selectable: React.PropTypes.bool
    // onClick: React.PropTypes.func.isRequired,
    // onRemove: React.PropTypes.func.isRequired,
    // onRename: React.PropTypes.func.isRequired,
    // onNewClick: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = { filter: '' }
    this.setFilter = this.setFilter.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', () => this.tryHide())
  }

  componentWillUnmount () {
    window.removeEventListener('click', () => this.tryHide())
  }

  createRenderer (entities) {
    return (index, key) => this.renderNode(entities[index])
  }

  tryHide () {
    if (this.state.contextMenuId) {
      this.setState({ contextMenuId: null })
    }
  }

  contextMenu (e, entity) {
    e.preventDefault()
    this.setState({ contextMenuId: entity._id })
  }

  renderContextMenu (entity) {
    const { onRemove, onRename } = this.props

    return <div className={style.contextMenuContainer}>
      <div className={style.contextMenu}>
        <div
          className={style.contextButton}
          onClick={(e) => { e.stopPropagation(); onRename(entity._id); this.tryHide() }}>
          <i className='fa fa-pencil' /> Rename
        </div>
        <div
          className={style.contextButton}
          onClick={(e) => { e.stopPropagation(); onRemove(entity._id); this.tryHide() }}>
          <i className='fa fa-trash' /> Delete
        </div>
      </div>
    </div>
  }

  resolveEntityTreeIconStyle (entity) {
    for (const k in entityTreeIconResolvers) {
      const mode = entityTreeIconResolvers[k](entity)
      if (mode) {
        return mode
      }
    }

    return null
  }

  renderNode (entity) {
    const { activeEntity, onSelect, onClick, selectable } = this.props
    const { contextMenuId } = this.state

    const entityStyle = this.resolveEntityTreeIconStyle(entity)

    return (
      <div
        onContextMenu={(e) => this.contextMenu(e, entity)}
        onClick={() => selectable ? onSelect(entity) : onClick(entity._id)}
        key={entity._id}
        className={style.link + ' ' + ((activeEntity && entity._id === activeEntity._id) ? style.active : '')}
      >
        {this.renderEntityTreeItemComponents('container', entity, [
          selectable ? <input type='checkbox' readOnly checked={entity.__selected !== false} /> : <span />,
          <i className={style.entityIcon + ' fa ' + (entityStyle || (entitySets[entity.__entitySet].faIcon || style.entityDefaultIcon))}></i>,
          <a>{entity[entitySets[entity.__entitySet].nameAttribute] + (entity.__isDirty ? '*' : '')}</a>,
          this.renderEntityTreeItemComponents('right', entity),
          !selectable && contextMenuId === entity._id ? this.renderContextMenu(entity) : <div />
        ])}
      </div>
    )
  }

  collapse (k) {
    this.setState({ [k]: !this.state[k] })
  }

  renderObjectSubTree (k, entities) {
    const {  onNodeSelect, selectable } = this.props

    return <div key={k} className={style.nodeBox}>
      {selectable ? <input type='checkbox' defaultChecked={true} onChange={(v) => onNodeSelect(k, !!v.target.checked)} />: <span/>}
      <span
      className={style.nodeTitle + ' ' + (this.state[k] ? style.collapsed : '')}
      onClick={() => this.collapse(k)}>{k}</span>
      {!this.props.selectable ? <a key={k + 'new'} onClick={() => this.props.onNewClick(k)} className={style.add}></a> : <span/>}
      <div className={style.nodeContainer + ' ' + (this.state[k] ? style.collapsed : '')}>
        <ReactList itemRenderer={this.createRenderer(entities)} length={entities.length} />
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
      result[k] = entities[k].filter((e) => getEntityName(e).indexOf(filter) !== -1)
    })

    return result
  }

  setFilter (text) {
    this.setState({ filter: text })
  }

  renderEntityTreeToolbarComponents () {
    return entityTreeToolbarComponents.map((p, i) => (
      React.createElement(p, {
        key: i,
        setFilter: this.setFilter
      })
    ))
  }

  renderEntityTreeItemComponents (position, entity, originalChildren) {
    if (position === 'container') {
      // if there are no components registered, defaults to original children
      if (!entityTreeItemComponents[position].length) {
        return originalChildren
      }

      // composing components when position is container
      const wrappedItemComponent = entityTreeItemComponents[position].reduce((prevElement, b) => {
        if (prevElement == null) {
          return React.createElement(b, { entity }, originalChildren)
        }

        return React.createElement(b, { entity }, prevElement)
      }, null)

      if (!wrappedItemComponent) {
        return null
      }

      return React.createElement(wrappedItemComponent, { entity })
    }

    return entityTreeItemComponents[position].map((p, i) => (
      React.createElement(p, {
        key: i,
        entity
      }))
    )
  }

  render () {
    const entities = this.filterEntities(this.props.entities)

    return <div className={style.treeListContainer}>
      {
        this.props.toolbar && entityTreeToolbarComponents.length > 0 && (
          <div className={style.toolbar}>
            {this.renderEntityTreeToolbarComponents()}
          </div>
        )
      }
      <div className={style.nodesBox}>
        {Object.keys(entitySets).map((k) => this.renderObjectSubTree(k, entities[k] || []))}
      </div>
    </div>
  }
}
