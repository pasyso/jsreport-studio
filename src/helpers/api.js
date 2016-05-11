import superagent from 'superagent'
import Promise from 'bluebird'
import parse from './parseJSON.js'
import relativizeUrl from './relativizeUrl'
import { apiHeaders } from '../lib/configuration.js'
const methods = ['get', 'post', 'put', 'patch', 'del']

let requestHandler = {}

const createError = (err, body) => {
  if (body && body.error) {
    let e = new Error(body.error.message)
    e.stack = body.error.stack
    return e
  }

  if (body && body.message) {
    let e = new Error(body.message)
    e.stack = body.stack
    return e
  }

  return err || new Error('API call failed')
}

methods.forEach((m) => {
  requestHandler[m] = (path, { params, data, attach } = {}) => new Promise((resolve, reject) => {
    const request = superagent[m](relativizeUrl(path))

    Object.keys(apiHeaders).forEach((k) => request.set(k, apiHeaders[k]))
    request.set('X-Requested-With', 'XMLHttpRequest')
    request.set('Expires', '-1')
    request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')

    if (params) {
      request.query(params)
    }

    if (attach) {
      request.attach(attach.filename, attach.file)
    }

    if (data) {
      request.send(data)
    }

    request.end((err, { text } = {}) => err ? reject(createError(err, JSON.parse(text))) : resolve(parse(text)))
  })
})

export default requestHandler

let stubHandler = {}
methods.forEach((m) => {
  stubHandler[m] = (stub) => (requestHandler[m] = stub)
})

export let stub = stubHandler
