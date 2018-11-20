import React, {Component} from 'react'
import ReactList from 'react-list'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import HighlightedArea from './HighlightedArea'
import EntityTreeNode from './EntityTreeNode'
import HierarchyReplaceEntityModal from '../Modals/HierarchyReplaceEntityModal'
import style from './EntityTree.scss'
import ENTITY_NODE_DRAG_TYPE from './nodeDragType'
import { checkIsGroupNode, checkIsGroupEntityNode, getNodeDOMId, getNodeTitleDOMId, getAllEntitiesInHierarchy } from './utils'
import groupEntitiesByHierarchyHelper from '../../helpers/groupEntitiesByHierarchy'
import { selectors as entitiesSelectors } from '../../redux/entities'
import { actions as editorActions } from '../../redux/editor'
import {
  entitySets,
  entityTreeOrder,
  entityTreeToolbarComponents,
  entityTreeFilterItemResolvers,
  modalHandler
} from '../../lib/configuration.js'

const paddingByLevelInTree = 0.8

function pointIsInsideContainer (containerDimensions, point) {
  const insideX = point.x >= containerDimensions.left && point.x <= (containerDimensions.left + containerDimensions.width)
  const insideY = point.y >= containerDimensions.top && point.y <= (containerDimensions.top + containerDimensions.height)

  return insideX && insideY
}

const entityTreeTarget = {
  hover (props, monitor, component) {
    if (!monitor.isOver()) {
      return
    }

    const clientOffset = monitor.getClientOffset()
    const sourceNode = monitor.getItem().node
    const listNodeDimensions = component.listNode.getBoundingClientRect()
    const isInsideContainer = pointIsInsideContainer(listNodeDimensions, clientOffset)

    if (
      monitor.isOver({ shallow: true }) &&
      !isInsideContainer
    ) {
      if (clientOffset.y < listNodeDimensions.top) {
        component.dragOverContext = null
        return component.clearHighlightedArea()
      } else {
        return component.showHighlightedArea(sourceNode)
      }
    }

    const { targetNode } = component.dragOverContext || {}

    if (!targetNode) {
      return
    }

    component.showHighlightedArea(sourceNode, targetNode)
  },
  drop (props, monitor, component) {
    const dragOverContext = component.dragOverContext
    const sourceEntitySet = monitor.getItem().entitySet
    const sourceNode = monitor.getItem().node
    const targetNode = dragOverContext ? dragOverContext.targetNode : undefined
    let sourceInfo
    let targetInfo

    if (sourceNode && dragOverContext && !dragOverContext.containerTargetEntity) {
      if (!dragOverContext.overRoot) {
        if (!component.isValidHierarchyTarget(sourceNode, targetNode)) {
          return
        }
      }

      sourceInfo = {
        id: sourceNode.data._id,
        entitySet: sourceEntitySet
      }

      targetInfo = {
        shortid: null,
        referenceProperty: 'folder'
      }
    } else if (
      sourceNode &&
      dragOverContext &&
      dragOverContext.containerTargetEntity
    ) {
      if (!component.isValidHierarchyTarget(sourceNode, targetNode)) {
        return
      }

      // skip drop over same hierarchy
      if (
        (sourceNode.data.__entitySet === 'folders' &&
        sourceNode.data.shortid === dragOverContext.containerTargetEntity.shortid) ||
        (sourceNode.data.folder && sourceNode.data.folder.shortid === dragOverContext.containerTargetEntity.shortid)
      ) {
        return
      }

      component.dragOverContext = null
      component.clearHighlightedArea()

      sourceInfo = {
        id: sourceNode.data._id,
        entitySet: sourceEntitySet
      }

      targetInfo = {
        shortid: dragOverContext.containerTargetEntity.shortid,
        children: getAllEntitiesInHierarchy(component.entityNodesById[dragOverContext.containerTargetEntity._id]),
        referenceProperty: 'folder'
      }
    }

    if (sourceInfo && targetInfo) {
      component.dragOverContext = null
      component.clearHighlightedArea()

      component.copyOrMoveEntity(sourceInfo, targetInfo)
    }
  }
}

