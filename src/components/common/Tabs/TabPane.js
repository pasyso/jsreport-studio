import React, {Component} from 'react'
import Tab from './Tab'
import TabContent from './TabContent'
import style from './Tabs.scss'

class TabPane extends Component {
  static propTypes = {
    activateTab: React.PropTypes.func.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    activeTabKey: React.PropTypes.string
  }

  componentWillMount () {

  }

  componentWillReceiveProps (props) {
  }

  componentWillUnmount () {
  }

  render () {
    const { activeTabKey, activateTab, closeTab } = this.props

    return <div className={'block ' + style.tabPane}>
      <div className='block-row'>
        {React.Children.map(this.props.children,
          (t) => <div className={style.tabContainer}>
            <div className={style.tabTitle + ' ' + (t.key === activeTabKey ? style.active : '')} key={t.key} onClick={() => activateTab(t.key)}>
              {t.props.title}
              <div className={style.tabClose} key={'x' + t.key} onClick={() => closeTab(t.key)}></div>
            </div>

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
