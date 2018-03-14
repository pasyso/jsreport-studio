import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions} from '../../redux/editor'
import api from '../../helpers/api.js'
import { entitySets } from '../../lib/configuration.js'

@connect((state) => ({}), { ...actions })
export default class Modal extends Component {
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

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.submit(e.target.value)
    }
  }

  async submit (val) {
    const name = val || this.refs.nameInput.value

    try {
      await api.post('/studio/validate-entity-name', { data: { name } })
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

    this.props.openNewTab({
      entity: this.props.options.entity,
      entitySet: this.props.options.entitySet,
      name
    })
  }

  // the modal component for some reason after open focuses the panel itself
  componentDidMount () {
    setTimeout(() => this.refs.nameInput.focus(), 0)
  }

  render () {
    const { error } = this.state
    const { entitySet, initialName } = this.props.options

    return <div>
      <div className='form-group'>
        <label>New {entitySets[entitySet].visibleName}</label>
        <input
          type='text'
          placeholder='name...'
          ref='nameInput'
          defaultValue={initialName}
          onKeyPress={(e) => this.handleKeyPress(e)}
        />
      </div>
      <div className='form-group'>
        <span style={{color: 'red', display: error ? 'block' : 'none'}}>{error}</span>
      </div>
      <div className='button-bar'>
        <button className='button confirmation' onClick={() => this.submit()}>ok</button>
      </div>
    </div>
  }
}
