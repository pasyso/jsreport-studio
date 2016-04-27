import PhantomEditor from './PhantomEditor.js'
import Properties from './PhantomProperties.js'
import PhantomTitle from './PhantomTitle.js'
import * as Constants from './constants.js'
import Studio from 'jsreport-studio'

Studio.registerPropertyComponent('phantom pdf', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'phantom-pdf')

Studio.registerTabEditorComponent(Constants.PHANTOM_TAB_EDITOR, PhantomEditor)
Studio.registerTabTitleComponent(Constants.PHANTOM_TAB_TITLE, PhantomTitle)
