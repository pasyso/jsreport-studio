import Properties from './Properties.js'
import Studio from 'jsreport-studio'

Studio.addPropertiesComponent('electron-pdf', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'electron-pdf')