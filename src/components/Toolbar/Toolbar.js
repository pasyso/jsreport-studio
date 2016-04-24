import React, {Component} from 'react'
import style from './Toolbar.scss'
import Studio from '../../Studio.js'
import logo from './js-logo.png'

export default class Toolbar extends Component {
  static propTypes = {
    onUpdate: React.PropTypes.func.isRequired,
    onRun: React.PropTypes.func.isRequired,
    canRun: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    canSave: React.PropTypes.bool.isRequired,
    onSaveAll: React.PropTypes.func.isRequired,
    canSaveAll: React.PropTypes.bool.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    canRemove: React.PropTypes.bool.isRequired,
    isPending: React.PropTypes.bool.isRequired,
    activeTab: React.PropTypes.object
  }

  constructor () {
    super()
    this.state = {}
    this.tryHide = this.tryHide.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.tryHide)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.tryHide)
  }

  tryHide () {
    if (this.state.expanded) {
      this.setState({ expanded: false })
    }
  }

  renderButton (onClick, enabled, text, imageClass, tooltip) {
    return <div
      title={tooltip} className={'toolbar-button ' + ' ' + (enabled ? '' : 'disabled')}
      onClick={enabled ? onClick : () => {}}>
      <i className={imageClass}/><span>{text}</span></div>
  }

  renderToolbarComponents (position) {
    return Studio.toolbarComponents[position].map((p, i) => React.createElement(p, {
      key: i,
      tab: this.props.activeTab,
      onUpdate: this.props.onUpdate
    }))
  }

  render () {
    const { onRun, canRun, onSave, canSave, onSaveAll, canSaveAll, isPending, onRemove, canRemove } = this.props

    return <div className={style.toolbar}>
      {this.renderButton(onRun, canRun, 'Run', 'fa fa-play', 'Preview report in the right pane (F8)')}
      {this.renderButton(onSave, canSave, 'Save', 'fa fa-floppy-o', 'Save current tab (CTRL+S)')}
      {this.renderButton(onSaveAll, canSaveAll, 'SaveAll', 'fa fa-floppy-o', 'Save all tabs')}
      {this.renderButton(onRemove, canRemove, 'Delete', 'fa fa-trash')}
      {this.renderToolbarComponents('left')}
      <div className={style.spinner}>
        {isPending ? <i className='fa fa-spinner fa-spin fa-fw'></i> : ''}
      </div>
      {this.renderToolbarComponents('right')}
      <div
        className='toolbar-button'
        onClick={(e) => { e.stopPropagation(); this.setState({ expanded: !this.state.expanded }) }}>
        <i className='fa fa-cog'/>

        <div className={style.popup} style={{display: this.state.expanded ? 'block' : 'none'}}>
          {this.renderToolbarComponents('settings')}
        </div>
      </div>
    </div>
  }
}
