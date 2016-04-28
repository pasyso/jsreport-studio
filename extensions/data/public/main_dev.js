import DataEditor from './DataEditor.js'
import Properties from './DataProperties.js'
import Studio from 'jsreport-studio'

Studio.registerEntitySet({ name: 'data', faIcon: 'fa-database', visibleName: 'sample data' })
Studio.registerPropertyComponent(Properties.title, Properties, (entity) => entity.__entitySet === 'templates')
Studio.registerTabEditorComponent('data', DataEditor)

Studio.previewListeners.push((request, entities) => {
  if (!request.template.data || !request.template.data.shortid) {
    return
  }

  let dataDetails = Object.keys(entities).map((e) => entities[e])
    .filter((d) => d.shortid === request.template.data.shortid && d.__entitySet === 'data' && (d.__isLoaded || d.__isNew))

  if (!dataDetails.length) {
    return
  }

  request.data = dataDetails[0].dataJson || JSON.stringify({})
})