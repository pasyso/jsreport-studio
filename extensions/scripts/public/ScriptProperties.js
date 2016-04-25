import React, { Component } from 'react'

export default class ScriptProperties extends Component {
  selectScripts (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entitySet === 'scripts').map((k) => entities[k])
  }

  renderOrder () {
    const scripts = (this.props.entity.scripts || []).map((s) => ({
      ...s,
      name: Object.keys(this.props.entities).map((k) => this.props.entities[k]).filter((sc) => sc.shortid === s.shortid)[0].name
    }))

    return <ol>{scripts.map((s) => <li key={s.shortid}>{s.name}</li>)}</ol>
  }

  render () {
    const { entity, entities, onChange } = this.props
    const scripts = this.selectScripts(entities)

    if (entity.__entitySet !== 'templates') {
      return <div></div>
    }

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
          <label>scripts</label>

          <div>Order:{this.renderOrder()}</div>
          <select
            multiple value={entity.scripts ? entity.scripts.map((s) => s.shortid) : []}
            onChange={(v) => onChange({_id: entity._id, scripts: selectValues(v, entity.scripts)})}>
            {scripts.map((s) => <option key={s.shortid} value={s.shortid}>{s.name}</option>)}
          </select>
        </div>
      </div>
    )
  }
}

