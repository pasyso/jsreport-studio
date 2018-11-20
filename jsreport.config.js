module.exports = {
  name: 'studio',
  main: 'lib/studio.js',
  optionsSchema: {
    extensions: {
      studio: {
        type: 'object',
        properties: {
          requestLogEnabled: {
            type: 'boolean',
            default: true
          },
          entityTreeOrder: {
            type: 'array',
            items: { type: 'string' }
          },
          extensionsInDevMode: {
            anyOf: [
              {
                type: 'string',
                '$jsreport-constantOrArray': []
              },
              {
                type: 'array',
                items: { type: 'string' }
              }
            ]
          }
        }
      }
    }
  },
  dependencies: ['express']
}
