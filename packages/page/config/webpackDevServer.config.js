'use strict'

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const ignoredFiles = require('react-dev-utils/ignoredFiles')
const config = require('./webpack.config')('development')
const paths = require('./paths')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const PUBLIC_HOST = process.env.PUBLIC_HOST || false
const host = process.env.HOST || '0.0.0.0'

module.exports = function () {
  return {
    disableHostCheck: true,
    public: PUBLIC_HOST,
    host,
    https: protocol === 'https',
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath.slice(0, -1),
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    before (app) {
      app.use(errorOverlayMiddleware())
      // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
      // https://github.com/facebook/create-react-app/issues/8499#issuecomment-589561657
      app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath))
    },
  }
}
