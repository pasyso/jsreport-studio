import React, {Component} from 'react'
import style from './Properties.scss'
import { entitySets, propertiesComponents } from '../../lib/configuration.js'
import intl from 'react-intl-universal'

function removePrefix(name) {
  let p = name.indexOf('!');
  return p > -1 ? [name.substring(0, p), name.substring(p+1)] : [null, name];
}

export default class Properties extends Component {
  static propTypes = {
    entity: React.PropTypes.object,
    entities: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {}
  }

  toggle (key) {
    this.setState({ [key]: !this.state[key] })
  }

  renderTitle (title, entity, entities) {
    if (typeof title === 'string') {
      return <span>{intl.get('property.'+title).d(title)}</span>
    }

    return title(entity, entities)
  }

  renderOne (def, key, entity, entities, onChange) {
    return !def.shouldDisplay(entity) ? <div key={key} /> : <div key={key} className={style.propertyBox}>
      <div
        className={style.propertyTitle + ' ' + (this.state[key] ? style.expanded : '')}
        onClick={() => this.toggle(key)}>{this.renderTitle(def.title, entity, entities)}</div>
      <div className={style.propertyContentBox + ' ' + (this.state[key] ? style.expanded : '')}>
        {React.createElement(def.component, {
          key: key,
          entity: entity,
          entities: entities,
          onChange: onChange
        })}
      </div>
    </div>
  }

  renderProperties () {
    const { entity, onChange, entities } = this.props

    const nameAttribute = entitySets[entity.__entitySet].nameAttribute

    const [prefix, name] = entity[nameAttribute] ? removePrefix(entity[nameAttribute]) : [null, '']

    return <div className={style.propertiesNodes}>
      <div>
        <div className='form-group'>
          <label>{intl.get('entityAttr.'+nameAttribute).d(nameAttribute)}</label>
          <input
            type='text' value={name}
            onChange={(v) => onChange({_id: entity._id, [nameAttribute]: prefix ? `${prefix}!${v.target.value}` : v.target.value})} />
        </div>
      </div>
      {propertiesComponents.map((p, i) => this.renderOne(p, i, entity, entities, onChange))}
    </div>
  }

  render () {
    const { entity } = this.props

    return <div className={style.propertiesPanel}>
      <div className={style.title}>{intl.get('properties.title').d('Properties')}</div>
      <div className={style.propertiesContainer}>
        {entity ? this.renderProperties(entity) : ''}
      </div>
    </div>
  }
}
