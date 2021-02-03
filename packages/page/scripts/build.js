'use strict'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const chalk = require('chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config/webpack.config.prod')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) process.exit(1)


measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    fs.emptyDirSync(paths.appBuild)
    copyPublicFolder()
    return build(previousFileSizes)
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'))
        console.log(warnings.join('\n\n'))
        console.log(`Search for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`)
        console.log(`To ignore, add ${chalk.cyan('// tslint:disable-next-line')} to the line before.\n`)
      } else {
        console.log(chalk.green('Compiled successfully.\n'))
      }

      console.log('File sizes after gzip:\n')
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      )
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'))
      printBuildError(err)
      process.exit(1)
    }
  )

function build (previousFileSizes) {
  console.log('Creating an optimized production build...')

  const compiler = webpack(config('production'))
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err)

      const rawMessages = stats.toJson({}, true)
      const messages = formatWebpackMessages({
        errors: rawMessages.errors.map((e) => e.message),
        warnings: rawMessages.warnings.map((e) => e.message),
      })
      if (messages.errors.length) {
        // Only keep the first error
        messages.errors.length = 1
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        return reject(new Error(messages.warnings.join('\n\n')))
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      })
    })
  })
}

function copyPublicFolder () {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  })
}
