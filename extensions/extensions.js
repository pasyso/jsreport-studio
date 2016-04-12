var path = require('path')

module.exports = [ {
  name: 'data',
  directory: path.join(__dirname, 'data')
}, {
  name: 'phantom-pdf',
  directory: path.join(__dirname, 'phantom-pdf')
}, {
  name: 'scripts',
  directory: path.join(__dirname, 'scripts')
} ]
