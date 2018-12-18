import React, { Component } from 'react'
import { connect } from 'react-redux'
import { modalHandler } from '../../../lib/configuration.js'
import { selectors as entitiesSelectors } from '../../../redux/entities'
import EntityTreeSelectionModal from '../../Modals/EntityTreeSelectionModal.js'
import styles from './EntityRefSelect.scss'

class EntityRefSelect extends Component {
  constructor (props) {
    super(props)

    this.handleOpenTree = this.handleOpenTree.bind(this)
    this.renderSelectedList = this.renderSelectedList
  }

  handleOpenTree () {
    const { onChange } = this.props

    modalHandler.open(EntityTreeSelectionModal, {
      entitySet: this.props.entitySet,
      selected: this.props.value,
      multiple: this.props.multiple !== false,
      onSave: (selected) => onChange(selected)
    })
  }

  renderSelectedList () {
    const {
      value,
      size = 5,
      multiple = false,
      getEntityByShortid,
      resolveEntityPath
    } = this.props

    const height = 16.46 * size
    let currentValue
    let items = []

    if (value != null) {
      currentValue = multiple === true ? value : [value]
    }

    if (currentValue) {
      currentValue.forEach((eShortid) => {
        const entity = getEntityByShortid(eShortid, false)

        if (!entity) {
          return
        }

        const namePath = resolveEntityPath(entity)

        items.push(
          <li key={namePath} className={styles.listOption}>
            <span>{namePath}</span>
          </li>
        )
      })
    }

    return (
      <ul
        className={styles.list}
        tabIndex='0'
        style={{ minHeight: height, maxHeight: height }}
      >
        {items}
      </ul>
    )
  }

  render () {
    const { value, multiple } = this.props
    let label

    if (multiple) {
      label = value != null && value.length > 0 ? 'edit...' : 'select...'
    } else {
      label = value != null ? 'edit...' : 'select...'
    }

    return (
      <div>
        <div className={styles.heading}>
          <button
            className={styles.openTree}
            onClick={this.handleOpenTree}
          >
            {label}
          </button>
        </div>
        <div className={styles.select}>
          {this.renderSelectedList()}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    getEntityByShortid: (shortid, ...params) => entitiesSelectors.getByShortid(state, shortid, ...params),
    resolveEntityPath: (_id, ...params) => entitiesSelectors.resolveEntityPath(state, _id, ...params)
  })
)(EntityRefSelect)
