var path = require('path')

module.exports = [{
  name: 'data',
  directory: path.join(__dirname, 'data')
}, {
  name: 'phantom-pdf',
  directory: path.join(__dirname, 'phantom-pdf')
}, {
  name: 'images',
  directory: path.join(__dirname, 'images')
}, {
  name: 'reports',
  directory: path.join(__dirname, 'reports')
}, {
  name: 'schedules',
  directory: path.join(__dirname, 'scheduling')
}, {
  name: 'authentication',
  directory: path.join(__dirname, 'authentication')
}, {
  name: 'authorization',
  directory: path.join(__dirname, 'authorization')
}, {
  name: 'scripts',
  directory: path.join(__dirname, 'scripts')
}, {
  name: 'debug',
  directory: path.join(__dirname, 'debug')
}, {
  name: 'jade',
  directory: path.join(__dirname, 'jade')
}]
