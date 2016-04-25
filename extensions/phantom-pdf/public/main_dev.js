import PhantomEditor from './PhantomEditor.js'
import Properties from './PhantomProperties.js'
import PhantomTitle from './PhantomTitle.js'
import * as Constants from './constants.js'
import Studio from 'jsreport-studio'

Studio.properties.push(Properties)

Studio.registerTabEditorComponent(Constants.PHANTOM_TAB_EDITOR, PhantomEditor)
Studio.registerTabTitleComponent(Constants.PHANTOM_TAB_TITLE, PhantomTitle)
