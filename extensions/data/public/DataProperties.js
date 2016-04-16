const React = Studio.react
const { Component } = Studio.react

export default class Properties extends Component {
  selectDataItems (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entityType === 'data').map((k) => entities[k])
  }

  render () {
    const { entity, entities, onChange } = this.props
    const dataItems = this.selectDataItems(entities)

    if (entity.__entityType !== 'templates') {
      return <div></div>
    }

    return (
      <div className='form-group'>
        <label>data</label>
        <select
          value={entity.data ? entity.data.shortid : ''}
          onChange={(v) => onChange({_id: entity._id, data: { shortid: v.target.value }})}>
          <option key='empty' value='empty'>- not selected -</option>
          {dataItems.map((e) => <option key={e.shortid} value={e.shortid}>{e.name}</option>)}
        </select>
      </div>
    )
  }
}

