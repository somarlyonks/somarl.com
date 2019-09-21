'use strict'

// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process: () => 'module.exports = {};',
  getCacheKey: () => 'cssTransform'
}
