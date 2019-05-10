'use strict'

// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process () {
    return 'module.exports = {};'
  },
  getCacheKey () {
    // The output is always the same.
    return 'cssTransform'
  },
}
