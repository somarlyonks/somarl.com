'use strict'

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.publicUrlOrPath
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1)
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)

const entries = {
  webpackDevClient: require.resolve('react-dev-utils/webpackHotDevClient'),
  polyfills: require.resolve('./polyfills'),
}

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'
  const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile')

  const getStyleLoaders = cssOptions => {
    return [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in `static/css`, use '../../' to locate index.html folder
        // in production `paths.publicUrlOrPath` can be a relative path
        options: paths.publicUrlOrPath.startsWith('.')
          ? {publicPath: '../../'}
          : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [
              ['postcss-flexbugs-fixes'],
              [
                'autoprefixer',
                {
                  flexbox: 'no-2009',
                },
              ],
            ],
          },
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean)
  }

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap && 'source-map'
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: isEnvDevelopment
      ? [entries.polyfills, entries.webpackDevClient, paths.appIndexJs]
      : [entries.polyfills, paths.appIndexJs],
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      publicPath,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[chunkhash:8].js'
        : 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[chunkhash:8].chunk.js'
        : 'static/js/[name].chunk.js',
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
        : info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      globalObject: 'this',
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
            sourceMap: shouldUseSourceMap,
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {inline: false, annotation: true}
              : false,
          },
          cssProcessorPluginOptions: {
            preset: ['default', {minifyFontValues: {removeQuotes: false}}],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat(
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
      alias: {
        'react-native': 'react-native-web',
      },
      plugins: [
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        new TsconfigPathsPlugin({configFile: paths.appTsConfig}),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {parser: {requireEnsure: false}},
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
                compact: isEnvProduction,
              },
            },
            {
              test: /\.(ts|tsx)$/,
              include: paths.appSrc,
              use: [
                {
                  loader: require.resolve('ts-loader'),
                  options: {
                    transpileOnly: true,
                    configFile: paths.appTsConfig,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              sideEffects: true,
            },
            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      // In production, it will be an empty string unless you specify "homepage"
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new HtmlWebpackPlugin(Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
        },
        isEnvProduction
          ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
          : undefined
      )),
      // It is absolutely essential that NODE_ENV was set to production here for speed.
      new webpack.DefinePlugin(env.stringified), // lgtm [js/build-artifact-leak]
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => ({
          files: files.reduce((manifest, file) => Object.assign(manifest, {
            [file.name]: file.path
          }), seed),
          entrypoints: entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          ),
        }),
      }),
      // Generate a service worker script that will precache, and keep up to date,
      isEnvProduction && fs.existsSync(paths.swSrc) && new WorkboxWebpackPlugin.InjectManifest({
        swSrc: paths.swSrc,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // Perform type checking and linting in a separate process to speed up compilation
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: paths.appTsConfig,
          build: true,
        },
      }),
    ].filter(Boolean),
    node: false,
    performance: false,
  }
}
