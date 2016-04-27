import ScriptEditor from './ScriptEditor.js'
import Properties from './ScriptProperties.js'
import Studio from 'jsreport-studio'

Studio.registerEntitySet({ name: 'scripts', faIcon: 'fa-cogs', visibleName: 'script' })
Studio.registerPropertyComponent(Properties.title, Properties, (entity) => entity.__entitySet === 'templates')
Studio.registerTabEditorComponent('scripts', ScriptEditor)

Studio.previewListeners.push((request, entities) => {
  if (!request.template.scripts) {
    return
  }

  request.template.scripts = request.template.scripts.map((s) => ({
    ...s,
    content: Studio.getEntityByShortid(s.shortid).content
  }))
})