import React, {Component} from 'react'
import style from './Toolbar.scss'
import Studio from '../../Studio.js'

export default class Toolbar extends Component {
  static propTypes = {
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

  renderButton (onClick, enabled, text, imageClass) {
    return <div className={'toolbar-button ' + ' ' + (enabled ? '' : 'disabled')} onClick={enabled ? onClick : () => {}}>
      <i className={imageClass} /><span>{text}</span></div>
  }

  renderToolbarComponents () {
    return <div>{Studio.toolbarComponents.map((p, i) => React.createElement(p, {
      key: i,
      tab: this.props.activeTab
    }))}</div>
  }

  render () {
    const { onRun, canRun, onSave, canSave, onSaveAll, canSaveAll, isPending, onRemove, canRemove } = this.props

    return <div className={style.toolbar}>
      {this.renderButton(onRun, canRun, 'Run', 'fa fa-play')}
      {this.renderButton(onSave, canSave, 'Save', 'fa fa-floppy-o')}
      {this.renderButton(onSaveAll, canSaveAll, 'SaveAll', 'fa fa-floppy-o')}
      {this.renderButton(onRemove, canRemove, 'Delete', 'fa fa-trash')}
      {this.renderToolbarComponents()}
      <div className={style.spinner}>
        {isPending ? <i className='fa fa-spinner fa-spin fa-fw'></i> : ''}
      </div>
    </div>
  }
}
