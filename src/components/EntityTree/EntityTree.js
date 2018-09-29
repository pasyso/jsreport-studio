import React, {Component} from 'react'
import ReactList from 'react-list'
import style from './EntityTree.scss'
import groupEntitiesByHierarchyHelper from '../../helpers/groupEntitiesByHierarchy'
import {
  entitySets,
  entityTreeOrder,
  entityTreeToolbarComponents,
  entityTreeItemComponents,
  entityTreeFilterItemResolvers,
  entityTreeIconResolvers
} from '../../lib/configuration.js'

export default class EntityTree extends Component {
  static propTypes = {
    entities: React.PropTypes.object.isRequired,
    activeEntity: React.PropTypes.object,
    // specifies if the tree should render a toolbar in his header
    toolbar: React.PropTypes.bool,
    // specifies that the tree is in selectable mode,
    // in this mode, filtering is disabled, all items (incluiding in subtrees)
    // have a checkbox for single or multiple selection and contextmenu actions are disabled
    selectable: React.PropTypes.bool,
    // tree accepts a render callback (function as child) to allow extensions to
    // control how entity items are rendered
    children: React.PropTypes.func
    // onClick: React.PropTypes.func.isRequired,
    // onRemove: React.PropTypes.func.isRequired,
    // onRename: React.PropTypes.func.isRequired,
    // onNewClick: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = { filter: {} }
    this.setFilter = this.setFilter.bind(this)
    this.getSetsToRender = this.getSetsToRender.bind(this)
    this.getEntityTypeNameAttr = this.getEntityTypeNameAttr.bind(this)
    this.getAllChildrenIds = this.getAllChildrenIds.bind(this)
    this.groupEntitiesByType = this.groupEntitiesByType.bind(this)
    this.renderGroupNode = this.renderGroupNode.bind(this)
    this.renderEntityNode = this.renderEntityNode.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', () => this.tryHide())
  }

  componentWillUnmount () {
    window.removeEventListener('click', () => this.tryHide())
  }

