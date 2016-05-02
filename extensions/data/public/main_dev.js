import DataEditor from './DataEditor.js'
import Properties from './DataProperties.js'
import Studio from 'jsreport-studio'

//Studio.addEntitySet({ name: 'data', faIcon: 'fa-database', visibleName: 'sample data' })
//Studio.addPropertyComponent(Properties.title, Properties, (entity) => entity.__entitySet === 'templates')
//Studio.addTabEditorComponent('data', DataEditor)

const previewListener = (request, entities) => {
  if (!request.template.data || !request.template.data.shortid) {
    return
  }

  let dataDetails = Object.keys(entities).map((e) => entities[e])
    .filter((d) => d.shortid === request.template.data.shortid && d.__entitySet === 'data' && (d.__isLoaded || d.__isNew))

  if (!dataDetails.length) {
    return
  }

  request.data = dataDetails[0].dataJson || JSON.stringify({})
}

Studio.configure({
  entitySet: { name: 'data', faIcon: 'fa-database', visibleName: 'sample data' },
  property: {
    title: Properties.title,
    component: Properties,
    visibility: (entity) => entity.__entitySet === 'templates'
  },
  editor: {
    entitySet: 'data',
    component: DataEditor
  },
  previewListener: previewListener
})