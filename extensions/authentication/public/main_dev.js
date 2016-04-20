import UserEditor from './UserEditor.js'

Studio.registerEntitySet({ name: 'users', faIcon: 'fa-user', visibleName: 'user', nameAttribute: 'username' })
Studio.registerTabEditorComponent('users', UserEditor)
