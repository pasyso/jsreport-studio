import React, {Component} from 'react'
import Tab from './Tab'
import TabContent from './TabContent'

class TabPane extends Component {
  static propTypes = {
    activateTab: React.PropTypes.func.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    activeTabKey: React.PropTypes.string.isRequired
  }

  componentWillMount () {

  }

  componentWillReceiveProps (props) {
  }

  componentWillUnmount () {
  }

  render () {
    const { activeTabKey, activateTab, closeTab } = this.props

    return <div className='block'>
      <div className='block-row'>
        {React.Children.map(this.props.children, (t) =>
          <div>
            <button
              key={t.key} onClick={() => activateTab(t.key)}>{t.props.title + ' ' + (t.key === activeTabKey ? 'active' : '')}
            </button>
            <button key={'x' + t.key} onClick={() => closeTab(t.key)}>x</button>
          </div>
        )}
      </div>
      <div className='block'>
        {React.Children.map(this.props.children, (t) => <TabContent
          key={t.key} active={t.key === activeTabKey}>{t.props.children}</TabContent>)}
      </div>
    </div>
  }
}

export default { TabPane, Tab }
