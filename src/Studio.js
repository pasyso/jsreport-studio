import React from 'react'
import ReactList from 'react-list'
import superagent from 'superagent'
import ReactDom from 'react-dom'
import api from './helpers/api.js'
import TextEditor from './components/Editor/TextEditor.js'
import NewEntityModal from './components/Modals/NewEntityModal.js'
import * as editor from './redux/editor'
import * as entities from './redux/entities'
import * as progress from './redux/progress'
import * as configuration from './lib/configuration.js'
import relativizeUrl from './helpers/relativizeUrl.js'
import babelRuntime from './lib/babelRuntime.js'
import bluebird from 'bluebird'

/**
 * Main facade and API for extensions. Exposed as global variable Studio. It can be also imported from jsreport-studio
 * when using extensions default webpack configuration
 *
 * @class
 * @public
 */
class Studio {

  /** event listeners **/

  /**
   * Array of async functions invoked in sequence during initialization
   * @returns {function|Array}
   */
  get initializeListeners () {
    return configuration.initializeListeners
  }

  /**
   * Array of async functions invoked in sequence after the app has been rendered
   * @returns {*|Array}
   */
  get readyListeners () {
    return configuration.readyListeners
  }

  /**
   * Array of async functions invoked in sequence when preview process starts.
   * @returns {function|Array}
   */
  get previewListeners () {
    return configuration.previewListeners
  }

  /** /event listeners **/

  /** initial configuration **/

  /**
   * Add new entity set, which will be automatically loaded through OData and displayed in the entity tree
   *
   * @param {Object} entitySet For example { name: 'data', visibleName: 'sample data' }
   */
  addEntitySet (entitySet) {
    entitySet.nameAttribute = entitySet.nameAttribute || 'name'
    configuration.entitySets[entitySet.name] = entitySet
  }

  /**
   * Add React component which will be displayed in toolbar
   *
   * @param {Component|function} toolbarComponent
   * @param {String} position left or settings
   */
  addToolbarComponent (toolbarComponent, position = 'left') {
    configuration.toolbarComponents[position].push(toolbarComponent)
  }

  /**
   * Add React component which will be used as tab title
   *
   * @param {String} key used in openTab({ titleComponentKey
   * @param {Component|function} component
   */
  addTabTitleComponent (key, component) {
    configuration.tabTitleComponents[key] = component
  }

  /**
   * Add component used in tab as content editor
   *
   * @param {String} key - key used id openTab({ editorComponentKey: ... , use entity set name if the editor should represent the main entity editor
   * @param component
   */
  addEditorComponent (key, component) {
    configuration.editorComponents[key] = component
  }

  /**
   * Add component used in the left Properties secion
   *
   * @param {Function|String} string or title function used to render the section title
   * @param component
   * @param {Function} shouldDisplay
   */
  addPropertiesComponent (title, component, shouldDisplay) {
    configuration.propertiesComponents.push({
      title: title,
      component: component,
      shouldDisplay: shouldDisplay
    })
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

  /**
   * Sets the function returning the browser url path
   * (defaultCalculatedPath, currentEntity) => String
   * @param {Function} fn
   */
  set locationResolver (fn) {
    configuration.locationResolver = fn
  }

  /**
   * Set the function retunring the visibility flag for particular toolbar button
   * ('Save All') => return true
   * @param {Function} fn
   */
  set toolbarVisibilityResolver (fn) {
    configuration.toolbarVisibilityResolver = fn
  }

  /**
   * Override the default entities references loading with custom function
   * (entitySet) => Promise([array])
   * @param fn
   */
  set referencesLoader (fn) {
    configuration.referencesLoader = fn
  }

  /**
   * Optionally you can avoid displaying default startup page
   * @param {Boolean} trueOrFalse
   */
  set shouldOpenStartupPage (trueOrFalse) {
    configuration.shouldOpenStartupPage = trueOrFalse
  }

  /**
   * Set additional custom header to all api calls
   * @param {String} key
   * @param {String} value
   */
  setRequestHeader (key, value) {
    configuration.apiHeaders[key] = value
  }

  /** /initial configuration **/

  /** runtime helpers **/

  /**
   * Override the right preview pane with additional content
   * setPreviewFrameSrc('data:text/html;charset=utf-8,foooooooo')
   * @param {String} frameSrc
   */
  setPreviewFrameSrc (frameSrc) {
    configuration.previewFrameChangeHandler(frameSrc)
  }

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
   * Get registered entity sets, each one is object { visibleName: 'foo', nameAttribute: 'name' }
   * @returns {Object|Array}
   */
  get entitySets () {
    return configuration.entitySets
  }

  /**
   * Object[name] with registered extensions and its options
   */
  get extensions () {
    return configuration.extensions
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

  openNewModal (entitySet) {
    configuration.modalHandler.open(NewEntityModal, { entitySet: entitySet })
  }

  /**
   * Updates through editor are not immediately propagated to the redux state because of performance.
   * Call this to force flush of updates into the redux state
   */
  flushUpdates () {
    configuration.flushUpdates()
  }

  /**
   * Invoke preview process for last active template
   */
  preview () {
    configuration.previewHandler()
  }

  /**
   * Collapse left pane
   */
  collapseLeftPane () {
    configuration.collapseLeftHandler()
  }

  /**
   * Open and activate new editor tab
   *
   * @example
   * //open entity editor
   * Studio.openTab({ _id: 'myentityid' })
   * //open custom page
   * Studio.openTab({ key: 'StartupPage', editorComponentKey: 'startup', title: 'Statup' })
   *
   * @param {Object} tab
   */
  openTab (tab) {
    this.store.dispatch(editor.actions.openTab(tab))
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

  unloadEntity (id) {
    return this.store.dispatch(entities.actions.unload(id))
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
   * Replace the existing entity in the state
   * @param {String} oldId
   * @param {Object} entity
   */
  replaceEntity (oldId, entity) {
    this.store.dispatch(entities.actions.replace(oldId, entity))
  }

  /**
   * Remove entity from the state
   * @param {String} id
   */
  removeEntity (id) {
    this.store.dispatch({
      type: entities.ActionTypes.REMOVE,
      _id: id
    })
  }

  /**
   * Show ui signalization for running background operation
   */
  startProgress () {
    this.store.dispatch(progress.actions.start())
  }

  /**
   * Hide ui signalization for running background operation
   */
  stopProgress () {
    this.store.dispatch(progress.actions.stop())
  }

  /**
   * Synchronize the location with history
   */
  updateHistory () {
    this.store.dispatch(editor.actions.updateHistory())
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
   * Returns the currently selected entity or null
   * @returns {Object}
   */
  getActiveEntity () {
    return editor.selectors.getActiveEntity(this.store.getState())
  }

  /**
   * Returns last active entity
   * @returns {Object|nu;;}
   */
  getLastActiveTemplate () {
    return editor.selectors.getLastActiveTemplate(this.store.getState())
  }

  /**
   * Get all entities including meta attributes in array
   * @returns {array}
   */
  getAllEntities () {
    return entities.selectors.getAll(this.store.getState())
  }

  /**
   * Get the path in absolute form like /api/images and make it working also for jsreport running on subpath like myserver.com/reporting/api/images
   * @param {String} path
   * @returns {String}
   */
  relativizeUrl (path) {
    return relativizeUrl(path)
  }

  /** /runtime helpers **/

  /** react components **/

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

  /** /react components **/

  constructor (store) {
    this.editor = editor
    this.store = store
    this.entities = entities
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
      superagent: superagent,
      bluebird: bluebird
    }
  }
}

let studio
export const createStudio = (store) => (studio = new Studio(store))

export default studio
