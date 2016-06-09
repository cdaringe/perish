'use strict'

var perish = {
  fail (err) {
    if (!(err instanceof Error)) console.warn('warning: unhandled error is not an `Error` instance. consider looking into it.')
    if (err === undefined || err === null) err = new Error('empty, unhandled error detected')
    console.error(err && err.message)
    console.error(err && err.stack)
    process.exit(1)
  }
  // add support for loggers
}

process.on('uncaughtException', perish.fail)
process.on('unhandledRejection', perish.fail)

module.exports = perish
