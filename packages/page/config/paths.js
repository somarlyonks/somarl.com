'use strict'

const path = require('path')
const fs = require('fs')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const appPackageJson = resolveApp('package.json')

const moduleFileExtensions = [
  'mjs',
  'js',
  'ts',
  'tsx',
  'json',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  )

  if (extension) return resolveFn(`${filePath}.${extension}`)

  return resolveFn(`${filePath}.js`)
}

const appTsConfig = resolveApp(process.env.NODE_ENV === 'development' ? 'tsconfig.json' : 'tsconfig.prod.json')

module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson,
  appSrc: resolveApp('src'),
  appScss: resolveApp('src/scss/index.scss'),
  appScssEnv: resolveApp('src/scss/_env.scss'),
  appCss: resolveApp('src/css/index.css'),
  appStoryScss: resolveApp('src/stories/scss/index.scss'),
  appStoryCss: resolveApp('src/story-css/index.css'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  appTsConfig,
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath: getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    require(appPackageJson).homepage,
    process.env.PUBLIC_URL
  ),
  moduleFileExtensions,
}
