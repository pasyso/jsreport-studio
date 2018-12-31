
const get = require('lodash/get')

const MAX_ITEMS = 5

module.exports = (reporter, definition) => {
  const fullState = {}
  const shouldUseDiscriminator = definition.options.requestLogDiscriminatorPath != null

  reporter.afterRenderListeners.add('requestsLog', this, async (request) => {
    if (request.context.isChildRequest) {
      return
    }

    const currentState = getCurrentState(
      fullState,
      request,
      shouldUseDiscriminator ? definition.options.requestLogDiscriminatorPath : null
    )

    if (currentState == null) {
      return
    }

    saveIntoState(currentState, 'requestsLog', {
      template: { shortid: request.template.shortid },
      timestamp: new Date().getTime(),
      logs: [...normalizeLogs(request.context.logs || [])]
    }, request)
  })

  if (!reporter.renderErrorListeners) {
    return
  }

  reporter.renderErrorListeners.add('failedRequestsLog', this, async (request, response, err) => {
    if (request.context.isChildRequest) {
      return
    }

    const currentState = getCurrentState(
      fullState,
      request,
      shouldUseDiscriminator ? definition.options.requestLogDiscriminatorPath : null
    )

    if (currentState == null) {
      return
    }

    saveIntoState(currentState, 'failedRequestsLog', {
      template: { shortid: request.template.shortid },
      timestamp: new Date().getTime(),
      logs: [...normalizeLogs(request.context.logs || [])],
      error: {
        message: err.message,
        stack: err.stack
      }
    }, request)
  })

  let flushingLogs = false

  const flushLogsTimeoutRef = setInterval(async () => {
    if (flushingLogs) {
      return
    }

    flushingLogs = true

    try {
      await flushLogs(reporter, fullState, shouldUseDiscriminator)
    } catch (e) {
      reporter.logger.error(`Error while trying to flush studio logs: ${e.message} - ${e.stack}`)
    } finally {
      flushingLogs = false
    }
  }, definition.options.flushLogsInterval)

  flushLogsTimeoutRef.unref()

  reporter.closeListeners.add('flushLogsInterval', this, () => {
    clearInterval(flushLogsTimeoutRef)
  })
}

async function flushLogs (reporter, fullState, usingDiscriminator) {
  const toProcess = usingDiscriminator ? Object.keys(fullState).map((discriminator) => ({
    discriminator,
    state: fullState[discriminator]
  })) : [{ state: fullState }]

  const errors = []

  const operations = toProcess.map(async ({ discriminator, state }) => {
    try {
      const requestForSuccessLogs = state['lastRequest#requestsLog']
      const requestForFailedLogs = state['lastRequest#failedRequestsLog']
      let requestsLog = []
      let failedRequestsLog = []

      if (requestForSuccessLogs != null) {
        requestsLog = (await reporter.settings.findValue('requestsLog', requestForSuccessLogs)) || []
      }

      if (requestForFailedLogs != null) {
        failedRequestsLog = (await reporter.settings.findValue('failedRequestsLog', requestForFailedLogs)) || []
      }

      if (state.requestsLog.length > 0 && requestForSuccessLogs != null) {
        requestsLog.unshift(...state.requestsLog)

        state.requestsLog = []
        state['lastRequest#requestsLog'] = null

        requestsLog = requestsLog.slice(0, MAX_ITEMS)
        await reporter.settings.addOrSet('requestsLog', requestsLog, requestForSuccessLogs)
      }

      if (state.failedRequestsLog.length > 0 && requestForFailedLogs != null) {
        failedRequestsLog.unshift(...state.failedRequestsLog)

        state.failedRequestsLog = []
        state['lastRequest#failedRequestsLog'] = null

        failedRequestsLog = failedRequestsLog.slice(0, MAX_ITEMS)
        await reporter.settings.addOrSet('failedRequestsLog', failedRequestsLog, requestForFailedLogs)
      }

      if (
        discriminator != null &&
        fullState[discriminator] &&
        fullState[discriminator].requestsLog.length === 0 &&
        fullState[discriminator]['lastRequest#requestsLog'] == null &&
        fullState[discriminator].failedRequestsLog.length === 0 &&
        fullState[discriminator]['lastRequest#failedRequestsLog'] == null
      ) {
        delete fullState[discriminator]
      }
    } catch (e) {
      errors.push(e)
    }
  })

  return Promise.all(operations)
}

function getCurrentState (fullState, request, discriminatorPath) {
  let currentState

  if (discriminatorPath != null) {
    let discriminator = get(request, discriminatorPath)

    if (discriminator == null) {
      return null
    }

    discriminator = String(discriminator)

    fullState[discriminator] = fullState[discriminator] || {}
    currentState = fullState[discriminator]
  } else {
    currentState = fullState
  }

  currentState.requestsLog = currentState.requestsLog || []
  currentState.failedRequestsLog = currentState.failedRequestsLog || []

  return currentState
}

function saveIntoState (state, type, record, request) {
  state[type] = state[type] || []

  state[type].unshift(record)

  // we only store logs for the last five requests
  state[type] = state[type].slice(0, MAX_ITEMS)

  state[`lastRequest#${type}`] = request
}

function normalizeLogs (logs) {
  let logsSize = 0
  const MAX_LOGS_LINES = 200 // maximum of 200 logs lines
  const MAX_LOGS_SIZE = 500000 // (bytes) maximum of 500kb for total size of logs

  // only save a maximum of logs lines (from the last)
  let finalLogs = logs.length > MAX_LOGS_LINES ? logs.slice(MAX_LOGS_LINES * -1) : logs

  const greaterThanMaxSize = finalLogs.some((log) => {
    const size = Buffer.from(log.message || '', 'utf8').length

    logsSize += size

    return logsSize > MAX_LOGS_SIZE
  })

  if (greaterThanMaxSize) {
    // trim log messages if the size is greater than the maximum
    finalLogs = finalLogs.map((log) => {
      // let's pretend that one character is equal to one byte,
      // so the minimum size for each message is MAX_LOGS_SIZE/MAX_LOGS_LINES bytes
      log.message = (log.message || '').substring(0, parseInt(MAX_LOGS_SIZE / MAX_LOGS_LINES, 10)) + '...'
      return log
    })
  }

  return finalLogs
}
