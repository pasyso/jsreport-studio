import superagent from 'superagent'
import Promise from 'bluebird'

const methods = [ 'get', 'post', 'put', 'patch', 'del' ]

let requestHandler = {}

methods.forEach((m) => {
  requestHandler[ m ] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
    const request = superagent[ m ](path)

    if (params) {
      request.query(params)
    }

    if (data) {
      request.send(data)
    }

    request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body))
  })
})

export default requestHandler

let stubHandler = {}
methods.forEach((m) => {
  stubHandler[ m ] = (stub) => (requestHandler [ m ] = stub)
})

export let stub = stubHandler
