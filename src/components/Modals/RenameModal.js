import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions, selectors} from '../../redux/entities'
import api from '../../helpers/api.js'
import { entitySets } from '../../lib/configuration.js'
import intl from 'react-intl-universal'

function removePrefix(name) {
  let p = name.indexOf('!');
  return p > -1 ? [name.substring(0, p), name.substring(p+1)] : [null, name];
}

@connect((state, props) => ({ entity: selectors.getById(state, props.options._id) }), { ...actions })
export default class RenameModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      error: null
    }
  }

  async rename () {
    if (!this.refs.name.value) {
      return
    }

    const newName = this.refs.prefix.value ? `${this.refs.prefix.value}!${this.refs.name.value}` : this.refs.name.value
    const nameAttribute = entitySets[this.props.entity.__entitySet].nameAttribute

    try {
      await api.post('/studio/validate-entity-name', { data: { name: newName } })
    } catch (e) {
      this.setState({
        error: e.message
      })

      return
    }

    this.setState({
      error: null
    })

    this.props.close()

    this.props.update({
      _id: this.props.entity._id,
      [nameAttribute]: newName
    })
    this.props.save(this.props.entity._id)
  }

  componentDidMount () {
    setTimeout(() => this.refs.name.focus(), 0)
  }

  render () {
    const { error } = this.state
    const { entity } = this.props
    const nameAttribute = entitySets[entity.__entitySet].nameAttribute

    const {prefix, name} = removePrefix(entity[nameAttribute])

    return <div>
      <div className='form-group'>
        <label>{intl.get('renameModal.title').d('rename entity')}</label>
        <input ref='name' type='text' defaultValue={name} />
        <input ref='prefix' type='hidden' defaultValue={prefix} />
      </div>
      <div className='form-group'>
        <span style={{color: 'red', display: error ? 'block' : 'none'}}>{error}</span>
      </div>
      <div className='button-bar'>
        <button className='button confirmation' onClick={() => this.rename()}>{intl.get('ok').d('Ok')}</button>
        <button className='button confirmation' ref='cancel' onClick={() => this.props.close()}>{intl.get('cancel').d('Cancel')}</button>
      </div>
    </div>
  }
}
