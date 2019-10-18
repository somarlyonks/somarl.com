const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const paths = require('../config/paths')


module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.plugins = [
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    new TsconfigPathsPlugin({ configFile: paths.appTsConfig }),
  ]

  return config
}
