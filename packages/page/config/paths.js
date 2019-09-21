'use strict'

const path = require('path')
const fs = require('fs')
const url = require('url')

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

function ensureSlash (path, needsSlash) {
  const hasSlash = path.endsWith('/')
  if (hasSlash && !needsSlash) return path.substr(path, path.length - 1)
  if (!hasSlash && needsSlash) return `${path}/` // lgtm [js/trivial-conditional]
  return path
}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage

function getServedPath (appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appScss: resolveApp('src/scss/index.scss'),
  appScssEnv: resolveApp('src/scss/_env.scss'),
  appCss: resolveApp('src/css/index.css'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.ts'),
  appNodeModules: resolveApp('node_modules'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsProdConfig: resolveApp('tsconfig.prod.json'),
  appTsLint: resolveApp('tslint.json'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
}
