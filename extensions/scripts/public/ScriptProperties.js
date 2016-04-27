import React, { Component } from 'react'

export default class ScriptProperties extends Component {
  selectScripts (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entitySet === 'scripts').map((k) => entities[k])
  }

  static getSelectedScripts (entity, entities) {
    return (entity.scripts || []).map((s) => ({
      ...s,
      name: Object.keys(entities).map((k) => entities[k]).filter((sc) => sc.shortid === s.shortid)[0].name
    }))
  }

  renderOrder () {
    const scripts = ScriptProperties.getSelectedScripts(this.props.entity, this.props.entities)

    return <span>{scripts.map((s) => <span key={s.shortid}>{s.name + ' '}</span>)}</span>
  }

  static title (entity, entities) {
    if (!entity.scripts || !entity.scripts.length) {
      return 'scripts'
    }

    return ScriptProperties.getSelectedScripts(entity, entities).map((s) => s.name).join(', ')
  }

  render () {
    const { entity, entities, onChange } = this.props
    const scripts = this.selectScripts(entities)

    const selectValues = (event, ascripts) => {
      const el = event.target
      let scripts = Object.assign([], ascripts)

      for (var i = 0; i < el.options.length; i++) {
        if (el.options[i].selected) {
          if (!scripts.filter((s) => s.shortid === el.options[i].value).length) {
            scripts.push({ shortid: el.options[i].value })
          }
        } else {
          if (scripts.filter((s) => s.shortid === el.options[i].value).length) {
            scripts = scripts.filter((s) => s.shortid !== el.options[i].value)
          }
        }
      }

      return scripts
    }

    return (
      <div className='properties-section'>
        <div className='form-group'>
          <select
            multiple size='7' value={entity.scripts ? entity.scripts.map((s) => s.shortid) : []}
            onChange={(v) => onChange({_id: entity._id, scripts: selectValues(v, entity.scripts)})}>
            {scripts.map((s) => <option key={s.shortid} value={s.shortid}>{s.name}</option>)}
          </select>
          {(entity.scripts && entity.scripts.length) ? <div><span>Run order:</span>{this.renderOrder()}</div> : <div/>}
        </div>
      </div>
    )
  }
}

