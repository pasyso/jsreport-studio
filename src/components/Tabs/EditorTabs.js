import React, {Component} from 'react'
import Tab from './Tab'
import TabPane from './TabPane.js'

export default class EditorTabs extends Component {
  static propTypes = {
    activateTab: React.PropTypes.func.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    activeTabKey: React.PropTypes.string,
    tabs: React.PropTypes.array.isRequired
  }

  componentWillMount () {

  }

  componentWillReceiveProps (props) {
  }

  componentWillUnmount () {
  }

  resize () {
    if (this.props.activeTabKey && this.refs[ this.props.activeTabKey ] && this.refs[ this.props.activeTabKey ].resize) {
      this.refs[ this.props.activeTabKey ].resize()
    }
  }

  renderEntityTab (t, onUpdate) {
    return <Tab key={t.tab.key} title={t.tab.title || (t.entity.name + (t.entity.__isDirty ? '*' : ''))}>
      {React.createElement(studio.detailComponents[ t.tab.detailComponentKey || t.entity.__entityType ], {
        entity: t.entity,
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