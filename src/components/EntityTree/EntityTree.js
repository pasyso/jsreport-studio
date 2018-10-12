import React, {Component} from 'react'
import ReactList from 'react-list'
import {connect} from 'react-redux'
import EntityTreeNode from './EntityTreeNode'
import style from './EntityTree.scss'
import groupEntitiesByHierarchyHelper from '../../helpers/groupEntitiesByHierarchy'
import {actions as editorActions} from '../../redux/editor'
import {
  entitySets,
  entityTreeOrder,
  entityTreeToolbarComponents,
  entityTreeFilterItemResolvers
} from '../../lib/configuration.js'

function checkIsGroupNode (node) {
  return node.isEntitySet === true || node.isGroup === true
}

@connect((state) => ({}), { ...editorActions })
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
    this.state = { filter: {}, contextMenuId: null, clipboard: null }
    this.setFilter = this.setFilter.bind(this)
    this.setClipboard = this.setClipboard.bind(this)
    this.releaseClipboardTo = this.releaseClipboardTo.bind(this)
    this.getSetsToRender = this.getSetsToRender.bind(this)
    this.getEntityTypeNameAttr = this.getEntityTypeNameAttr.bind(this)
    this.contextMenu = this.contextMenu.bind(this)
    this.collapse = this.collapse.bind(this)
    this.getAllChildrenIds = this.getAllChildrenIds.bind(this)
    this.groupEntitiesByType = this.groupEntitiesByType.bind(this)
    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.renderContextMenu = this.renderContextMenu.bind(this)
    this.renderTree = this.renderTree.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', () => this.tryHide())
  }

  componentWillUnmount () {
    window.removeEventListener('click', () => this.tryHide())
  }

  createListItemRenderer (items, depth, parentId, treeIsDraggable) {
    return (index, key) => this.renderItemNode(items[index], depth, parentId, treeIsDraggable)
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

  setClipboard ({ action, entityId, entitySet }) {
    this.setState({
      clipboard: {
        action,
        entityId,
        entitySet
      }
    })
  }

  async releaseClipboardTo (destination) {
    const clipboard = this.state.clipboard

    if (clipboard == null) {
      return
    }

    this.props.hierarchyCopy({
      id: clipboard.entityId,
      entitySet: clipboard.entitySet
    }, {
      shortid: destination.shortid,
      referenceProperty: 'folder'
    }, clipboard.action === 'cut')

    this.setState({
      clipboard: null
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

  getEntityTypeNameAttr (setName, entity, returnNameAttr = false) {
    if (returnNameAttr) {
      return entitySets[setName].nameAttribute
    }

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

  handleNodeClick (entity) {
    const { selectable, onSelect, onClick } = this.props

    if (selectable) {
      onSelect(entity)
    } else {
      onClick(entity._id)
    }
  }

  renderContextMenu (entity, { isGroupEntity, items } = {}) {
    const { contextMenuId, clipboard } = this.state
    const { selectable, onNewClick, onRemove, onClone, onRename } = this.props
    const menuItems = []

    if (selectable || contextMenuId !== entity._id) {
      return (
        <div key='empty-contextmenu' />
      )
    }

    Object.keys(entitySets).forEach((setName) => {
      const entitySet = entitySets[setName]

      if (entitySet.visibleInTree === false) {
        return
      }

      menuItems.push(
        <div
          className={style.contextButton}
          key={entitySet.name}
          onClick={() => { onNewClick(entitySet.name, { defaults: { folder: { shortid: entity.shortid } } }); this.tryHide() }}>
          <i className={`fa ${entitySet.faIcon != null ? entitySet.faIcon : 'fa-file'}`} /> {entitySet.visibleName}
        </div>
      )
    })

    return (
      <div key='entity-contextmenu' className={style.contextMenuContainer}>
        <div className={style.contextMenu}>
          {isGroupEntity && (
            <div
              className={`${style.contextButton} ${style.hasNestedLevels}`}
              onClick={(e) => { e.stopPropagation() }}>
              <i className='fa fa-file' /> New Entity
              <div key='entity-contextmenu' className={`${style.contextMenuContainer} ${style.nestedLevel}`}>
                <div className={style.contextMenu}>
                  {menuItems}
                </div>
              </div>
            </div>
          )}
          {isGroupEntity && (
            <div
              className={style.contextButton}
              onClick={(e) => { e.stopPropagation(); onNewClick('folders', { defaults: { folder: { shortid: entity.shortid } } }); this.tryHide() }}>
              <i className='fa fa-folder' /> New Folder
            </div>
          )}
          {isGroupEntity && <hr />}
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); onRename(entity._id); this.tryHide() }}>
            <i className='fa fa-pencil' /> Rename
          </div>
          {isGroupEntity == null && (
            <div
              className={style.contextButton}
              onClick={(e) => { e.stopPropagation(); onClone(entity); this.tryHide() }}>
              <i className='fa fa-clone' /> Clone
            </div>
          )}
          {(isGroupEntity || isGroupEntity == null) && (
            <div
              className={`${style.contextButton} ${entity.__isNew === true ? style.disabled : ''}`}
              onClick={(e) => {
                e.stopPropagation()

                if (entity.__isNew === true) {
                  return
                }

                this.setClipboard({ action: 'cut', entityId: entity._id, entitySet: entity.__entitySet })
                this.tryHide()
              }}>
              <i className='fa fa-cut' /> Cut
            </div>
          )}
          {(isGroupEntity || isGroupEntity == null) && (
            <div
              className={`${style.contextButton} ${entity.__isNew === true ? style.disabled : ''}`}
              onClick={(e) => {
                e.stopPropagation()

                if (entity.__isNew === true) {
                  return
                }

                this.setClipboard({ action: 'copy', entityId: entity._id, entitySet: entity.__entitySet })
                this.tryHide()
              }}>
              <i className='fa fa-copy' /> Copy
            </div>
          )}
          {(isGroupEntity || isGroupEntity == null) && (
            <div
              className={`${style.contextButton} ${clipboard == null ? style.disabled : ''}`}
              onClick={(e) => {
                e.stopPropagation()

                if (clipboard == null) {
                  return
                }

                this.releaseClipboardTo({
                  shortid: isGroupEntity ? entity.shortid : (entity.folder != null ? entity.folder.shortid : null)
                })

                this.tryHide()
              }}>
              <i className='fa fa-paste' /> Paste
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

  renderItemNode (node = {}, depth, parentId, treeIsDraggable) {
    const { entities, selectable, activeEntity, onNewClick, onNodeSelect } = this.props
    const name = node.name
    const isGroupNode = node.isEntitySet === true || node.isGroup === true
    let objectId = name
    let treeDepth = depth || 0
    let isDraggable

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

    if (treeIsDraggable != null) {
      isDraggable = treeIsDraggable
    } else {
      if (checkIsGroupNode(node)) {
        isDraggable = false

        if (node.isEntity === true) {
          isDraggable = true
        }
      } else {
        isDraggable = true
      }
    }

    return (
      <EntityTreeNode
        key={objectId}
        id={objectId}
        node={node}
        depth={treeDepth}
        isCollapsed={this.state[objectId] === true}
        isActive={activeEntity !== null && node.data != null && node.data._id === activeEntity._id}
        selectable={selectable}
        draggable={isDraggable}
        originalEntities={entities}
        getEntityTypeNameAttr={this.getEntityTypeNameAttr}
        showContextMenu={this.contextMenu}
        collapseNode={this.collapse}
        renderTree={this.renderTree}
        renderContextMenu={this.renderContextMenu}
        onClick={this.handleNodeClick}
        onNewClick={onNewClick}
        onNodeSelect={onNodeSelect}
      />
    )
  }

  renderTree (items, depth, parentId, treeIsDraggable) {
    return (
      <ReactList itemRenderer={this.createListItemRenderer(items, depth, parentId, treeIsDraggable)} length={items.length} />
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
              renderDefaultTree: () => this.renderTree(this.groupEntitiesByHierarchy(entitySets, entities)),
              renderTree: this.renderTree,
              getSetsToRender: this.getSetsToRender,
              getEntityTypeNameAttr: this.getEntityTypeNameAttr,
              groupEntitiesByType: this.groupEntitiesByType,
              groupEntitiesByHierarchy: this.groupEntitiesByHierarchy,
              entitySets,
              entities
            }) : (
              this.renderTree(this.groupEntitiesByHierarchy(entitySets, entities))
            )
          }
        </div>
      </div>
    )
  }
}
