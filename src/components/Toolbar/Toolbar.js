import React, {Component} from 'react'
import EntityFuzzyFinderModal from '../Modals/EntityFuzzyFinderModal.js'
import { modalHandler, toolbarComponents, toolbarVisibilityResolver } from '../../lib/configuration.js'
import style from './Toolbar.scss'
import logo from './logo_holon_powervhc21.png'

import intl from 'react-intl-universal'

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
    onReformat: React.PropTypes.func.isRequired,
    canReformat: React.PropTypes.bool.isRequired,
    isPending: React.PropTypes.bool.isRequired,
    activeTab: React.PropTypes.object
  }

  constructor () {
    super()
    this.state = {}
    this.tryHide = this.tryHide.bind(this)
    this.handleShortcut = this.handleShortcut.bind(this)
    this.handleEarlyShortcut = this.handleEarlyShortcut.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.tryHide)
    window.addEventListener('keydown', this.handleShortcut)
    window.addEventListener('keydown', this.handleEarlyShortcut, true)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.tryHide)
    window.removeEventListener('keydown', this.handleShortcut)
    window.addEventListener('keydown', this.handleEarlyShortcut, true)
  }

  // this place captures key events very early (capture phase) so it can work
  // across other contexts that are using keybindings too (like the Ace editor)
  handleEarlyShortcut (e) {
    // ctrl + p -> activates Entity fuzzy finder modal
    if (e.ctrlKey && e.which === 80) {
      if (!modalHandler.isModalOpen()) {
        e.preventDefault()
        e.stopPropagation()

        modalHandler.open(EntityFuzzyFinderModal, {})
        return false
      }
    }
  }

  handleShortcut (e) {
    if (e.ctrlKey && e.shiftKey && e.which === 83) {
      e.preventDefault()

      if (this.props.canSaveAll && toolbarVisibilityResolver('SaveAll')) {
        this.props.onSaveAll()
        return false
      }
    }

    if (e.ctrlKey && e.shiftKey && e.which === 70 && this.props.canReformat && toolbarVisibilityResolver('Reformat')) {
      e.preventDefault()
      this.props.onReformat()
      return false
    }

    if (e.ctrlKey && e.which === 83) {
      e.preventDefault()

      if (this.props.canSave && toolbarVisibilityResolver('SaveAll')) {
        this.props.onSave()
        return false
      }
    }

    if (e.which === 119 && this.props.canRun) {
      e.preventDefault()
      this.props.onRun()
      return false
    }
  }

  tryHide () {
    if (this.state.expandedSettings) {
      this.setState({ expandedSettings: false })
    }

    if (this.state.expandedRun) {
      this.setState({ expandedRun: false })
    }
  }

  renderButton (onClick, enabled, text, imageClass, tooltip) {
    if (toolbarVisibilityResolver(text) === false) {
      return false
    }

    return <div
      title={tooltip} className={'toolbar-button ' + ' ' + (enabled ? '' : 'disabled')}
      onClick={enabled ? onClick : () => {}}>
      <i className={imageClass} /><span>{text}</span></div>
  }

  renderRun () {
    const { onRun, canRun } = this.props

    return <div
      title={intl.get('toolbar.RunTooltip').d('Preview report in the right pane') + ' (F8)'} className={'toolbar-button ' + (canRun ? '' : 'disabled')}
      onClick={canRun ? () => onRun() : () => {}}>
      <i className='fa fa-play' /> {intl.get('toolbar.Run').d('Run')} <span className={style.runCaret} onClick={(e) => { e.stopPropagation(); this.setState({ expandedRun: !this.state.expandedRun }) }} />
      <div className={style.runPopup} style={{display: this.state.expandedRun ? 'block' : 'none'}}>
        {this.renderButton((e) => { e.stopPropagation(); this.tryHide(); onRun('_blank', true) }, canRun, intl.get('toolbar.RunNewTab').d('Run to new tab'), 'fa fa-tablet', intl.get('toolbar.RunNewTabTooltip').d('Preview in new tab'))}
        {this.renderButton((e) => { e.stopPropagation(); this.tryHide(); onRun('_self', true) }, canRun, intl.get('toolbar.Download').d('Download'), 'fa fa-download', intl.get('toolbar.DownloadTooltip').d('Download output'))}
      </div>
    </div>
  }

  renderToolbarComponents (position) {
    return toolbarComponents[position].map((p, i) => React.createElement(p, {
      key: i,
      tab: this.props.activeTab,
      onUpdate: this.props.onUpdate,
      canRun: this.props.canRun,
      canSaveAll: this.props.canSaveAll
    }))
  }

  renderSettings () {
    if (toolbarVisibilityResolver('settings') === false) {
      return false
    }

    return <div
      className='toolbar-button'
      onClick={(e) => { e.stopPropagation(); this.setState({ expandedSettings: !this.state.expandedSettings }) }}>
      <i className='fa fa-cog' />

      <div className={style.popup} style={{display: this.state.expandedSettings ? 'block' : 'none'}}>
        {this.renderToolbarComponents('settings')}
        {toolbarComponents.settingsBottom.length ? <hr /> : ''}
        {this.renderToolbarComponents('settingsBottom')}
      </div>
    </div>
  }

  render () {
    const { onSave, canSave, onSaveAll, canSaveAll, isPending, openStartup, onReformat, canReformat } = this.props

    return <div className={style.toolbar}>
      <div className={style.logo} onClick={() => openStartup()}><img src={logo} /></div>
      {this.renderRun()}
      {this.renderButton(onSave, canSave, intl.get('toolbar.Save').d('Save'), 'fa fa-floppy-o', intl.get('toolbar.SaveTooltip').d('Save current tab')+' (CTRL+S)')}
      {this.renderButton(onSaveAll, canSaveAll, intl.get('toolbar.SaveAll').d('SaveAll'), 'fa fa-floppy-o', intl.get('toolbar.SaveAllTooltip').d('Save all tabs')+' (CTRL+SHIFT+S')}
      {this.renderButton(onReformat, canReformat, intl.get('toolbar.Reformat').d('Reformat'), 'fa fa-indent', intl.get('toolbar.ReformatTooltip').d('Reformat code')+' (CTRL+SHIFT+F)')}
      {this.renderToolbarComponents('left')}
      <div className={style.spinner}>
        {isPending ? <i className='fa fa-spinner fa-spin fa-fw'></i> : ''}
      </div>
      {this.renderToolbarComponents('right')}
      {this.renderSettings()}
    </div>
  }
}
