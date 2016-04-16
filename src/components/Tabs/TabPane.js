import React, {Component} from 'react'
import TabContent from './TabContent'
import style from './Tabs.scss'

export default class TabPane extends Component {
  static propTypes = {
    activateTab: React.PropTypes.func.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    activeTabKey: React.PropTypes.string,
  }

  componentWillMount () {

  }

  componentWillReceiveProps (props) {
  }

  componentWillUnmount () {
  }

  render () {
    const { activeTabKey, activateTab, closeTab } = this.props

    return <div className={'block ' + style.tabPane} style={{minHeight: 0, height: 'auto'}}>
      <div className={'block-row' + ' ' + style.tabTitles}>
        {React.Children.map(this.props.children,
          (t) => <div className={style.tabContainer}>
            <div className={style.tabTitle + ' ' + (t.key === activeTabKey ? style.active : '')} key={t.key} onClick={() => activateTab(t.key)}>
              {t.props.title}
              <div className={style.tabClose} key={'x' + t.key} onClick={(e) => { e.stopPropagation(); closeTab(t.key) }}></div>
            </div>

          </div>
        )}
      </div>
      <div className={'block' + ' ' + style.tab} style={{minHeight: 0, height: 'auto'}}>
        {React.Children.map(this.props.children, (t) => <TabContent
          key={t.key} active={t.key === activeTabKey}>{t.props.children}</TabContent>)}
      </div>
    </div>
  }
}