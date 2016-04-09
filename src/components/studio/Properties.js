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
      <div>engine: <input type='text' value={entity.engine} onChange={(v) => onChange({_id: entity._id, engine: v.target.value})}/></div>
      <div>recipe: <input type='text' value={entity.recipe} onChange={(v) => onChange({_id: entity._id, recipe: v.target.value})}/></div>
      <div> {studio.properties.map((p, i) => React.createElement(p, { key: i, entity: entity, entities: entities, onChange: onChange }))}</div>
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
