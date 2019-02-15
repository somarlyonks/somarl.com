'use strict'

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

require('whatwg-fetch')

Object.assign = require('object-assign')

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global)
}

// custom polyfill
// last element of the array
Reflect.defineProperty(Array.prototype, -1, {
  get () {
    return this.length ? this[this.length - 1] : undefined
  }
})
