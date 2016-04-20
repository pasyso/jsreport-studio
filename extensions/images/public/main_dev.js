import ImageEditor from './ImageEditor.js'
import ImageUploadButton from './ImageUploadButton.js'

Studio.registerEntitySet({ name: 'images', faIcon: 'fa-camera', visibleName: 'image', onNew: ImageUploadButton.OpenUpload })
Studio.registerTabEditorComponent('images', ImageEditor)
Studio.registerToolbarComponent(ImageUploadButton)