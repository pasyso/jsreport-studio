import React, { Component } from 'react'
import NewEntityModal from '../Modals/NewEntityModal'
import EntityTreeButton from './EntityTreeButton'
import { getVisibleEntitySetsInTree } from './utils'
import {
  entitySets,
  modalHandler
} from '../../lib/configuration'
import style from './EntityTree.scss'

class EntityTreeNewEntityButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isMenuActive: false
    }

    this.setMenuNode = this.setMenuNode.bind(this)
    this.tryHide = this.tryHide.bind(this)
    this.handleGlobalClick = this.handleGlobalClick.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.handleGlobalClick, true)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleGlobalClick, true)
  }

  setMenuNode (el) {
    this.menuNode = el
  }

  tryHide () {
    this.setState({
      isMenuActive: false
    })
  }

  handleGlobalClick (ev) {
    const LEFT_CLICK = 1
    const button = ev.which || ev.button

    if (!this.state.isMenuActive || !this.menuNode) {
      return
    }

    ev.preventDefault()

    if (!this.menuNode.contains(ev.target)) {
      ev.stopPropagation()

      // handle quirk in firefox that fires and additional click event during
      // contextmenu event, this code prevents the context menu to
      // inmediatly be closed after being shown in firefox
      if (button === LEFT_CLICK) {
        this.tryHide()
      }
    }
  }

  renderMenu () {
    const { isMenuActive } = this.state
    let menuItems = []

    if (!isMenuActive) {
      return null
    }

    menuItems = getVisibleEntitySetsInTree(entitySets).map((entitySet) => (
      <div
        key={entitySet.name}
        className={style.contextButton}
        onClick={() => { modalHandler.open(NewEntityModal, { entitySet: entitySet.name }); this.tryHide() }}>
        <i className={`fa ${entitySet.faIcon != null ? entitySet.faIcon : 'fa-file'}`} /> {entitySet.visibleName}
      </div>
    ))

    return (
      <div key='entity-contextmenu' ref={this.setMenuNode} className={style.contextMenuContainer}>
        <div className={style.contextMenu}>
          {menuItems}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div title='Add new entity' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <EntityTreeButton onClick={() => this.setState((state) => ({ isMenuActive: !state.isMenuActive }))}>
          <span style={{ display: 'inline-block' }}>
            <i className='fa fa-file' />
          </span>
        </EntityTreeButton>
        {this.renderMenu()}
      </div>
    )
  }
}

export default EntityTreeNewEntityButton
