'use strict'

var perish = {
  fail (err) {
    if (!(err instanceof Error)) console.warn('warning: unhandled error is not an `Error` instance. consider looking into it.')
    if (err === undefined || err === null) err = new Error('empty, unhandled error detected')
    var toLog = perish.printStacktrace ? (err && err.stack) : (err && err.message)
    console.error(toLog)
    process.exit(1)
  },
  printStacktrace: true
  // add support for loggers
}

process.on('uncaughtException', perish.fail.bind(perish))
process.on('unhandledRejection', perish.fail.bind(perish))

module.exports = perish
