import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions, selectors} from '../../redux/entities'
import intl from 'react-intl-universal'

@connect((state, props) => ({
  entity: selectors.getById(state, props.options._id, false),
  childrenIds: props.options.childrenIds
}), { ...actions })
export default class DeleteConfirmationModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
  }

  remove () {
    this.props.close()
    this.props.remove(this.props.entity._id, this.props.childrenIds)
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
      return null
    }

    return <div>
      <div>{intl.get('deleteModal.title', {name : entity.name}).d('Are you sure you want to delete ' + entity.name + ' ?')}</div>

      <div className='button-bar'>
        <button className='button danger' onClick={() => this.remove()}>{intl.get('yes').d('Yes')}</button>
        <button className='button confirmation' ref='cancel' onClick={() => this.cancel()}>{intl.get('cancel').d('Cancel')}</button>
      </div>
    </div>
  }
}
