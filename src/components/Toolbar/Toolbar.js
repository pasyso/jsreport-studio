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

  renderButton (onClick, enabled, text, imageClass, tooltip) {
    return <div title={tooltip} className={'toolbar-button ' + ' ' + (enabled ? '' : 'disabled')} onClick={enabled ? onClick : () => {}}>
      <i className={imageClass} /><span>{text}</span></div>
  }

  renderToolbarComponents () {
    return <div>{Studio.toolbarComponents.map((p, i) => React.createElement(p, {
      key: i,
      tab: this.props.activeTab,
      onUpdate: this.props.onUpdate
    }))}</div>
  }

  render () {
    const { onRun, canRun, onSave, canSave, onSaveAll, canSaveAll, isPending, onRemove, canRemove } = this.props

    return <div className={style.toolbar}>
      <div style={{backgroundImage: 'url(' + logo + ')'}} className={style.logo} />
      {this.renderButton(onRun, canRun, 'Run', 'fa fa-play', 'Preview report in the right pane (F8)')}
      {this.renderButton(onSave, canSave, 'Save', 'fa fa-floppy-o', 'Save current tab (CTRL+S)')}
      {this.renderButton(onSaveAll, canSaveAll, 'SaveAll', 'fa fa-floppy-o', 'Save all tabs')}
      {this.renderButton(onRemove, canRemove, 'Delete', 'fa fa-trash')}
      {this.renderToolbarComponents()}
      <div className={style.spinner}>
        {isPending ? <i className='fa fa-spinner fa-spin fa-fw'></i> : ''}
      </div>
    </div>
  }
}
