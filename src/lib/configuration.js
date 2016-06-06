export let engines = []
export let recipes = []
export const initializeListeners = []
export const readyListeners = []
export const previewListeners = []
export const entitySets = {}
export const templateEditorModeResolvers = []
export const propertiesComponents = []
export const editorComponents = []
export const toolbarComponents = {
  left: [],
  right: [],
  settings: []
}
export const tabTitleComponents = []

export let toolbarVisibilityResolver = () => true

export let _splitResizeHandlers = []

export const registerPreviewFrameChangeHandler = (fn) => { previewFrameChangeHandler = fn }
export let previewFrameChangeHandler = () => {}

export const registerPreviewHandler = (fn) => { previewHandler = fn }
export let previewHandler = () => {}

export const registerModalHandler = (fn) => { modalHandler = fn }
export let modalHandler = () => {}

export const registerCollapseLeftHandler = (fn) => { collapseLeftHandler = fn }
export let collapseLeftHandler = () => {}

export let shouldOpenStartupPage = true

export let apiHeaders = {}

export const subscribeToSplitResize = (fn) => {
  _splitResizeHandlers.push(fn)
  return () => { _splitResizeHandlers = _splitResizeHandlers.filter((s) => s !== fn) }
}

export let referencesLoader = null

export let locationResolver = null

export let extensions = []

export const triggerSplitResize = () => { _splitResizeHandlers.forEach((fn) => fn()) }