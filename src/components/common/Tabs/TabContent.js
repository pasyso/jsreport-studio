import React, {Component} from 'react'

export default class TabContent extends Component {
  constructor () {
    super()
    this.state = {}
  }

  static propTypes = {}

  static defaultProps = {}

  componentDidMount () {
  }

  componentWillReceiveProps (props) {
  }

  componentWillUnmount () {
  }

  render () {
    const { active } = this.props
    return <div className='block' style={{display: active ? 'flex' : 'none'}}>{this.props.children}</div>
  }
}
