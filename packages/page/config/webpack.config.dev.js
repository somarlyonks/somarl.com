'use strict'

const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// Webpack uses `publicPath` to determine where the app is being served from.
const publicPath = '/'
const publicUrl = ''

const env = getClientEnvironment(publicUrl)

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: [
      '.mjs',
      '.ts',
      '.tsx',
      '.js',
      '.json',
      '.jsx',
    ],
    alias: {
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      new TsconfigPathsPlugin({ configFile: paths.appTsConfig }),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
          },

          // Compile .tsx?
          {
            test: /\.(ts|tsx)$/,
            include: paths.appSrc,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Perform type checking and linting in a separate process to speed up compilation
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
}
