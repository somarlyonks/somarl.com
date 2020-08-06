'use strict'

if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

Object.assign = require('object-assign')

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
if (process.env.NODE_ENV === 'test') require('raf').polyfill(global)

// custom polyfill
// last element of the array
Reflect.defineProperty(Array.prototype, -1, {
  get: function () {
    return this.length ? this[this.length - 1] : undefined
  }
})
