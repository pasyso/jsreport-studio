import React, {Component} from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import style from './EntityTree.scss'
import { entitySets, entityTreeItemComponents, entityTreeIconResolvers } from '../../lib/configuration.js'

const nodeSource = {
  beginDrag (props, monitor, component) {
    return {}
  }
}

const nodeTarget = {
  drop (props, monitor, component) {
    console.log('dropping..')
  },
  hover (props, monitor, component) {
    const { node } = props

    if (monitor.isOver({ shallow: true })) {
      console.log('hovering exactly..')
    } else {
      console.log('hovering around..')
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

function checkIsGroupNode (node) {
  return node.isEntitySet === true || node.isGroup === true
}

class EntityTreeNode extends Component {
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

  getAllEntitiesInHierarchy (node, allEntities) {
    const isGroupNode = checkIsGroupNode(node)
    const entities = allEntities == null ? [] : allEntities

    if (isGroupNode && node.isEntity === true) {
      entities.push(node.data._id)
    } else {
      entities.push(node.data._id)
    }

    if (node.items) {
      node.items.forEach((cNode) => this.getAllEntitiesInHierarchy(cNode, entities))
    }

    return entities
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
      isCollapsed,
      isDragging,
      selectable,
      draggable,
      showContextMenu,
      collapseNode,
      renderTree,
      renderContextMenu,
      onNewClick,
      onNodeSelect
    } = this.props

    const name = node.name
    const items = node.items
    const extraPropsSelectable = {}
    const groupStyle = node.data != null ? this.resolveEntityTreeIconStyle(node.data, { isCollapsed }) : null
    let groupIsEntity = false

    if (node.isEntity === true) {
      groupIsEntity = true

      if (selectable) {
        extraPropsSelectable.checked = node.data.__selected !== false
      } else {
        extraPropsSelectable.defaultChecked = true
      }
    }

    return (
      <div>
        <div
          onContextMenu={groupIsEntity ? (e) => showContextMenu(e, node.data) : undefined}
          style={{ paddingLeft: `${(depth + 1) * 0.8}rem` }}
        >
          {selectable ? <input type='checkbox' {...extraPropsSelectable} onChange={(v) => {
            onNodeSelect(this.getAllEntitiesInHierarchy(node), !!v.target.checked)
          }} /> : <span />}
          <span
            className={`${style.nodeTitle} ${isCollapsed ? style.collapsed : ''}`}
            onClick={() => collapseNode(id)}
          >
            {this.connectDragging(
              <div className={`${style.nodeBoxItemContent} ${isDragging ? style.dragging : ''}`}>
                {groupStyle && (
                  <i key='entity-icon' className={style.entityIcon + ' fa ' + (groupStyle || '')}></i>
                )}
                {name}
              </div>,
            )}
          </span>
          {this.renderEntityTreeItemComponents('groupRight', node.data, undefined)}
          {node.isEntitySet ? (
            !selectable ? <a key={id + 'new'} onClick={() => onNewClick(name)} className={style.add}></a> : <span />
          ) : <span />}
          {groupIsEntity ? renderContextMenu(
            node.data,
            { isGroupEntity: groupIsEntity, items: groupIsEntity ? node.items : undefined }
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
      originalEntities,
      renderContextMenu,
      getEntityTypeNameAttr,
      showContextMenu,
      onClick
    } = this.props

    const entity = node.data
    const entityStyle = this.resolveEntityTreeIconStyle(entity, {})

    return (
      <div
        onContextMenu={(e) => showContextMenu(e, entity)}
        onClick={() => onClick(entity)}
        key={entity._id}
        className={`${style.link} ${isActive ? style.active : ''} ${isDragging ? style.dragging : ''}`}
        style={{ paddingLeft: `${(depth + 1) * 0.8}rem` }}
      >
        {this.renderEntityTreeItemComponents('container', { entity, entities: originalEntities }, [
          this.connectDragging(
            <div key='container-entity' className={`${style.nodeBoxItemContent} ${isDragging ? style.dragging : ''}`}>
              {selectable ? <input key='search-name' type='checkbox' readOnly checked={entity.__selected !== false} /> : <span key='empty-search-name' />}
              <i key='entity-icon' className={style.entityIcon + ' fa ' + (entityStyle || (entitySets[entity.__entitySet].faIcon || style.entityDefaultIcon))}></i>
              <a key='entity-name'>{getEntityTypeNameAttr(entity.__entitySet, entity) + (entity.__isDirty ? '*' : '')}</a>
              {this.renderEntityTreeItemComponents('right', { entity, entities: originalEntities })}
            </div>
          ),
          renderContextMenu(entity)
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
  'ENTITY_TREE_NODE',
  nodeSource,
  collectForSource
)(DropTarget(
  'ENTITY_TREE_NODE',
  nodeTarget,
  collectForTarget
)(EntityTreeNode))
