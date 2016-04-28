module.exports = function (reporter) {
  reporter.afterRenderListeners.add('failedRequestsLog', this, function (request) {
    return reporter.settings.findValue('failedRequestsLog').then(function (v) {
      v = v || []
      v.unshift({
        template: { shortid: request.template.shortid },
        timestamp: new Date(),
        logs: request.logs
      })

      if (v.length > 5) {
        v.pop()
      }

      return reporter.settings.addOrSet('failedRequestsLog', v)
    })
  })
}
