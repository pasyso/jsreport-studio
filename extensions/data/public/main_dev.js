import DataEditor from './DataEditor.js'
import Properties from './DataProperties.js'

Studio.entityTypes.push('data')
Studio.properties.push(Properties)
Studio.registerTabEditorComponent('data', DataEditor)

Studio.onPreview = function (request, entities) {
  if (!request.template.data || !request.template.data.shortid) {
    return
  }

  let dataDetails = Object.keys(entities).map((e) => entities[e]).filter((d) => d.shortid === request.template.data.shortid && d.__entityType === 'data')

  if (!dataDetails.length) {
    return
  }

  request.data = dataDetails[0].dataJson
}