  createListItemRenderer (items, depth, parentId) {
    return (index, key) => this.renderItemNode(items[index], depth, parentId)
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

  collapse (k) {
    this.setState({ [k]: !this.state[k] })
  }

  filterEntities (entities) {
    const filterInfo = this.state.filter
    let result = {}

    const allFiltersAreEmpty = Object.keys(filterInfo).every((filterKey) => {
      const filterValue = filterInfo[filterKey]

      if (Array.isArray(filterValue)) {
        return filterValue.length === 0
      }

      return (filterValue === '' || filterValue == null)
    })

    if (allFiltersAreEmpty) {
      return entities
    }

    Object.keys(entities).forEach((k) => {
      result[k] = entities[k].filter((entity) => {
        return entityTreeFilterItemResolvers.every((filterResolver) => {
          const filterResult = filterResolver(entity, entitySets, filterInfo)

          if (typeof filterResult !== 'boolean') {
            throw new Error('filterItemResolver must return boolean values, invalid return found in resolvers')
          }

          return filterResult
        })
      })
    })

    return result
  }

  setFilter (newFilterState) {
    this.setState((prevState) => {
      return {
        filter: {
          ...prevState.filter,
          ...newFilterState
        }
      }
    })
  }

  getSetsToRender (sets) {
    const setsNames = Object.keys(sets).filter((setName) => {
      if (entitySets[setName].visibleInTree === false) {
        return false
      }

      return true
    })

    let setsInOrderSpecification = []

    const setsNotInOrderSpecification = setsNames.filter((setName) => {
      const indexInOrder = entityTreeOrder.indexOf(setName)
      const found = indexInOrder !== -1

      if (found) {
        // make sure to only add set names present in sets
        setsInOrderSpecification.push({
          idx: indexInOrder,
          name: setName
        })
      }

      return !found
    })

    setsInOrderSpecification = setsInOrderSpecification.sort((a, b) => {
      if (a.idx > b.idx) {
        return 1
      }

      if (a.idx < b.idx) {
        return -1
      }

      return 0
    }).map((setInfo) => setInfo.name)

    return [...setsInOrderSpecification, ...setsNotInOrderSpecification]
  }

  getEntityTypeNameAttr (setName, entity) {
    return entity[entitySets[setName].nameAttribute]
  }

  getAllChildrenIds (items) {
    const children = []

    if (!items) {
      return children
    }

    items.forEach((node) => {
      const isGroupNode = node.isEntitySet === true || node.isGroup === true

      if (isGroupNode && node.isEntity === true) {
        children.push(node.data._id)

        if (node.items) {
          this.getAllChildrenIds(node.items).forEach((i) => children.push(i))
        }
      } else {
        children.push(node.data._id)
      }
    })

    return children
  }

  groupEntitiesByType (sets, entitiesByType) {
    const setsToRender = this.getSetsToRender(sets)

    return setsToRender.map((entitiesType) => ({
      name: entitiesType,
      isEntitySet: true,
      items: entitiesByType[entitiesType].map((entity) => ({
        name: this.getEntityTypeNameAttr(entity.__entitySet, entity),
        data: entity
      }))
    }))
  }

  groupEntitiesByHierarchy (sets, entitiesByType) {
    return groupEntitiesByHierarchyHelper(Object.keys(sets), entitiesByType, this.getEntityTypeNameAttr)
  }

  resolveEntityTreeIconStyle (entity, info) {
    for (const k in entityTreeIconResolvers) {
      const mode = entityTreeIconResolvers[k](entity, info)
      if (mode) {
        return mode
      }
    }

    return null
  }

  renderContextMenu (entity, isGroupEntity, items) {
    const { onNewClick, onRemove, onClone, onRename } = this.props

    return <div key='entity-contextmenu' className={style.contextMenuContainer}>
      <div className={style.contextMenu}>
        {isGroupEntity && (
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.tryHide() }}>
            <i className='fa fa-file' /> New Entity
          </div>
        )}
        {isGroupEntity && (
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); onNewClick('folders', { parentShortId: entity.shortid }); this.tryHide() }}>
            <i className='fa fa-folder' /> New Folder
          </div>
        )}
        {isGroupEntity && <hr />}
        <div
          className={style.contextButton}
          onClick={(e) => { e.stopPropagation(); onRename(entity._id); this.tryHide() }}>
          <i className='fa fa-pencil' /> Rename
        </div>
        {!isGroupEntity && (
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); onClone(entity); this.tryHide() }}>
            <i className='fa fa-clone' /> Clone
          </div>
        )}
        <div
          className={style.contextButton}
          onClick={(e) => {
            e.stopPropagation()

            const children = this.getAllChildrenIds(items)

            onRemove(entity._id, children.length > 0 ? children : undefined)

            this.tryHide()
          }}>
          <i className='fa fa-trash' /> Delete
        </div>
      </div>
    </div>
  }

  renderEntityTreeItemComponents (position, propsToItem, originalChildren) {
    if (position === 'container') {
      // if there are no components registered, defaults to original children
      if (!entityTreeItemComponents[position].length) {
        return originalChildren
      }

      // composing components when position is container
      const wrappedItemElement = entityTreeItemComponents[position].reduce((prevElement, b) => {
        if (prevElement == null) {
          return React.createElement(b, propsToItem, originalChildren)
        }

        return React.createElement(b, propsToItem, prevElement)
      }, null)

      if (!wrappedItemElement) {
        return null
      }

      return wrappedItemElement
    }

    return entityTreeItemComponents[position].map((p, i) => (
      React.createElement(p, {
        key: i,
        ...propsToItem
      }))
    )
  }

  renderEntityTreeToolbarComponents () {
    return entityTreeToolbarComponents.map((p, i) => (
      React.createElement(p, {
        key: i,
        setFilter: this.setFilter
      })
    ))
  }

  renderGroupNode (node, depth, objectId) {
    const name = node.name
    const items = node.items
    const { onNodeSelect, selectable } = this.props
    let groupIsEntity = false
    let groupStyle = node.data != null ? this.resolveEntityTreeIconStyle(node.data, { isCollapsed: this.state[objectId] === true }) : null
    const { contextMenuId } = this.state

    if (node.isEntity === true) {
      groupIsEntity = true
    }

    return (
      <div>
        <div
          onContextMenu={groupIsEntity ? (e) => this.contextMenu(e, node.data) : undefined}
          style={{ paddingLeft: `${(depth + 1) * 0.8}rem` }}
        >
          {selectable ? <input type='checkbox' defaultChecked onChange={(v) => onNodeSelect(name, !!v.target.checked)} /> : <span />}
          <span
            className={style.nodeTitle + ' ' + (this.state[objectId] ? style.collapsed : '')}
            onClick={() => this.collapse(objectId)}
          >
            {groupStyle && (
              <i key='entity-icon' className={style.entityIcon + ' fa ' + (groupStyle || '')}></i>
            )}
            {name}
          </span>
          {this.renderEntityTreeItemComponents('groupRight', node.data, undefined)}
          {node.isEntitySet ? (
            !selectable ? <a key={objectId + 'new'} onClick={() => this.props.onNewClick(name)} className={style.add}></a> : <span />
          ) : <span />}
          {!selectable && groupIsEntity && contextMenuId === node.data._id ? this.renderContextMenu(
            node.data,
            groupIsEntity,
            groupIsEntity ? node.items : undefined
          ) : <div key='empty-contextmenu' />}
        </div>
        <div className={style.nodeContainer + ' ' + (this.state[objectId] ? style.collapsed : '')}>
          {this.renderTree(items, depth + 1, objectId)}
        </div>
      </div>
    )
  }

  renderEntityNode (node, depth) {
    const { activeEntity, onSelect, onClick, selectable, entities: originalEntities } = this.props
    const { contextMenuId } = this.state
    const entity = node.data
    const entityStyle = this.resolveEntityTreeIconStyle(entity, {})

    return (
      <div
        onContextMenu={(e) => this.contextMenu(e, entity)}
        onClick={() => selectable ? onSelect(entity) : onClick(entity._id)}
        key={entity._id}
        className={style.link + ' ' + ((activeEntity && entity._id === activeEntity._id) ? style.active : '')}
        style={{ paddingLeft: `${(depth + 1) * 0.8}rem` }}
      >
        {this.renderEntityTreeItemComponents('container', { entity, entities: originalEntities }, [
          selectable ? <input key='search-name' type='checkbox' readOnly checked={entity.__selected !== false} /> : <span key='empty-search-name' />,
          <i key='entity-icon' className={style.entityIcon + ' fa ' + (entityStyle || (entitySets[entity.__entitySet].faIcon || style.entityDefaultIcon))}></i>,
          <a key='entity-name'>{this.getEntityTypeNameAttr(entity.__entitySet, entity) + (entity.__isDirty ? '*' : '')}</a>,
          this.renderEntityTreeItemComponents('right', { entity, entities: originalEntities }),
          !selectable && contextMenuId === entity._id ? this.renderContextMenu(entity) : <div key='empty-contextmenu' />
        ])}
      </div>
    )
  }

  renderItemNode (node = {}, depth, parentId) {
    const name = node.name
    const isGroupNode = node.isEntitySet === true || node.isGroup === true
    let objectId = name

    let treeDepth = depth || 0

    if (parentId != null) {
      objectId = `${parentId}--${name}`
    }

    if (treeDepth <= 0) {
      treeDepth = 0
    }

    if (isGroupNode) {
      objectId += '--group'
    } else {
      objectId += `--${node.data.__entitySet}`
    }

    objectId += `--${treeDepth}`

    return (
      <div
        key={objectId}
        className={`${style.nodeBox} ${!isGroupNode ? style.nodeBoxItem : ''}`}
      >
        {isGroupNode ? (
          this.renderGroupNode(node, treeDepth, objectId)
        ) : (
          this.renderEntityNode(node, treeDepth)
        )}
      </div>
    )
  }

  renderTree (items, depth, parentId) {
    return (
      <ReactList itemRenderer={this.createListItemRenderer(items, depth, parentId)} length={items.length} />
    )
  }

  render () {
    const entities = this.filterEntities(this.props.entities)
    const children = this.props.children

    return (
      <div className={style.treeListContainer}>
        {
          this.props.toolbar && entityTreeToolbarComponents.length > 0 && (
            <div className={style.toolbar}>
              {this.renderEntityTreeToolbarComponents()}
            </div>
          )
        }
        <div className={style.nodesBox}>
          {/*
            When a render callback (function as child) is passed it means that an extension
            wants to control how entity tree is rendered and we should pass all useful
            information to the callback
          */}
          {
            typeof children === 'function' ? children({
              // TODO: remove this function after finished implementation, we need to refactor
              // how tags entity tree render works
              renderClassicTree: () => this.renderTree(this.groupEntitiesByHierarchy(entitySets, entities)), // this.renderTree(this.groupEntitiesByType(entitySets, entities)),
              // renderObjectSubTree: this.renderObjectSubTree,
              getSetsToRender: this.getSetsToRender,
              getEntityTypeNameAttr: this.getEntityTypeNameAttr,
              groupEntitiesByType: this.groupEntitiesByType,
              groupEntitiesByHierarchy: this.groupEntitiesByHierarchy,
              entitySets,
              entities
            }) : (
              this.renderTree(this.groupEntitiesByType(entitySets, entities))
            )
          }
        </div>
      </div>
    )
  }
}
