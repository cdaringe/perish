'use strict'

require('../')

function unhandled5Function () {
  const err = new Error('unhandled-5-message-logged')
  err.stack = 'bogus stack @ wherever.js'
  throw err
}
setTimeout(unhandled5Function, 1)
