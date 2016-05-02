import api from '../helpers/api.js'
import Promise from 'bluebird'

export let engines = []
export let recipes = []
export const initializeListeners = []
export const previewListeners = []
export const entitySets = {}
export const templateEditorModeResolvers = []
export const propertyComponents = []
export const tabEditorComponents = []
export const toolbarComponents = {
  left: [],
  right: [],
  settings: []
}
export const tabTitleComponents = []

export let _splitResizeHandlers = []

export const registerPreviewFrameChangeHandler = (fn) => { previewFrameChangeHandler = fn }
export let previewFrameChangeHandler = () => {}

export const registerPreviewHandler = (fn) => { previewHandler = fn }
export let previewHandler = () => {}

export const registerModalHandler = (fn) => { modalHandler = fn }
export let modalHandler = () => {}

export const subscribeToSplitResize = (fn) => {
  _splitResizeHandlers.push(fn)
  return () => { _splitResizeHandlers = _splitResizeHandlers.filter((s) => s !== fn) }
}

export const triggerSplitResize = () => { _splitResizeHandlers.forEach((fn) => fn()) }

export const load = () => Promise.all([
  api.get('/api/engine').then((engs) => (engines = engs)),
  api.get('/api/recipe').then((recs) => (recipes = recs))])

const _events = {}
export const events = {
  subscribe: (eventName, fn) => {
    _events[eventName] = _events[eventName] || []
    _events[eventName].push(fn)
  },
  trigger: async (eventName, ...args) => { _events[eventName].forEach((fn) => fn(...args)) }
}
