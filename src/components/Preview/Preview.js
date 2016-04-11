import React, {Component} from 'react'

export default class Preview extends Component {

  resizeStarted () {
    document.getElementById('overlay').style.display = 'block'
    document.getElementById('preview').style.display = 'none'
  }

  resizeEnded () {
    document.getElementById('overlay').style.display = 'none'
    document.getElementById('preview').style.display = 'block'
  }

  render () {
    return <div className='block'>
      <div id='overlay' style={{display: 'none'}}></div>
      <iframe
        id='preview' frameBorder='0' name='previewFrame' allowTransparency='true' allowFullScreen='true'
        className='block-item'></iframe>
    </div>
  }
}
