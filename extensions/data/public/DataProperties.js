import React, { Component } from 'react'

export default class Properties extends Component {
  selectDataItems (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entitySet === 'data').map((k) => entities[k])
  }

  render () {
    const { entity, entities, onChange } = this.props
    const dataItems = this.selectDataItems(entities)

    if (entity.__entitySet !== 'templates') {
      return <div></div>
    }

    return (
      <div className='form-group'>
        <label>data</label>
        <select
          value={entity.data ? entity.data.shortid : ''}
          onChange={(v) => onChange({_id: entity._id, data: v.target.value !== 'empty' ? { shortid: v.target.value } : null})}>
          <option key='empty' value='empty'>- not selected -</option>
          {dataItems.map((e) => <option key={e.shortid} value={e.shortid}>{e.name}</option>)}
        </select>
      </div>
    )
  }
}

