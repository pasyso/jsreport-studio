import List from './List.js'
import DataEditor from './DataEditor.js'
import Properties from './DataProperties.js'

studio.routes.push({
  path: '/studio/data',
  component: List
})

studio.properties.push(Properties)

studio.detailComponents.data = DataEditor

studio.initializeListeners.push(function (cb) {
  return studio.api.get('/odata/data?$select=name').then(function (r) {
    studio.objectReferences.data = r.value
    cb()
  })
})
