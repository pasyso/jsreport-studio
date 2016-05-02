import * as configuration from './lib/configuration.js'
import TemplateProperties from './components/Properties/TemplateProperties.js'
import Startup from './containers/Startup/Startup.js'

export default () => {
  configuration.propertyComponents.push({
    title: TemplateProperties.title,
    shouldDisplay: (entity) => entity.__entitySet === 'templates',
    component: TemplateProperties
  })

  configuration.tabEditorComponents.templates = require('./components/Editor/TemplateEditor.js')
  configuration.tabEditorComponents.startup = Startup
  configuration.entitySets.templates = { name: 'templates', visibleName: 'template', nameAttribute: 'name' }
}