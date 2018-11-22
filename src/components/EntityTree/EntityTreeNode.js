import React, {Component} from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import style from './EntityTree.scss'
import { checkIsGroupNode, checkIsGroupEntityNode, getNodeDOMId, getNodeTitleDOMId, getAllEntitiesInHierarchy } from './utils'
import ENTITY_NODE_DRAG_TYPE from './nodeDragType'
import { entitySets, entityTreeItemComponents, entityTreeIconResolvers } from '../../lib/configuration.js'

const nodeSource = {
  beginDrag (props, monitor, component) {
    const node = props.node

    return {
      entitySet: node.data.__entitySet,
      isGroupEntity: checkIsGroupEntityNode(node),
      isCollapsed: props.isCollapsed,
      node
    }
  }
}

const nodeTarget = {
  hover (props, monitor, component) {
    const { node } = props

    if (monitor.isOver({ shallow: true }) && props.onDragOver) {
      props.onDragOver({
        entitySet: node.data.__entitySet,
        isGroupEntity: checkIsGroupEntityNode(node),
        isCollapsed: props.isCollapsed,
        targetNode: node
      })
    }
  }
}

function collectForSource (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function collectForTarget (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class EntityTreeNode extends Component {
  constructor (props) {
    super(props)

    this.getDOMId = this.getDOMId.bind(this)
    this.getTitleDOMId = this.getTitleDOMId.bind(this)
  }

  componentDidMount () {
    const { registerEntityNode, node } = this.props
    const isEntityNode = checkIsGroupNode(node) ? checkIsGroupEntityNode(node) : true

    if (!isEntityNode) {
      return
    }

    registerEntityNode(node.data._id, Object.assign({}, node, { objectId: this.props.id }))
  }

  componentDidUpdate (prevProps) {
    const { registerEntityNode, node } = this.props
    const { node: prevNode } = prevProps
    const wasEntityNode = checkIsGroupNode(prevNode) ? checkIsGroupEntityNode(prevNode) : true
    const isEntityNode = checkIsGroupNode(node) ? checkIsGroupEntityNode(node) : true

    if (node.data._id !== prevNode.data._id) {
      if (wasEntityNode) {
        registerEntityNode(prevNode.data._id, null)
      }

      if (isEntityNode) {
        registerEntityNode(node.data._id, Object.assign({}, node, { objectId: this.props.id }))
      }
    }
  }

  componentWillUnmount () {
    const { registerEntityNode, node } = this.props
    const isEntityNode = checkIsGroupNode(node) ? checkIsGroupEntityNode(node) : true

    if (!isEntityNode) {
      return
    }

    registerEntityNode(node.data._id, null)
  }

  connectDragging (el) {
    const { selectable, draggable, connectDragSource, connectDragPreview } = this.props

    if (selectable || !draggable) {
      return el
    }

    return connectDragSource(connectDragPreview(el, { captureDraggingState: true }))
  }

  connectDropping (el) {
    const { selectable, draggable, connectDropTarget } = this.props

    if (selectable || !draggable) {
      return el
    }

    return connectDropTarget(el)
  }

  getDOMId (node) {
    if (checkIsGroupNode(node) && !checkIsGroupEntityNode(node)) {
      return undefined
    }

    return getNodeDOMId(node.data)
  }

  getTitleDOMId (node) {
    if (checkIsGroupNode(node) && !checkIsGroupEntityNode(node)) {
      return undefined
    }

    return getNodeTitleDOMId(node.data)
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

  renderGroupNode () {
    const {
      node,
      depth,
      id,
      isActive,
      isCollapsed,
      isDragging,
      contextMenuActive,
      selectable,
      draggable,
      showContextMenu,
      collapseNode,
      paddingByLevel,
      renderTree,
      renderContextMenu,
      onNewClick,
      onClick,
      onNodeSelect
    } = this.props

    const name = node.name
    const items = node.items
    const extraPropsSelectable = {}
    const groupStyle = node.data != null ? this.resolveEntityTreeIconStyle(node.data, { isCollapsed }) : null
    let groupIsEntity = checkIsGroupEntityNode(node)

    if (groupIsEntity) {
      if (selectable) {
        extraPropsSelectable.checked = node.data.__selected !== false
      } else {
        extraPropsSelectable.defaultChecked = true
      }
    }

    return (
      <div id={this.getDOMId(node)}>
        <div
          className={`${style.link} ${contextMenuActive ? style.focused : ''} ${(isActive && !isDragging) ? style.active : ''} ${isDragging ? style.dragging : ''}`}
          onContextMenu={groupIsEntity ? (e) => showContextMenu(e, node.data) : undefined}
          onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); groupIsEntity && onClick(node.data) }}
          style={{ paddingLeft: `${(depth + 1) * paddingByLevel}rem` }}
        >
          {selectable ? <input type='checkbox' {...extraPropsSelectable} onChange={(v) => {
            onNodeSelect(getAllEntitiesInHierarchy(node, true), !!v.target.checked)
          }} /> : null}
          <span
            id={this.getTitleDOMId(node)}
            className={`${style.nodeTitle} ${isCollapsed ? style.collapsed : ''}`}
            onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); collapseNode(id) }}
          >
            {this.connectDragging(
              <div className={`${style.nodeBoxItemContent} ${isDragging ? style.dragging : ''}`}>
                {groupStyle && (
                  <i key='entity-icon' className={style.entityIcon + ' fa ' + (groupStyle || '')} />
                )}
                {name + (groupIsEntity && node.data.__isDirty ? '*' : '')}
              </div>,
            )}
          </span>
          {this.renderEntityTreeItemComponents('groupRight', node.data, undefined)}
          {node.isEntitySet ? (
            !selectable ? <a key={id + 'new'} onClick={() => onNewClick(name)} className={style.add}></a> : null
          ) : null}
          {groupIsEntity ? renderContextMenu(
            node.data,
            { isGroupEntity: groupIsEntity, node }
          ) : null}
        </div>
        <div className={`${style.nodeContainer} ${isDragging ? style.dragging : ''} ${isCollapsed ? style.collapsed : ''}`}>
          {renderTree(items, depth + 1, id, draggable)}
        </div>
      </div>
    )
  }

  renderEntityNode () {
    const {
      node,
      depth,
      selectable,
      isActive,
      isDragging,
      contextMenuActive,
      originalEntities,
      paddingByLevel,
      renderContextMenu,
      getEntityTypeNameAttr,
      showContextMenu,
      onClick
    } = this.props

    const entity = node.data
    const entityStyle = this.resolveEntityTreeIconStyle(entity, {})

    return (
      <div
        id={this.getDOMId(node)}
        onContextMenu={(e) => showContextMenu(e, entity)}
        onClick={() => onClick(entity)}
        key={entity._id}
        className={`${style.link} ${contextMenuActive ? style.focused : ''} ${(isActive && !isDragging) ? style.active : ''} ${isDragging ? style.dragging : ''}`}
        style={{ paddingLeft: `${(depth + 1) * paddingByLevel}rem` }}
      >
        {this.renderEntityTreeItemComponents('container', { entity, entities: originalEntities }, [
          this.connectDragging(
            <div
              id={this.getTitleDOMId(node)}
              key='container-entity'
              className={`${style.nodeBoxItemContent} ${isDragging ? style.dragging : ''}`}
            >
              {selectable ? <input key='search-name' type='checkbox' readOnly checked={entity.__selected !== false} /> : null}
              <i key='entity-icon' className={style.entityIcon + ' fa ' + (entityStyle || (entitySets[entity.__entitySet].faIcon || style.entityDefaultIcon))}></i>
              <a key='entity-name'>{getEntityTypeNameAttr(entity.__entitySet, entity) + (entity.__isDirty ? '*' : '')}</a>
              {this.renderEntityTreeItemComponents('right', { entity, entities: originalEntities })}
            </div>
          ),
          renderContextMenu(entity, { node })
        ])}
      </div>
    )
  }

  render () {
    const { node } = this.props
    const isGroupNode = checkIsGroupNode(node)

    return this.connectDropping(
      <div
        className={`${style.nodeBox} ${!isGroupNode ? style.nodeBoxItem : ''}`}
      >
        {isGroupNode ? (
          this.renderGroupNode()
        ) : (
          this.renderEntityNode()
        )}
      </div>
    )
  }
}

export default DragSource(
  ENTITY_NODE_DRAG_TYPE,
  nodeSource,
  collectForSource
)(DropTarget(
  ENTITY_NODE_DRAG_TYPE,
  nodeTarget,
  collectForTarget
)(EntityTreeNode))
