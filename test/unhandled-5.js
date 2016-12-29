'use strict'

function unhandled5Function () {
  const err = new Error('unhandled-5-message-logged')
  err.stack = 'bogus stack @ wherever.js'
  throw unhandled5Function
}
setTimeout(unhandled5Function, 1)
