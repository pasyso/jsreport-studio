import React from 'react'
import TemplateProperties from './components/Properties/TemplateProperties.js'
import Startup from './containers/Startup/Startup.js'
import api from './helpers/api.js'
import * as editor from './redux/editor'

class Studio {
  init (store) {
    this.editor = editor
    this.store = store
    this.routes = []
    this.runtime = {}
    this.react = React
    this.properties = [ TemplateProperties ]
    this.api = api
    this.tabTitleComponents = {}
    this.tabEditorComponents = { templates: require('./components/Editor/TemplateEditor.js'), startup: Startup }
    this.references = {}
    this.initializeListeners = []
    this.AceEditor = require('react-ace')
    this.entityTypes = [ 'templates' ]

    // add babel runtime to the global so extensions can replace their runtimes with this and decrease its package size
    this.runtime[ 'core-js/object/get-prototype-of' ] = require('babel-runtime/core-js/object/get-prototype-of')
    this.runtime[ 'core-js/object/keys' ] = require('babel-runtime/core-js/object/keys')
    this.runtime[ 'helpers/classCallCheck' ] = require('babel-runtime/helpers/classCallCheck')
    this.runtime[ 'helpers/createClass' ] = require('babel-runtime/helpers/createClass')
    this.runtime[ 'helpers/possibleConstructorReturn' ] = require('babel-runtime/helpers/possibleConstructorReturn')
    this.runtime[ 'helpers/inherits' ] = require('babel-runtime/helpers/inherits')
  }

  openTab (tab) {
    this.store.dispatch(editor.actions.openTab(tab))
  }

  registerTabTitleComponent (key, component) {
    this.tabTitleComponents[ key ] = component
  }

  registerTabEditorComponent (key, component) {
    this.tabEditorComponents[ key ] = component
  }
}

const studio = new Studio()
export const init = (store) => studio.init(store)
export default studio