function collect (connect, monitor) {
  return {
    dragType: monitor.getItemType(),
    draggedNode: monitor.getItem(),
    connectDropTarget: connect.dropTarget(),
    isDraggingOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class EntityTree extends Component {
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

    this.state = {
      filter: {},
      contextMenuId: null,
      clipboard: null,
      highlightedArea: null
    }

    this.dragOverContext = null
    this.entityNodesById = {}

    this.setListContainerNode = this.setListContainerNode.bind(this)
    this.setListNode = this.setListNode.bind(this)
    this.setContextMenuNode = this.setContextMenuNode.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.setClipboard = this.setClipboard.bind(this)
    this.isValidHierarchyTarget = this.isValidHierarchyTarget.bind(this)
    this.showHighlightedArea = this.showHighlightedArea.bind(this)
    this.clearHighlightedArea = this.clearHighlightedArea.bind(this)
    this.copyOrMoveEntity = this.copyOrMoveEntity.bind(this)
    this.releaseClipboardTo = this.releaseClipboardTo.bind(this)
    this.getSetsToRender = this.getSetsToRender.bind(this)
    this.getEntityTypeNameAttr = this.getEntityTypeNameAttr.bind(this)
    this.registerEntityNode = this.registerEntityNode.bind(this)
    this.contextMenu = this.contextMenu.bind(this)
    this.collapse = this.collapse.bind(this)
    this.getEntityTreeListContainerDimensions = this.getEntityTreeListContainerDimensions.bind(this)
    this.groupEntitiesByType = this.groupEntitiesByType.bind(this)
    this.handleGlobalClick = this.handleGlobalClick.bind(this)
    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.handleNodeDragOver = this.handleNodeDragOver.bind(this)
    this.renderContextMenu = this.renderContextMenu.bind(this)
    this.renderTree = this.renderTree.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.handleGlobalClick, true)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.draggedNode && !nextProps.draggedNode) {
      this.dragOverContext = null
      this.clearHighlightedArea()
    } else if (
      this.props.isDraggingOver &&
      !nextProps.isDraggingOver &&
      // ensure that we don't process this part when dropping
      // (when dropping, canDrop changes to false)
      this.props.canDrop === true && nextProps.canDrop === true
    ) {
      this.dragOverContext = null
      this.clearHighlightedArea()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleGlobalClick, true)
    this.entityNodesById = {}
  }

  connectDropping (el) {
    const { selectable, connectDropTarget } = this.props

    if (selectable) {
      return el
    }

    return connectDropTarget(el)
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

  setListContainerNode (el) {
    this.listContainerNode = el
  }

  setListNode (el) {
    this.listNode = el
  }

  setContextMenuNode (el) {
    this.contextMenuNode = el
  }

  registerEntityNode (id, node) {
    if (id == null || node === undefined) {
      return
    }

    if (node === null) {
      delete this.entityNodesById[id]
    } else {
      this.entityNodesById[id] = node
    }
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

  isValidHierarchyTarget (sourceNode, targetNode) {
    const { getEntityByShortid } = this.props
    const containersInHierarchyForTarget = []
    let containerSourceEntity
    let containerTargetEntity

    if (sourceNode.data.__entitySet === 'folders') {
      containerSourceEntity = getEntityByShortid(sourceNode.data.shortid)
    } else {
      if (sourceNode.data.folder == null) {
        return true
      }

      containerSourceEntity = getEntityByShortid(sourceNode.data.folder.shortid)
    }

    if (targetNode.data.__entitySet === 'folders') {
      containerTargetEntity = getEntityByShortid(targetNode.data.shortid)
    } else {
      if (targetNode.data.folder == null) {
        return true
      }

      containerTargetEntity = getEntityByShortid(targetNode.data.folder.shortid)
    }

    let currentContainer = containerTargetEntity

    if (containerSourceEntity.shortid === containerTargetEntity.shortid) {
      return false
    }

    containersInHierarchyForTarget.push(containerTargetEntity.shortid)

    while (
      currentContainer.shortid !== containerSourceEntity.shortid &&
      currentContainer.folder != null
    ) {
      const parentContainer = getEntityByShortid(currentContainer.folder.shortid)
      containersInHierarchyForTarget.push(parentContainer.shortid)
      currentContainer = parentContainer
    }

    if (
      containersInHierarchyForTarget.indexOf(containerSourceEntity.shortid) !== -1
    ) {
      return false
    }

    return true
  }

  showHighlightedArea (sourceEntityNode, targetEntityNode) {
    const { getEntityByShortid } = this.props
    const highlightedArea = {}
    let containerTargetInContext

    if (!targetEntityNode) {
      const hierarchyEntityDimensions = this.listNode.getBoundingClientRect()

      highlightedArea.hierarchy = {
        top: hierarchyEntityDimensions.top - 2,
        left: hierarchyEntityDimensions.left + 6,
        width: `${paddingByLevelInTree}rem`,
        height: hierarchyEntityDimensions.height + 4
      }

      if (this.dragOverContext) {
        this.dragOverContext.overRoot = true
      }
    } else if (targetEntityNode.data.folder != null || targetEntityNode.data.__entitySet === 'folders') {
      let hierarchyEntity

      if (this.dragOverContext) {
        this.dragOverContext.overRoot = false
      }

      if (targetEntityNode.data.__entitySet === 'folders') {
        hierarchyEntity = getEntityByShortid(targetEntityNode.data.shortid)
        containerTargetInContext = hierarchyEntity
      } else {
        hierarchyEntity = getEntityByShortid(targetEntityNode.data.folder.shortid)
        containerTargetInContext = hierarchyEntity
      }

      if (sourceEntityNode.data.__entitySet === 'folders') {
        if (!this.isValidHierarchyTarget(sourceEntityNode, targetEntityNode)) {
          return this.clearHighlightedArea()
        }
      }

      const hierarchyEntityNodeId = getNodeDOMId(hierarchyEntity)
      const hierarchyEntityTitleNodeId = getNodeTitleDOMId(hierarchyEntity)

      if (!hierarchyEntityNodeId || !hierarchyEntityTitleNodeId) {
        return
      }

      const hierarchyEntityDOMNode = document.getElementById(hierarchyEntityNodeId)
      const hierarchyEntityTitleDOMNode = document.getElementById(hierarchyEntityTitleNodeId)

      if (!hierarchyEntityDOMNode || !hierarchyEntityTitleDOMNode) {
        return
      }

      const hierarchyEntityDimensions = hierarchyEntityDOMNode.getBoundingClientRect()
      const hierachyEntityTitleDimensions = hierarchyEntityTitleDOMNode.getBoundingClientRect()

      highlightedArea.label = {
        top: hierachyEntityTitleDimensions.top,
        left: hierachyEntityTitleDimensions.left,
        width: hierachyEntityTitleDimensions.width,
        height: hierachyEntityTitleDimensions.height
      }

      highlightedArea.hierarchy = {
        top: hierachyEntityTitleDimensions.top + (hierachyEntityTitleDimensions.height + 4),
        left: hierachyEntityTitleDimensions.left,
        width: `${paddingByLevelInTree}rem`,
        height: hierarchyEntityDimensions.height - (hierachyEntityTitleDimensions.height + 4)
      }
    }

    if (Object.keys(highlightedArea).length > 0) {
      if (this.dragOverContext) {
        this.dragOverContext.containerTargetEntity = containerTargetInContext
      }

      this.setState({
        highlightedArea
      })
    }
  }

  clearHighlightedArea () {
    this.setState({
      highlightedArea: null
    })
  }

  copyOrMoveEntity (sourceInfo, targetInfo, shouldCopy = false) {
    const { hierarchyMove } = this.props

    hierarchyMove(sourceInfo, targetInfo, shouldCopy, false, true).then((result) => {
      if (result.duplicatedEntity !== true) {
        return
      }

      modalHandler.open(HierarchyReplaceEntityModal, {
        sourceId: sourceInfo.id,
        targetShortId: targetInfo.shortid,
        targetChildren: targetInfo.children,
        shouldCopy,
        referenceProperty: targetInfo.referenceProperty
      })
    })
  }

  releaseClipboardTo (destination) {
    const clipboard = this.state.clipboard

    if (clipboard == null) {
      return
    }

    this.copyOrMoveEntity({
      id: clipboard.entityId,
      entitySet: clipboard.entitySet
    }, {
      shortid: destination.shortid,
      children: destination.children,
      referenceProperty: 'folder'
    }, clipboard.action === 'copy')

    this.setState({
      clipboard: null
    })
  }

  getEntityTreeListContainerDimensions () {
    return this.listContainerNode.getBoundingClientRect()
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

  handleGlobalClick (ev) {
    const LEFT_CLICK = 1
    const button = ev.which || ev.button

    if (!this.state.contextMenuId || !this.contextMenuNode) {
      return
    }

    ev.preventDefault()

    if (!this.contextMenuNode.contains(ev.target)) {
      ev.stopPropagation()

      // handle quirk in firefox that fires and additional click event during
      // contextmenu event, this code prevents the context menu to
      // inmediatly be closed after being shown in firefox
      if (button === LEFT_CLICK) {
        this.tryHide()
      }
    }
  }

  handleNodeClick (entity) {
    const { selectable, onSelect, onClick } = this.props

    if (selectable) {
      onSelect(entity)
    } else {
      onClick(entity._id)
    }

    this.tryHide()
  }

  handleNodeDragOver (dragOverContext) {
    if (!this.props.isDraggingOver || !dragOverContext) {
      return
    }

    if (
      this.dragOverContext != null &&
      this.dragOverContext.targetNode.data._id === dragOverContext.targetNode.data._id
    ) {
      this.dragOverContext = Object.assign(this.dragOverContext, dragOverContext)
    } else {
      this.dragOverContext = dragOverContext
    }
  }

  renderContextMenu (entity, { isGroupEntity, node } = {}) {
    const { contextMenuId, clipboard } = this.state
    const { selectable, onNewClick, onRemove, onClone, onRename } = this.props
    const menuItems = []

    if (selectable || contextMenuId !== entity._id) {
      return null
    }

    Object.keys(entitySets).forEach((setName) => {
      const entitySet = entitySets[setName]

      if (entitySet.visibleInTree === false) {
        return
      }

      menuItems.push(
        <div
          key={entitySet.name}
          className={style.contextButton}
          onClick={() => { onNewClick(entitySet.name, { defaults: { folder: { shortid: entity.shortid } } }); this.tryHide() }}>
          <i className={`fa ${entitySet.faIcon != null ? entitySet.faIcon : 'fa-file'}`} /> {entitySet.visibleName}
        </div>
      )
    })

    return (
      <div key='entity-contextmenu' ref={this.setContextMenuNode} className={style.contextMenuContainer}>
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

                this.setClipboard({ action: 'move', entityId: entity._id, entitySet: entity.__entitySet })
                this.tryHide()
              }}>
              <i className='fa fa-cut' /> Cut
            </div>
          )}
          {(isGroupEntity == null) && (
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
                  shortid: isGroupEntity ? entity.shortid : (entity.folder != null ? entity.folder.shortid : null),
                  children: isGroupEntity ? getAllEntitiesInHierarchy(node) : []
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

              const children = getAllEntitiesInHierarchy(node)

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
    const isGroupNode = checkIsGroupNode(node)
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

        if (checkIsGroupEntityNode(node)) {
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
        paddingByLevel={paddingByLevelInTree}
        getEntityTypeNameAttr={this.getEntityTypeNameAttr}
        registerEntityNode={this.registerEntityNode}
        showContextMenu={this.contextMenu}
        collapseNode={this.collapse}
        renderTree={this.renderTree}
        renderContextMenu={this.renderContextMenu}
        onClick={this.handleNodeClick}
        onNewClick={onNewClick}
        onNodeSelect={onNodeSelect}
        onDragOver={this.handleNodeDragOver}
      />
    )
  }

  renderTree (items, depth, parentId, treeIsDraggable) {
    return (
      <ReactList
        itemRenderer={this.createListItemRenderer(items, depth, parentId, treeIsDraggable)}
        length={items.length}
      />
    )
  }

  render () {
    const { highlightedArea } = this.state
    const entities = this.filterEntities(this.props.entities)
    const children = this.props.children

    return this.connectDropping(
      <div className={style.treeListContainer}>
        {
          this.props.toolbar && entityTreeToolbarComponents.length > 0 && (
            <div className={style.toolbar}>
              {this.renderEntityTreeToolbarComponents()}
            </div>
          )
        }
        <div ref={this.setListContainerNode} className={style.nodesBox}>
          {/*
            When a render callback (function as child) is passed it means that an extension
            wants to control how entity tree is rendered and we should pass all useful
            information to the callback
          */}
          {
            typeof children === 'function' ? children({
              // we render the root tree with a wraper div to be able to
              // calculate some things for the drag and drop interactions
              renderDefaultTree: () => <div ref={this.setListNode}>{this.renderTree(this.groupEntitiesByHierarchy(entitySets, entities))}</div>,
              renderTree: (...args) => <div ref={this.setListNode}>{this.renderTree(...args)}</div>,
              getSetsToRender: this.getSetsToRender,
              getEntityTypeNameAttr: this.getEntityTypeNameAttr,
              groupEntitiesByType: this.groupEntitiesByType,
              groupEntitiesByHierarchy: this.groupEntitiesByHierarchy,
              entitySets,
              entities
            }) : (
              <div ref={this.setListNode}>
                {this.renderTree(this.groupEntitiesByHierarchy(entitySets, entities))}
              </div>
            )
          }
          <HighlightedArea
            highlightedArea={highlightedArea}
            getContainerDimensions={this.getEntityTreeListContainerDimensions}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    getEntityByShortid: (shortid) => entitiesSelectors.getByShortid(state, shortid)
  }),
  { ...editorActions }
)(DropTarget(ENTITY_NODE_DRAG_TYPE, entityTreeTarget, collect)(EntityTree))
