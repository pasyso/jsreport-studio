import React from 'react'
import ReactList from 'react-list'
import superagent from 'superagent'
import ReactDom from 'react-dom'
import api from './helpers/api.js'
import TextEditor from './components/Editor/TextEditor.js'
import * as editor from './redux/editor'
import * as entities from './redux/entities'
import * as configuration from './lib/configuration.js'
import relativizeUrl from './helpers/relativizeUrl.js'
import babelRuntime from './lib/babelRuntime.js'

/**
 * Main facade and API for extensions. Exposed as global variable Studio. It can be also imported from jsreport-studio
 * when using extensions default webpack configuration
 *
 * @class
 * @public
 */
class Studio {
  /**
   * Provides methods get,patch,post,del for accessing jsreport server
   *
   * @example
   * await Studio.api.patch('/odata/tasks', { data: { foo: '1 } })
   *
   * @returns {*}
   */
  get api () {
    return api
  }

  /**
   * Ace editor React wrapper
   *
   * @example
   * export default class DataEditor extends Component { ... }
   *
   * @returns {TextEditor}
   */
  get TextEditor () {
    return TextEditor
  }

  /**
   * Get registered entity sets, each one is object { visibleName: 'foo', nameAttribute: 'name' }
   * @returns {Object|Array}
   */
  get entitySets () {
    return configuration.entitySets
  }

  /**
   * Array of async functions invoked in sequence during initialization
   * @returns {function|Array}
   */
  get initializeListeners () {
    return configuration.initializeListeners
  }

  /**
   * Array of async functions invoked in sequence when preview process starts.
   * @returns {function|Array}
   */
  get previewListeners () {
    return configuration.previewListeners
  }

  /**
   * Array of functions used to resolve ace editor mode for template content. This is used by custom templating engines
   * to add highlighting support for jade,ejs...
   *
   * @returns {*|Array}
   */
  get templateEditorModeResolvers () {
    return configuration.templateEditorModeResolvers
  }

  addEntitySet (entitySet) {
    entitySet.nameAttribute = entitySet.nameAttribute || 'name'
    configuration.entitySets[entitySet.name] = entitySet
  }

  addToolbarComponent (toolbarComponent, position = 'left') {
    configuration.toolbarComponents[position].push(toolbarComponent)
  }

  addTabTitleComponent (key, component) {
    configuration.tabTitleComponents[key] = component
  }

  addTabEditorComponent (key, component) {
    configuration.tabEditorComponents[key] = component
  }

  addPropertyComponent (title, component, shouldDisplay) {
    configuration.propertyComponents.push({
      title: title,
      component: component,
      shouldDisplay: shouldDisplay
    })
  }

  setPreviewFrameSrc (frameSrc) {
    configuration.previewFrameChangeHandler(frameSrc)
  }

  configure (cfg) {
    this.addEntitySet(cfg.entitySet)
    this.addPropertyComponent(cfg.property.title, cfg.property.component, cfg.property.visibility)
    this.addTabEditorComponent(cfg.editor.entitySet, cfg.editor.component)
  }

  /**
   * Opens modal dialog.
   *
   * @param {Component|String}componentOrText
   * @param {Object} options passed as props to the react component
   */
  openModal (componentOrText, options) {
    configuration.modalHandler.open(componentOrText, options)
  }

  /**
   * Invoke preview process for last active template
   */
  preview () {
    configuration.previewHandler()
  }

  /**
   *
   * @param tab
   */
  openTab (tab) {
    this.store.dispatch(editor.actions.openTab(tab))
  }

  /**
   *
   * @param tab
   */
  openNewTab (tab) {
    this.store.dispatch(editor.actions.openNewTab(tab))
  }

  /**
   * Loads entity, which reference is already present in the ui state, from the remote API
   *
   * @param {String} id
   * @param {Boolean} force
   * @return {Promise}
   * @public
   */
  loadEntity (id, force = false) {
    return this.store.dispatch(entities.actions.load(id, force))
  }

  /**
   * Add entity to the state
   * @param {object} entity
   * @public
   */
  addEntity (entity) {
    this.store.dispatch(entities.actions.add(entity))
  }

  /**
   * Call remote API and persist (insert or update) entity
   * @param {String} id
   * @return {Promise}
   * @public
   */
  saveEntity (id) {
    return this.store.dispatch(entities.actions.save(id))
  }

  /**
   * Adds already existing (persisted) entity into the UI state
   * @param entity
   * @public
   */
  addExistingEntity (entity) {
    this.store.dispatch(entities.actions.addExisting(entity))
  }

  /**
   * Searches for the entity in the UI state based on specified the shortid
   * @param shortid
   * @param shouldThrow
   * @returns {object | null}
   * @public
   */
  getEntityByShortid (shortid, shouldThrow = true) {
    return entities.selectors.getByShortid(this.store.getState(), shortid, shouldThrow)
  }

  /**
   * Get the path in absolute form like /api/images and make it working also for jsreport running on subpath like myserver.com/reporting/api/images
   * @param {String} path
   * @returns {String}
   */
  relativizeUrl (path) {
    return relativizeUrl(path)
  }

  constructor (store) {
    this.editor = editor
    this.store = store
    this.references = {}
    // extensions can add routes, not yet prototyped
    this.routes = []

    // webpack replaces all the babel runtime references in extensions with externals taking runtime from this field
    // this basically removes the duplicated babel runtime code from extensions and decrease its sizes
    this.runtime = babelRuntime

    // the same case as for babel runtime, we expose the following libraries and replace their references in extensions
    // using webpack externals
    this.libraries = {
      react: React,
      'react-dom': ReactDom,
      'react-list': ReactList,
      superagent: superagent
    }
  }
}

let studio
export const createStudio = (store) => (studio = new Studio(store))

export default studio
