import React, {Component} from 'react'

export default class TemplateProperties extends Component {
  static propTypes = {
    entity: React.PropTypes.object,
    entities: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
  }

  renderEngines () {
    const { entity, onChange } = this.props

    return <select value={entity.engine} onChange={(v) => onChange({_id: entity._id, engine: v.target.value})}>
      {Studio.engines.map((e) => <option key={e} value={e}>{e}</option>)}
    </select>
  }

  renderRecipes () {
    const { entity, onChange } = this.props

    return <select value={entity.recipe} onChange={(v) => onChange({_id: entity._id, recipe: v.target.value})}>
      {Studio.recipes.map((e) => <option key={e} value={e}>{e}</option>)}
    </select>
  }

  render () {
    if (this.props.entity.__entityType !== 'templates') {
      return <div></div>
    }

    return (
      <div>
        <div>engine: {this.renderEngines()}</div>
        <div>recipe: {this.renderRecipes()}</div>
      </div>
    )
  }
}

