import React, {Component} from 'react'

export default class Properties extends Component {
  static propTypes = {
    entity: React.PropTypes.object,
    entities: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  }

  renderProperties () {
    const { entity, onChange, entities } = this.props

    return <div>
      <div>name: <input
        type='text' value={entity.name} onChange={(v) => onChange({_id: entity._id, name: v.target.value})}/></div>
      <div> {studio.properties.map((p, i) => React.createElement(p, {
        key: i,
        entity: entity,
        entities: entities,
        onChange: onChange
      }))}</div>
    </div>
  }

  render () {
    const { entity } = this.props

    return <div className='block-item'>
      Properties
      {entity ? this.renderProperties(entity) : ''}
    </div>
  }
}
