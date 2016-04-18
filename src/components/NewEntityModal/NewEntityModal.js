import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {actions} from '../../redux/editor'
import Studio from '../../Studio.js'

@connect((state) => ({
  isOpen: state.modal.isOpen,
  text: state.modal.text,
  componentKey: state.modal.componentKey
}), { ...actions })

export default class Modal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.close()
      this.props.openNewTab({ entitySet: this.props.options.entitySet, name: e.target.value })
    }
  }

  // the modal component for some reason after open focuses the panel itself
  componentDidMount () {
    setTimeout(() => this.refs.nameInput.focus(), 0)
  }

  render () {
    const { entitySet } = this.props.options

    return <div>
      <div>New {Studio.entitySets[entitySet].visibleName}</div>
      <div className='form-group'>
        <input type='text' placeholder='name...' ref='nameInput' onKeyPress={(e) => this.handleKeyPress(e)}/>
      </div>
    </div>
  }
}
