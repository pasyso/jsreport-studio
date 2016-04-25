import style from './ImageEditor.scss'
import React, { Component } from 'react'

export default class ImageEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired
  }

  render () {
    const { entity } = this.props

    return (<div className={style.editor}>
      <div className={style.header}><h1><i className='fa fa-camera'/> {entity.name}</h1></div>
      <div>
        <div>Embed into template using:
          <code>
            <h2>
              &lt;img src='{'{#image ' + entity.name + "}'"}/&gt;
            </h2>
          </code>
        </div>
      </div>
      <div style={{overflow: 'auto'}}>
        <img src={'data:image/png;base64,' + entity.content} style={{display: 'block', margin: '3rem auto'}}/>
      </div>
    </div>)
  }
}

