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
