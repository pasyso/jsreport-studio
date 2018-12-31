import React, {Component} from 'react'
import { tabTitleComponents, entitySets } from '../../lib/configuration.js'
import style from './Tabs.scss'

function removePrefix(name) {
  let p = name.indexOf('!');
  return p > -1 ? [name.substring(0, p), name.substring(p+1)] : [null, name];
}

function formatEntityName(name) {
  return name
  // if (!name) return name
  // const [prefix, newName] = removePrefix(name)
  // if (!prefix) return name;
  // const Studio = window.Studio
  // const currentSc = (Studio && Studio.kadmosAuthentication && Studio.kadmosAuthentication.user) ? Studio.kadmosAuthentication.user.systemClientId : null;
  // return prefix!=currentSc ? name : newName
}

class TabTitle extends Component {
  constructor (props) {
    super(props)
    this.setNode = this.setNode.bind(this)
    this.handleChromeAuxClick = this.handleChromeAuxClick.bind(this)
  }

  componentDidMount () {
    // workaround for chrome not handling middle click on normal "onClick" listener
    const isChrome = !!window.chrome

    if (isChrome && this.node) {
      this.node.addEventListener('auxclick', this.handleChromeAuxClick)
    }
  }

  componentWillUnmount () {
    // workaround for chrome not handling middle click on normal "onClick" listener
    const isChrome = !!window.chrome && !!window.chrome.webstore

    if (isChrome && this.node) {
      this.node.removeEventListener('auxclick', this.handleChromeAuxClick)
    }
  }

  setNode (el) {
    this.node = el
  }

  handleChromeAuxClick (e) {
    if (e.which === 2) {
      return this.props.onClick(e, this.props.tab)
    }
  }

  render () {
    const { tab, active, contextMenu, complementTitle, resolveEntityPath, onClick, onContextMenu, onClose } = this.props
    let tabTooltip

    if (tab.entity) {
      const fullPath = resolveEntityPath(tab.entity, { parents: true, self: false })

      if (fullPath) {
        tabTooltip = fullPath
      }
    }

    return (
      <div
        ref={this.setNode}
        key={tab.tab.key}
        className={style.tabTitle + ' ' + (active ? style.active : '')}
        data-tab-key={tab.tab.key}
        title={tabTooltip}
        onClick={(e) => onClick(e, tab)}
        onContextMenu={(e) => onContextMenu(e, tab)}
      >
        <span>
          {tab.tab.titleComponentKey ? (
            React.createElement(tabTitleComponents[tab.tab.titleComponentKey], {
              entity: tab.entity,
              complementTitle,
              tab: tab.tab
            })
          ) : (
            [
              <span key='main-title' className={style.tabMainTitle}>{formatEntityName(tab.tab.title) || (formatEntityName(tab.entity[entitySets[tab.entity.__entitySet].nameAttribute]) + (tab.entity.__isDirty ? '*' : ''))}</span>,
              (complementTitle != null && (
                <span key='complement-title' className={style.tabComplementTitle}>&nbsp;{`- ${complementTitle}`}</span>
              ))
            ]
          )}
        </span>
        <div className={style.tabClose} onClick={(e) => { e.stopPropagation(); onClose(tab.tab.key) }}></div>
        {contextMenu != null ? contextMenu : <div key='empty-contextmenu' />}
      </div>
    )
  }
}

export default TabTitle
