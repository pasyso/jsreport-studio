import React, {Component} from 'react'
import TabTitle from './TabTitle'
import style from './Tabs.scss'

export default class TabTitles extends Component {
  static propTypes = {
    activeTabKey: React.PropTypes.string,
    activateTab: React.PropTypes.func.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    tabs: React.PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.handleTabClick = this.handleTabClick.bind(this)
    this.handleTabContextMenu = this.handleTabContextMenu.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', () => this.tryHide())
  }

  componentWillUnmount () {
    window.removeEventListener('click', () => this.tryHide())
  }

  tryHide () {
    if (this.state.contextMenuKey) {
      this.setState({ contextMenuKey: null })
    }
  }

  closeTab (tabKey) {
    this.props.closeTab(tabKey)
  }

  closeOtherTabs (tabKey) {
    const { tabs } = this.props

    tabs.forEach((t) => {
      if (t.tab.key === tabKey) {
        return
      }

      this.props.closeTab(t.tab.key)
    })
  }

  closeTabsToTheRight (tabKey) {
    const { tabs } = this.props
    let currentTabIndex

    tabs.some((t, idx) => {
      if (t.tab.key === tabKey) {
        currentTabIndex = idx
        return true
      }
    })

    if (currentTabIndex != null) {
      for (let i = currentTabIndex + 1; i < tabs.length; i++) {
        this.props.closeTab(tabs[i].tab.key)
      }
    }
  }

  closeTabsToTheLeft (tabKey) {
    const { tabs } = this.props
    let currentTabIndex

    tabs.some((t, idx) => {
      if (t.tab.key === tabKey) {
        currentTabIndex = idx
        return true
      }
    })

    if (currentTabIndex != null) {
      for (let i = 0; i < currentTabIndex; i++) {
        this.props.closeTab(tabs[i].tab.key)
      }
    }
  }

  closeSavedTabs () {
    const { tabs } = this.props

    tabs.forEach((t) => {
      if (t.entity && t.entity.__isDirty === true) {
        return
      }

      this.props.closeTab(t.tab.key)
    })
  }

  closeAllTabs () {
    const { tabs } = this.props

    tabs.forEach((t) => {
      this.props.closeTab(t.tab.key)
    })
  }

  handleTabClick (e, t) {
    if (
      (e.nativeEvent &&
      e.nativeEvent.which === 2) ||
      (!e.nativeEvent && e.which === 2)
    ) {
      e.stopPropagation()
      return this.closeTab(t.tab.key)
    }

    this.props.activateTab(t.tab.key)
  }

  handleTabContextMenu (e, t) {
    e.preventDefault()
    this.setState({ contextMenuKey: t.tab.key })
  }

  renderContextMenu (t) {
    return (
      <div key='entity-contextmenu' className={style.contextMenuContainer}>
        <div className={style.contextMenu}>
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.closeTab(t.tab.key); this.tryHide() }}
          >
            Close Tab
          </div>
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.closeOtherTabs(t.tab.key); this.tryHide() }}
          >
            Close Other Tabs
          </div>
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.closeTabsToTheRight(t.tab.key); this.tryHide() }}
          >
            Close Tabs to the Right
          </div>
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.closeTabsToTheLeft(t.tab.key); this.tryHide() }}
          >
            Close Tabs to the Left
          </div>
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.closeSavedTabs(); this.tryHide() }}
          >
            Close Saved Tabs
          </div>
          <div
            className={style.contextButton}
            onClick={(e) => { e.stopPropagation(); this.closeAllTabs(); this.tryHide() }}
          >
            Close All Tabs
          </div>
        </div>
      </div>
    )
  }

  renderTitle (t) {
    const { activeTabKey, closeTab } = this.props
    const { contextMenuKey } = this.state

    return (
      <TabTitle
        ref={t.tab.key}
        key={t.tab.key}
        active={t.tab.key === activeTabKey}
        contextMenu={contextMenuKey != null && contextMenuKey === t.tab.key ? this.renderContextMenu(t) : undefined}
        tab={t}
        onClick={this.handleTabClick}
        onContextMenu={this.handleTabContextMenu}
        onClose={closeTab}
      />
    )
  }

  render () {
    return (
      <div className={style.tabTitles}>
        {this.props.tabs.map((t) => this.renderTitle(t))}
      </div>
    )
  }
}
