import List from './List.js'
import DataEditor from './DataEditor.js'
import Properties from './DataProperties.js'

studio.routes.push({
  path: '/studio/data',
  component: List
})

studio.entityTypes.push('data')

studio.properties.push(Properties)

studio.detailComponents.data = DataEditor

studio.onPreview = function (request, objectDetails) {
  if (!objectDetails.data || !request.template.data || !request.template.data.shortid) {
    return
  }

  let dataDetails = objectDetails.data.filter((d) => d.shortid === request.template.data.shortid)

  if (!dataDetails.length) {
    return
  }

  request.data = dataDetails[0].dataJson
}