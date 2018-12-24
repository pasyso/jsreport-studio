import React, {Component} from 'react'
import { findDOMNode } from 'react-dom'
import { tabTitleComponents, entitySets } from '../../lib/configuration.js'
import style from './Tabs.scss'

function removePrefix(name) {
  let p = name.indexOf('!');
  return p > -1 ? [name.substring(0, p), name.substring(p+1)] : [null, name];
}

function formatEntityName(name) {
  if (!name) return name
  const [prefix, newName] = removePrefix(name)
  if (!prefix) return name;
  const Studio = window.Studio
  const currentSc = (Studio && Studio.kadmosAuthentication && Studio.kadmosAuthentication.user) ? Studio.kadmosAuthentication.user.systemClientId : null;
  return prefix!=currentSc ? name : newName
}

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
        }) : (<span>{formatEntityName(tab.tab.title) || (formatEntityName(tab.entity[entitySets[tab.entity.__entitySet].nameAttribute]) + (tab.entity.__isDirty ? '*' : ''))}</span>)}</span>
        <div className={style.tabClose} onClick={(e) => { e.stopPropagation(); onClose(tab.tab.key) }}></div>
        {contextMenu != null ? contextMenu : <div key='empty-contextmenu' />}
      </div>
    )
  }
}

export default TabTitle
