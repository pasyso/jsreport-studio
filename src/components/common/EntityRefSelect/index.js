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
    this.renderSelectedControl = this.renderSelectedControl
  }

  handleOpenTree () {
    const { onChange } = this.props

    modalHandler.open(EntityTreeSelectionModal, {
      headingLabel: this.props.headingLabel,
      filter: this.props.filter,
      selectableFilter: this.props.selectableFilter,
      selected: this.props.value,
      multiple: this.props.multiple === true,
      onSave: (selected) => onChange(selected)
    })
  }

  renderSelectedControl () {
    const {
      value,
      size,
      multiple = false,
      getEntityByShortid,
      resolveEntityPath
    } = this.props

    let currentValue

    if (value != null) {
      currentValue = multiple === true ? value : [value]
    }

    if (!multiple) {
      let textToShow

      if (currentValue != null && currentValue[0] != null) {
        const entity = getEntityByShortid(currentValue[0], false)

        if (!entity) {
          textToShow = ''
        } else {
          textToShow = resolveEntityPath(entity)
        }
      } else {
        textToShow = ''
      }

      return (
        <input
          style={{ display: 'inline', padding: '0px', margin: '0px' }}
          title={textToShow}
          type='text'
          placeholder={'not selected'}
          value={textToShow}
          readOnly
        />
      )
    }

    const sizeToUse = size != null ? size : multiple ? 5 : 1
    const height = 16.46 * sizeToUse

    let items = []

    if (currentValue) {
      currentValue.forEach((eShortid) => {
        const entity = getEntityByShortid(eShortid, false)

        if (!entity) {
          return
        }

        const namePath = resolveEntityPath(entity)

        items.push(
          <li key={namePath} title={namePath} className={styles.listOption}>
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
    let content
    let label

    if (multiple) {
      label = value != null && value.length > 0 ? 'edit...' : 'select...'
    } else {
      label = value != null ? 'edit...' : 'select...'
    }

    if (!multiple) {
      content = (
        <div>
          <div style={{ display: 'inline-block' }}>
            <button
              className={styles.openTree}
              title={label}
              style={{ display: 'inline', width: '25px' }}
              onClick={this.handleOpenTree}
            >
              <i className='fa fa-edit' />
            </button>
            {' '}
            {this.renderSelectedControl()}
          </div>
        </div>
      )
    } else {
      content = [
        <div key='heading' className={styles.heading}>
          <button
            className={styles.openTree}
            onClick={this.handleOpenTree}
          >
            {label}
          </button>
        </div>,
        <div key='select' className={styles.select}>
          {this.renderSelectedControl()}
        </div>
      ]
    }

    return (
      <div>
        {content}
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
