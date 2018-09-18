import React, {Component} from 'react'
import { findDOMNode } from 'react-dom'
import { tabTitleComponents, entitySets } from '../../lib/configuration.js'
import style from './Tabs.scss'

class TabTitle extends Component {
  constructor (props) {
    super(props)
    this.handleChromeAuxClick = this.handleChromeAuxClick.bind(this)
  }

  componentDidMount () {
    // workaround for chrome not handling middle click on normal "onClick" listener
    const isChrome = !!window.chrome && !!window.chrome.webstore

    if (isChrome) {
      const el = findDOMNode(this.refs.container)
      el.addEventListener('auxclick', this.handleChromeAuxClick)
    }
  }

  componentWillUnmount () {
    // workaround for chrome not handling middle click on normal "onClick" listener
    const isChrome = !!window.chrome && !!window.chrome.webstore

    if (isChrome) {
      const el = findDOMNode(this.refs.container)
      el.removeEventListener('auxclick', this.handleChromeAuxClick)
    }
  }

  handleChromeAuxClick (e) {
    if (e.which === 2) {
      return this.props.onClick(e, this.props.tab)
    }
  }

  render () {
    const { tab, active, contextMenu, onClick, onContextMenu, onClose } = this.props

    return (
      <div
        ref='container'
        className={style.tabTitle + ' ' + (active ? style.active : '')}
        data-tab-key={tab.tab.key}
        onClick={(e) => onClick(e, tab)}
        onContextMenu={(e) => onContextMenu(e, tab)}
      >
        <span>{tab.tab.titleComponentKey ? React.createElement(tabTitleComponents[tab.tab.titleComponentKey], {
          entity: tab.entity,
          tab: tab.tab
        }) : (<span>{tab.tab.title || (tab.entity[entitySets[tab.entity.__entitySet].nameAttribute] + (tab.entity.__isDirty ? '*' : ''))}</span>)}</span>
        <div className={style.tabClose} onClick={(e) => { e.stopPropagation(); onClose(tab.tab.key) }}></div>
        {contextMenu != null ? contextMenu : <div key='empty-contextmenu' />}
      </div>
    )
  }
}

export default TabTitle
