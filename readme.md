# perish

[![Codeship Status for cdaringe/perish](https://codeship.com/projects/4ce16a00-107f-0134-12ce-2a42c1ba701a/status?branch=master)](https://codeship.com/projects/157001)
[![Coverage Status](https://coveralls.io/repos/github/cdaringe/perish/badge.svg?branch=master)](https://coveralls.io/github/cdaringe/perish?branch=master)
![](https://img.shields.io/badge/standardjs-%E2%9C%93-brightgreen.svg)
[![TypeScript package](https://img.shields.io/badge/language-typescript-blue.svg)](https://www.typescriptlang.org)

tiny module to log and exit on uncaughtException and unhandledRejection events

## install

`npm install --save(-dev) perish`

## usage

`require('perish')`

that's all.  in any nodejs file.

## what

listen for `uncaughtException` & `unhandledRejection` in node processes.  when those events occur, log the message and the stack, then exit with exit code `1`.

## why

because apps should die hard if their errors aren't handled.  some apps require graceful exit onerror.  sometimes this is feasible, sometimes this is not.  this package is simple and just exits.

## example
```js
// unhandled.js
Promise.reject(new Error('bananas'))
```

run `node unhandled.js` and ... nothing.

```js
// handled.js
require('perish')
Promise.reject(new Error('bananas'))
```

run `node handled.js` and:

```js
Error: bananas
    at Object.<anonymous> (/some/path/handled.js:2:16)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Function.Module.runMain (module.js:575:10)
    at startup (node.js:160:18)
    at node.js:456:3

```

nothin' too fancy!

## api

```js
const perish = require('perish')
perish.printStacktrace // default true. set to false to console.error error message only
perish.fail // @private. this is the error handler
```
