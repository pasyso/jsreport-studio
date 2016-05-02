import Studio from 'jsreport-studio'

let debug = false
const preview = () => {
  debug = true
  Studio.preview()
}

Studio.configure({
  toolbar: (props) => <div
    className={'toolbar-button ' + (!props.canRun ? 'disabled' : '')} onClick={() => preview()}>
    <i className='fa fa-bug' />Debug</div>,

  previewListeners: (request) => {
    if (debug) {
      request.options.debug = { logsToResponse: true }
    }
    debug = false
  }
})

Studio.addToolbarComponent((props) => <div
  className={'toolbar-button ' + (!props.canRun ? 'disabled' : '')} onClick={() => preview()}>
  <i className='fa fa-bug'/>Debug</div>)

Studio.previewListeners.push((request, entities) => {
  if (debug) {
    request.options.debug = { logsToResponse: true }
  }
  debug = false
})