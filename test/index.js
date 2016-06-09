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
