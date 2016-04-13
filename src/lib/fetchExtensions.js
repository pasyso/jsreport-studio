import Promise from 'bluebird'

function loadScript (url) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = function () {
      resolve()
    }

    script.src = url
    document.getElementsByTagName('head')[ 0 ].appendChild(script)
  })
}

export default function () {
  if (__DEVELOPMENT__) {
    require('../extensions_dev.js')
    return Promise.resolve()
  }

  return loadScript('/studio/assets/extensions.js')
}