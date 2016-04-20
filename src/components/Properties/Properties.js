import React, {Component} from 'react'
import style from './Properties.scss'
import Studio from 'Studio.js'

export default class Properties extends Component {
  static propTypes = {
    entity: React.PropTypes.object,
    entities: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  }

  renderProperties () {
    const { entity, onChange, entities } = this.props

    const nameAttribute = Studio.entitySets[entity.__entitySet].nameAttribute

    return <div className={style.propertiesNodes}>
      <div className='properties-section'>
        <div className='form-group'>
          <label>{nameAttribute}</label>
          <input
            type='text' value={entity[nameAttribute] || ''} onChange={(v) => onChange({_id: entity._id, [nameAttribute]: v.target.value})}/>
        </div>
      </div>
      {Studio.properties.map((p, i) => React.createElement(p, {
        key: i,
        entity: entity,
        entities: entities,
        onChange: onChange
      }))}
    </div>
  }

  render () {
    const { entity } = this.props

    return <div className={style.propertiesPanel}>
      <div className={style.title}>Properties</div>
      <div className={style.propertiesContainer}>
        {entity ? this.renderProperties(entity) : ''}
      </div>
    </div>
  }
}
