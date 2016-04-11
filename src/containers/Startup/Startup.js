import React, {Component} from 'react'
import {connect} from 'react-redux'
import { actions } from 'redux/editor'

import ApiClient from '../../helpers/ApiClient.js'
let client = new ApiClient()

@connect(null, { ...actions })
export default class Startup extends Component {
  constructor () {
    super()
    this.state = { templates: [] }
  }

  async componentWillMount () {
    const response = await client.get('/odata/templates')
    this.setState({ templates: response.value })
  }

  render () {
    const { templates } = this.state
    const { openTab } = this.props

    return <div className='block'>
      Last edited templates:
      <div>
        {templates.map((t) => <a style={{cursor: 'pointer'}} onClick={() => openTab({_id: t._id})} key={t._id}>{t.name}</a>)}
      </div>
    </div>
  }
}
