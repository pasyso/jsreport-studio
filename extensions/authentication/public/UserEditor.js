import React, { Component } from 'react'

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  //renderInitialPassword () {
  //  const { entity, onUpdate } = this.props
  //
  //  return <div>
  //    <input
  //      type='password' value={entity.password || ''}
  //      onChange={(v) => onUpdate({_id: entity._id, password: v.target.value})}/>
  //  </div>
  //}

  componentDidMount () {
    if (this.props.entity.__isNew && !this.props.entity.password) {
      Studio.openModal('CHANGE_PASSWORD_MODAL', { entity: this.props.entity })
    }
  }

  render () {
    const { entity } = this.props

    return <div>
      <div><h1>{entity.username}</h1></div>
    </div>
  }
}

