import React from 'react'
import ReactList from 'react-list'
import superagent from 'superagent'
import ReactDom from 'react-dom'
import TemplateProperties from './components/Properties/TemplateProperties.js'
import Startup from './containers/Startup/Startup.js'
import api from './helpers/api.js'
import TextEditor from './components/Editor/TextEditor.js'
import * as editor from './redux/editor'
import * as entities from './redux/entities'
import * as modal from './redux/modal'
import modalComponents from './components/Modals'
import relativizeUrl from './helpers/relativizeUrl.js'

class Studio {
  init (store) {
    this.editor = editor
    this.store = store
    this.routes = []
    this.runtime = {}
    this.libraries = {
      react: React,
      'react-dom': ReactDom,
      'react-list': ReactList,
      superagent: superagent
    }

    this.relativizeUrl = relativizeUrl

    this.propertyComponents = [{
      title: TemplateProperties.title,
      shouldDisplay: (entity) => entity.__entitySet === 'templates',
      component: TemplateProperties
    }]
    this.api = api
    this.tabTitleComponents = {}
    this.tabEditorComponents = { templates: require('./components/Editor/TemplateEditor.js'), startup: Startup }
    this.references = {}
    this.initializeListeners = []
    this.previewListeners = []
    this.TextEditor = TextEditor
    this.entitySets = {}
    this.registerEntitySet({ name: 'templates', visibleName: 'template' })
    this.toolbarComponents = { right: [], left: [], settings: [] }
    this.modals = modalComponents

    this.splitResizeSubscribers = []

    // add babel runtime to the global so extensions can replace their runtimes with this and decrease its package size
    this.runtime['core-js/object/get-prototype-of'] = require('babel-runtime/core-js/object/get-prototype-of')
    this.runtime['core-js/object/keys'] = require('babel-runtime/core-js/object/keys')
    this.runtime['core-js/object/assign'] = require('babel-runtime/core-js/object/assign')
    this.runtime['helpers/defineProperty'] = require('babel-runtime/helpers/defineProperty')
    this.runtime['helpers/classCallCheck'] = require('babel-runtime/helpers/classCallCheck')
    this.runtime['helpers/createClass'] = require('babel-runtime/helpers/createClass')
    this.runtime['helpers/possibleConstructorReturn'] = require('babel-runtime/helpers/possibleConstructorReturn')
    this.runtime['helpers/inherits'] = require('babel-runtime/helpers/inherits')
    this.runtime['helpers/extends'] = require('babel-runtime/helpers/extends')
    this.runtime['helpers/asyncToGenerator'] = require('babel-runtime/helpers/asyncToGenerator')
    this.runtime['regenerator'] = require('babel-runtime/regenerator')
  }

  openTab (tab) {
    this.store.dispatch(editor.actions.openTab(tab))
  }

  openNewTab (tab) {
    this.store.dispatch(editor.actions.openNewTab(tab))
  }

  registerEntitySet (entitySet) {
    entitySet.nameAttribute = entitySet.nameAttribute || 'name'
    this.entitySets[entitySet.name] = entitySet
  }

  registerToolbarComponent (toolbarComponent) {
    this.toolbarComponents.left.push(toolbarComponent)
  }

  registerRightToolbarComponent (toolbarComponent) {
    this.toolbarComponents.right.push(toolbarComponent)
  }

  registerSettingsToolbarComponent (toolbarComponent) {
    this.toolbarComponents.settings.push(toolbarComponent)
  }

  registerTabTitleComponent (key, component) {
    this.tabTitleComponents[key] = component
  }

  registerTabEditorComponent (key, component) {
    this.tabEditorComponents[key] = component
  }

  registerPropertyComponent (title, component, shouldDisplay) {
    this.propertyComponents.push({
      title: title,
      component: component,
      shouldDisplay: shouldDisplay
    })
  }

  getEntityName (entity) {
    return entity[this.entitySets[entity.__entitySet].nameAttribute]
  }

  subscribeToSplitResize (fn) {
    this.splitResizeSubscribers.push(fn)
    return () => { this.splitResizeSubscribers = this.splitResizeSubscribers.filter((s) => s !== fn) }
  }

  setPreviewFrameSrc (frameSrc) {
    if (this.frameChangeSubscriber) {
      this.frameChangeSubscriber(frameSrc)
    }
  }

  preview () {
    if (this.previewSubscriber) {
      this.previewSubscriber()
    }
  }

  registerModal (key, component) {
    this.modals[key] = component
  }

  openModal (key, options) {
    this.store.dispatch(modal.actions.openComponent(key, options))
  }

  triggerSplitResize () {
    this.splitResizeSubscribers.forEach((fn) => fn())
  }

  reloadEntity (id) {
    this.store.dispatch(entities.actions.load(id, true))
  }

  addEntity (entity) {
    this.store.dispatch(entities.actions.add(entity))
  }

  saveEntity (id) {
    this.store.dispatch(entities.actions.save(id))
  }

  addExistingEntity (entity) {
    this.store.dispatch(entities.actions.addExisting(entity))
  }

  getEntityByShortid (shortid, shouldThrow = true) {
    return entities.selectors.getByShortid(this.store.getState(), shortid, shouldThrow)
  }
}

const studio = new Studio()
export const init = (store) => studio.init(store)
export default studio
