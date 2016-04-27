import React, { Component } from 'react'
import Studio from 'jsreport-studio'

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.entity.__isNew && !this.props.entity.password) {
      Studio.openModal('CHANGE_PASSWORD_MODAL', { entity: this.props.entity })
    }
  }

  render () {
    const { entity } = this.props

    return <div className='custom-editor'>
      <h1><i className='fa fa-user'/> {entity.username}</h1>
    </div>
  }
}

