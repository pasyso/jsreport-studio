import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectors} from '../../redux/entities'
import {actions} from '../../redux/editor'
import intl from 'react-intl-universal'

@connect((state, props) => ({ entity: selectors.getById(state, props.options._id, false) }), { ...actions })
export default class CloseConfirmationModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
  }

  remove () {
    this.props.close()
    this.props.closeTab(this.props.entity._id)
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
      return <div/>
    }

    return <div>
      <div>{intl.get('closeModal.title', {name : entity.name}).d('Are you sure you want to close ' + entity.name + ' and lose the changes ?')}</div>

      <div className='button-bar'>
        <button className='button danger' onClick={() => this.remove()}>{intl.get('yes').d('Yes')}</button>
        <button className='button confirmation' ref='cancel' onClick={() => this.cancel()}>{intl.get('cancel').d('Cancel')}</button>
      </div>
    </div>
  }
}
