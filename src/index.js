'use strict'

var perish = {
  fail (err) {
    if (!(err instanceof Error)) console.warn('warning: unhandled error is not an `Error` instance. consider looking into it.')
    if (err === undefined || err === null) err = new Error('empty, unhandled error detected')
    var toLog = perish.printStacktrace ? (err && err.stack || err.message) : (err && err.message)
    try {
      // stacktrace _usually_ embeds the messgae. if it doesn't, log it
      if (
        perish.printStacktrace &&
        err.message &&
        err.stack.indexOf(err.message) === -1
      ) console.error(err.message)
    } catch (err) {
      /* pass */
    }
    console.error(toLog)
    process.exit(1)
  },
  printStacktrace: true
  // add support for loggers
}

process.on('uncaughtException', perish.fail.bind(perish))
process.on('unhandledRejection', perish.fail.bind(perish))

module.exports = perish
