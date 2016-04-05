import isObject from 'lodash/lang/isobject'

function getUIState (state) {
  state.content = state.content || ' '
  state.helpers = state.helpers || ''

  delete state._id
  return state
}

function addInput (form, name, value) {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = name
  input.value = value
  form.appendChild(input)
}

export default function (model, target) {
  model = Object.assign({}, model)
  const uiState = getUIState(model)

  const request = { template: uiState, options: Object.assign({ preview: true }, uiState.options) }

  const mapForm = document.createElement('form')
  mapForm.target = target
  mapForm.method = 'POST'
  mapForm.action = '/api/report'

  function addBody (path, body) {
    if (body === undefined) {
      return
    }

    for (const key in body) {
      if (isObject(body[ key ])) {
        // somehow it skips empty array for template.scripts, this condition fixes that
        if (body[ key ] instanceof Array && body[ key ].length === 0) {
          addInput(mapForm, path + '[' + key + ']', [])
        }
        addBody(path + '[' + key + ']', body[ key ])
      } else {
        if (body[ key ] !== undefined && !(body[ key ] instanceof Array)) {
          addInput(mapForm, path + '[' + key + ']', body[ key ])
        }
      }
    }
  }

  addBody('template', uiState)

  if (request.options) {
    addBody('options', request.options)
  }

  if (request.data) {
    addInput(mapForm, 'data', request.data)
  }

  document.body.appendChild(mapForm)
  mapForm.submit()
}

