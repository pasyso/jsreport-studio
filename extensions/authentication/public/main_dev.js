import UserEditor from './UserEditor.js'
import ChangePasswordModal from './ChangePasswordModal.js'
import NewUserModal from './NewUserModal.js'
import LogoutSettingsButton from './LogoutSettingsButton.js'
import ChangePasswordSettingsButton from './ChangePasswordSettingsButton.js'
import ChangePasswordButton from './ChangePasswordButton.js'
import Studio from 'jsreport-studio'

// we want to be at the front, because other extension like scheduling relies on loaded user
Studio.initializeListeners.unshift(async () => {
  const response = await Studio.api.get('/api/settings')

  if (!response.tenant) {
    // authentication not enabled in config
    return
  }

  Studio.authentication = { user: response.tenant }

  if (Studio.authentication.user.isAdmin) {
    Studio.registerEntitySet({
      name: 'users',
      faIcon: 'fa-user',
      visibleName: 'user',
      nameAttribute: 'username',
      onNew: () => Studio.openModal('NEW_USER_MODAL')
    })
    Studio.registerTabEditorComponent('users', UserEditor)
    Studio.registerToolbarComponent(ChangePasswordButton)
  }

  Studio.registerSettingsToolbarComponent(LogoutSettingsButton)
  Studio.registerSettingsToolbarComponent(ChangePasswordSettingsButton)
  Studio.registerModal('CHANGE_PASSWORD_MODAL', ChangePasswordModal)
  Studio.registerModal('NEW_USER_MODAL', NewUserModal)
})
