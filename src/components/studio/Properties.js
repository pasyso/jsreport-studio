import React, {Component} from 'react'

export default class Properties extends Component {
  static propTypes = {
    object: React.PropTypes.object
  }

  render () {
    return <div className='block-item'>
      Properties
      <div>
        {studio.properties.map((p, i) => React.createElement(p, {key: i, object: this.props.object}))}
      </div>
    </div>
  }
}
