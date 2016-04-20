import React, { Component } from 'react'

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  render () {
    const { entity, onUpdate } = this.props

    return <div>
      <div>This is user {entity.username}</div>
      <div>
        <input
          type='text' value={entity.password || ''} onChange={(v) => onUpdate({_id: entity._id, password: v.target.value})}/>
      </div>
    </div>
  }
}

