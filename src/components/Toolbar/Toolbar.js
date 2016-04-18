import React, {Component} from 'react'
import style from './Toolbar.scss'

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
    isPending: React.PropTypes.bool.isRequired
  }

  renderButton (onClick, enabled, text, imageClass) {
    return <div
      className={style.btn + ' ' + imageClass + ' ' + (enabled ? '' : style.disabled)}
      onClick={enabled ? onClick : () => {}}>{text}</div>
  }

  render () {
    const { onRun, canRun, onSave, canSave, onSaveAll, canSaveAll, isPending, onRemove, canRemove } = this.props

    return <div className={style.toolbar}>
      {this.renderButton(onRun, canRun, 'Run', style.run)}
      {this.renderButton(onSave, canSave, 'Save', style.save)}
      {this.renderButton(onSaveAll, canSaveAll, 'SaveAll', style.saveAll)}
      {this.renderButton(onRemove, canRemove, 'Delete', style.delete)}
      <div className={style.spinner}>
        {isPending ? <i className='fa fa-spinner fa-spin fa-fw'></i> : ''}
      </div>
    </div>
  }
}
