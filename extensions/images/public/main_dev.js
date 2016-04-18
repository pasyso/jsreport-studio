import ImageEditor from './ImageEditor.js'

Studio.registerEntitySet({ name: 'images', faIcon: 'fa-camera', visibleName: 'image' })
Studio.registerTabEditorComponent('images', ImageEditor)

Studio.registerToolbarComponent((props) => {
  const upload = () => {
    alert('uploading')
  }

  return <div className='toolbar-button' onClick={upload}><i className='fa fa-cloud-upload'/>Upload</div>
})