'use strict'

const perish = require('../')
perish.printStacktrace = false

function unhandled4Function () {
  throw new Error('unhandled-4')
}
setTimeout(unhandled4Function, 1)
