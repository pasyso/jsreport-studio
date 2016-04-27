import PermissionProperties from './PermissionProperties.js'
import Studio from 'jsreport-studio'

Studio.registerPropertyComponent('permissions', PermissionProperties, (entity) => entity.__entitySet !== 'users')