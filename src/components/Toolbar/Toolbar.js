import React, {Component} from 'react'
import style from './Toolbar.scss'

export default class Toolbar extends Component {
  static propTypes = {
    onRun: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onSaveAll: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  }

  render () {
    const { onRun, onSave, onSaveAll, onRemove } = this.props

    return <div className={style.toolbar}>
      <div className={style.run + ' ' + style.btn} onClick={onRun}>Run</div>
      <div className={style.save + ' ' + style.btn} onClick={onSave}>Save</div>
      <div className={style.saveAll + ' ' + style.btn} onClick={onSaveAll}>Save All</div>
      <div className={style.delete + ' ' + style.btn} onClick={onRemove}>Delete</div>
    </div>
  }
}
