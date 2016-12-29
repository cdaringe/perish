'use strict'

const cp = require('child_process')
const test = require('tape')
const path = require('path')

test('uncaught', (t) => {
  t.plan(2)
  const ucp = path.resolve(__dirname, 'uncaught-1.js')
  const r = cp.spawn('node', [ucp])
  let errMsg = ''
  r.stderr.on('data', (err) => { errMsg += err.toString() })
  r.on('exit', (code) => {
    t.ok(errMsg.match(/apples/), 'error logged')
    t.equals(code, 1, 'exit code 1')
    t.end()
  })
})

test('unhandled-1', (t) => {
  t.plan(2)
  const uhp = path.resolve(__dirname, 'unhandled-1.js')
  const r = cp.spawn('node', [uhp])
  let errMsg = ''
  r.stderr.on('data', (err) => { errMsg += err.toString() })
  r.on('exit', (code) => {
    t.ok(errMsg.match(/bananas/), 'error logged')
    t.equals(code, 1, 'exit code 1')
    t.end()
  })
})

test('unhandled-2, invalid errrr', (t) => {
  t.plan(3)
  const uhp = path.resolve(__dirname, 'unhandled-2.js')
  const r = cp.spawn('node', [uhp])
  let errMsg = ''
  r.stderr.on('data', (err) => { errMsg += err.toString() })
  r.on('exit', (code) => {
    t.ok(errMsg.match(/warning/), 'empty error warning')
    t.ok(errMsg.match(/empty/), 'empty stubbed in automatically')
    t.equals(code, 1, 'exit code 1')
    t.end()
  })
})

test('unhandled-3, validate stacktrace', (t) => {
  t.plan(2)
  const uhp = path.resolve(__dirname, 'unhandled-3.js')
  const r = cp.spawn('node', [uhp])
  let errMsg = ''
  r.stderr.on('data', (err) => { errMsg += err.toString() })
  r.on('exit', (code) => {
    t.ok(errMsg.match(/unhandled3Function/), 'stacktrace found')
    t.equals(code, 1, 'exit code 1')
    t.end()
  })
})

test('unhandled-4, validate _no_ stacktrace', (t) => {
  t.plan(2)
  const uhp = path.resolve(__dirname, 'unhandled-4.js')
  const r = cp.spawn('node', [uhp])
  let errMsg = ''
  r.stderr.on('data', (err) => { errMsg += err.toString() })
  r.on('exit', (code) => {
    t.notOk(errMsg.match(/unhandled4Function/), 'stacktrace not found')
    t.equals(code, 1, 'exit code 1')
    t.end()
  })
})

test('unhandled-5, adds message when stacktrace does not include it', (t) => {
  t.plan(3)
  const uhp = path.resolve(__dirname, 'unhandled-5.js')
  const r = cp.spawn('node', [uhp])
  let errMsg = ''
  r.stderr.on('data', (err) => { errMsg += err.toString() })
  r.on('exit', (code) => {
    t.ok(errMsg.match(/unhandled-5-message-logged/), 'messaged logged in stacktrace mode')
    t.ok(errMsg.match(/bogus/), 'stacktrace logged in stacktrace mode')
    t.equals(code, 1, 'exit code 1')
    t.end()
  })
})
