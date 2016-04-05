import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {list as listAction} from 'redux/modules/templates'
import {Button} from 'react-bootstrap'

@connect(
  (state) => ({
    list: state.studio.list,
    error: state.studio.error,
    loading: state.studio.loading,
    loaded: state.studio.loaded
  }), { listAction })
export default class Templates extends Component {
  static propTypes = {
    list: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    listAction: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.listAction()
  }

  handleClick () {
  }

  render () {
    const {list, loaded} = this.props

    return (
      <div>
        <Button bsStyle='success' onClick={() => this.handleClick()}>Run-aha</Button>
        {loaded ? list.map((l) => <span key={l._id}>{l.name}</span>) : ''}
      </div>
    )
  }
}

