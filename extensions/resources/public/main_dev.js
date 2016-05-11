import Properties from './Properties.js'
import Studio from 'jsreport-studio'

Studio.addPropertiesComponent(Properties.title, Properties, (entity) => entity.__entitySet === 'templates')
