import PermissionProperties from './PermissionProperties.js'
import Studio from 'jsreport-studio'

Studio.addPropertyComponent('permissions', PermissionProperties, (entity) => entity.__entitySet !== 'users')
