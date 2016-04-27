import React, {Component} from 'react'
import style from './Toolbar.scss'
import Studio from '../../Studio.js'
import logo from './js-logo.png'

export default class Toolbar extends Component {
  static propTypes = {
    openStartup: React.PropTypes.func.isRequired,
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
    this.handleShortcut = this.handleShortcut.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.tryHide)
    window.addEventListener('keydown', this.handleShortcut)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.tryHide)
    window.removeEventListener('keydown', this.handleShortcut)
  }

  handleShortcut (e) {
    if (e.ctrlKey && e.shiftKey && e.which === 83 && this.props.canSaveAll) {
      e.preventDefault()
      this.props.onSaveAll()
      return false
    }

    if (e.ctrlKey && e.which === 83 && this.props.canSave) {
      e.preventDefault()
      this.props.onSave()
      return false
    }

    if (e.which === 119 && this.props.canRun) {
      e.preventDefault()
      this.props.onRun()
      return false
    }
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
      onUpdate: this.props.onUpdate,
      canRun: this.props.canRun
    }))
  }

  render () {
    const { onRun, canRun, onSave, canSave, onSaveAll, canSaveAll, isPending, onRemove, canRemove, openStartup } = this.props

    return <div className={style.toolbar}>
      <div className={style.logo} onClick={() => openStartup()}><img src={logo} /></div>
      {this.renderButton(onRun, canRun, 'Run', 'fa fa-play', 'Preview report in the right pane (F8)')}
      {this.renderButton(onSave, canSave, 'Save', 'fa fa-floppy-o', 'Save current tab (CTRL+S)')}
      {this.renderButton(onSaveAll, canSaveAll, 'SaveAll', 'fa fa-floppy-o', 'Save all tabs (CTRL+SHIFT+S')}
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
