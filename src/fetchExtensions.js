function loadScript (url, callback) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.onload = function () {
    callback()
  }

  script.src = url
  document.getElementsByTagName('head')[ 0 ].appendChild(script)
}

export default function (cb) {
  console.log('loading extensions')

  if (__DEVELOPMENT__) {
    require('./dynamicExtensions.js')
    return cb()
  }

  loadScript('/studio/assets/extensions.js', function () {
    console.log('done')
    cb()
  })
}