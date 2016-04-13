import React, {Component} from 'react'
import Tab from './Tab'
import TabPane from './TabPane.js'
import Studio from 'Studio.js'

export default class EditorTabs extends Component {
  static propTypes = {
    activateTab: React.PropTypes.func.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    activeTabKey: React.PropTypes.string,
    tabs: React.PropTypes.array.isRequired
  }

  resize () {
    if (this.props.activeTabKey && this.refs[ this.props.activeTabKey ] && this.refs[ this.props.activeTabKey ].resize) {
      this.refs[ this.props.activeTabKey ].resize()
    }
  }

  createTitle (t) {
    return <span>
      {t.tab.titleComponentKey ? React.createElement(Studio.tabTitleComponents[ t.tab.titleComponentKey ], {
        entity: t.entity,
        tab: t.tab
      }) : (<span>{t.tab.title || (t.entity.name + (t.entity.__isDirty ? '*' : ''))}</span>)}
    </span>
  }

  renderEntityTab (t, onUpdate) {
    return <Tab key={t.tab.key} title={this.createTitle(t)}>
      {React.createElement(Studio.tabEditorComponents[ t.tab.editorComponentKey || t.entity.__entityType ], {
        entity: t.entity,
        tab: t.tab,
        ref: t.tab.key,
        onUpdate: (o) => onUpdate(o)
      })}
    </Tab>
  }

  render () {
    const { activeTabKey, activateTab, closeTab, onUpdate, tabs } = this.props

    return <TabPane
      activeTabKey={activeTabKey} activateTab={activateTab} closeTab={closeTab}>{tabs.map((t) =>
        this.renderEntityTab(t, onUpdate)
    )}
    </TabPane>
  }
}