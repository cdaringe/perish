'use strict'

const perish = require('../')
perish.printStacktrace = true

function unhandled3Function () {
  throw new Error('unhandled-3')
}
setTimeout(unhandled3Function, 1)
