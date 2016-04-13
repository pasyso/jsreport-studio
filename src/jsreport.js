import React from 'react'
import TemplateEditor from './components/Editor/TemplateEditor.js'
import TemplateProperties from './components/Properties/TemplateProperties.js'
import Startup from './containers/Startup/Startup.js'
import ApiClient from './helpers/ApiClient.js'
import AceEditor from 'react-ace'
import * as editor from 'redux/editor'

export default function (store) {
  var jsreport = {
    editor: editor,
    dispatch: store.dispatch,
    routes: [],
    runtime: {},
    react: React,
    properties: [ TemplateProperties ],
    api: new ApiClient(),
    titleComponents: { },
    detailComponents: { templates: TemplateEditor, startup: Startup },
    references: {},
    initializeListeners: [],
    AceEditor: AceEditor,
    entityTypes: [ 'templates' ]
  }

  jsreport.runtime[ 'core-js/object/get-prototype-of' ] = require('babel-runtime/core-js/object/get-prototype-of')
  jsreport.runtime[ 'core-js/object/keys' ] = require('babel-runtime/core-js/object/keys')
  jsreport.runtime[ 'helpers/classCallCheck' ] = require('babel-runtime/helpers/classCallCheck')
  jsreport.runtime[ 'helpers/createClass' ] = require('babel-runtime/helpers/createClass')
  jsreport.runtime[ 'helpers/possibleConstructorReturn' ] = require('babel-runtime/helpers/possibleConstructorReturn')
  jsreport.runtime[ 'helpers/inherits' ] = require('babel-runtime/helpers/inherits')

  return jsreport
}