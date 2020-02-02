var isNil = (err: any) => err === undefined || err === null

var perish = {
  fail (err?: any) {
    if (!(err instanceof Error)) {
      console.warn(
        'warning: unhandled error is not an `Error` instance. consider looking into it.'
      )
    }
    if (isNil(err)) err = new Error('unhandled error detected')
    var toLog = perish.printStacktrace
      ? (err && err.stack) || err.message || err.name || err
      : err && err.message
    try {
      // stacktrace usually embeds the message. if it doesn't, log it
      if (
        perish.printStacktrace &&
        err.message &&
        err.stack.indexOf(err.message) === -1
      ) {
        console.error(err.message)
      }
    } catch (err) {
      /* pass */
    }
    console.error(toLog)
    process.exit(1)
  },
  printStacktrace: true
}

process.on('uncaughtException', perish.fail.bind(perish))
process.on('unhandledRejection', perish.fail.bind(perish))

export = perish
