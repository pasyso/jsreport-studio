import ScriptEditor from './ScriptEditor.js'
import Properties from './ScriptProperties.js'
import Studio from 'jsreport-studio'

Studio.registerEntitySet({ name: 'scripts', faIcon: 'fa-cogs', visibleName: 'script' })
Studio.properties.push(Properties)
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