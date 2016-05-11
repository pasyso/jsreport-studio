var extensions = require('../extensions/extensions.js')
var exec = require('child_process').exec
var path = require('path')

extensions.forEach(function (e) {
  exec('set NODE_ENV=production&&node ../../../webpack/buildExtension.js', { cwd: path.join(e.directory, 'public') }, function (error, stdout, stderr) {
    if (error) {
      console.error(error)
    }
  })
})

