
module.exports = {
  'name': 'studio',
  'main': 'lib/studio.js',
  'optionsSchema': {
    extensions: {
      studio: {
        type: 'object',
        properties: {
          entityTreeOrder: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    }
  },
  'dependencies': ['express']
}
