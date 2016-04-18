import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions, selectors} from '../../redux/entities'

@connect((state) => ({
  // redux tries to update once more after closing dialog, we need to just silently ignore this situation
  entity: state.modal.options ? selectors.getById(state, state.modal.options._id) : null
}), { ...actions })
export default class DeleteConfirmationModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired
  }

  remove () {
    console.log('here')
    this.props.close()
    this.props.remove(this.props.entity._id)
  }

  cancel () {
    this.props.close()
  }

  componentDidMount () {
    setTimeout(() => this.refs.cancel.focus(), 0)
  }

  render () {
    const { entity } = this.props
    if (!entity) {
      return <span/>
    }

    return <div>
      <div>Are you sure you want to delete {entity.name} ?</div>

      <div className='button-bar'>
        <button className='button danger' onClick={() => this.remove()}>Yes</button>
        <button className='button confirmation' ref='cancel' onClick={() => this.cancel()}>Cancel</button>
      </div>
    </div>
  }
}
