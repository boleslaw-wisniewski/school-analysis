const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../../config');
const path = require('path');
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __TEST__ = config.globals.__TEST__

debug('Creating configuration.', `dev: ${__DEV__}`, `test: ${__TEST__}`)
const webpackConfig = {
    name    : 'client',
    target  : 'web',
    devtool : config.compiler_devtool,
    resolve : {
      root       : paths.client(),
      extensions : ['', '.js', '.jsx', '.json'],
      alias: {
        styles: paths.client_app('styles'),
        modules: paths.client_app('modules')
      }
    },
    module : {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client_app('index.js');
const app = [APP_ENTRY];
if (__DEV__) {
  app.concat(`webpack-dev-server/client?http://${config.server_host}:${config.server_port}`); // WebpackDevServer host and port
  app.concat('webpack/hot/only-dev-server'); // "only" prevents reload on syntax errors)
}
webpackConfig.entry = {
    app,
    vendor : config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename   : `[name].[${config.compiler_hash_type}].js`,
    path       : paths.dist(),
    publicPath : config.compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
        template : paths.client('index.html'),
        hash     : false,
        favicon  : paths.client('assets/images/favicon/school-crossing-caution-152-189641.png'),
        filename : 'index.html',
        inject   : 'body',
        minify   : {
            collapseWhitespace : true
        }
    }),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
];
if (__DEV__) {
  debug('Enable plugins for live development (HMR).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}
if (!__TEST__ && !__DEV__) {
    debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
    webpackConfig.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                unused    : true,
                dead_code : true,
                warnings  : false
            }
        })
    )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin('vendor', `vendor.[${config.compiler_hash_type}].js`)
    )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
const preset_url = config.compiler_babel.presets.map(preset => `presets[]=${preset}`).join(',');
webpackConfig.module.loaders = [{
    test    : /\.(js)$/,
    exclude : /node_modules/,
    loader  : 'babel',
    query   : config.compiler_babel
  },
  {
    test    : /\.(jsx)$/,
    exclude : /node_modules/,
    loaders  : ['react-hot', `babel?${preset_url}`]
  },
  {
    test   : /\.json$/,
    loader : 'json'
}]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
    test    : /\.scss$/,
    exclude : null,
    loaders : [
        'style',
        BASE_CSS_LOADER,
        'postcss',
        'sass?sourceMap'
    ]
})
webpackConfig.module.loaders.push({
    test    : /\.css$/,
    exclude : null,
    loaders : [
        'style',
        BASE_CSS_LOADER,
        'postcss'
    ]
})

webpackConfig.sassLoader = {
    includePaths : paths.client_app('styles')
}

webpackConfig.postcss = [
    cssnano({
        autoprefixer : {
            add      : true,
            remove   : true,
            browsers : ['last 2 versions']
        },
        discardComments : {
            removeAll : true
        },
        discardUnused : false,
        mergeIdents   : false,
        reduceIdents  : false,
        safe          : true,
        sourcemap     : true
    })
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
    { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
    { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
    { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
    { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path, use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
    debug('Apply ExtractTextPlugin to CSS loaders.')
    webpackConfig.module.loaders
      .filter((loader) => loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0])))
      .forEach((loader) => {
        const first = loader.loaders[0]
        const rest = loader.loaders.slice(1)
        loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
        delete loader.loaders
      });

    webpackConfig.plugins.push(
        new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks : true
        })
    )
}
if (__DEV__) {
    webpackConfig.devServer = {
        port: config.server_port,
        host: config.server_host,
        proxy: {
          '/api/**': {
              target: `${config.server.url}:${config.server.port}`,
              secure: false,
          }
        },
        hot: true,
        stats: {
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: false,
            warnings: false,
            publicPath: false,
            colors: true
        }
    }
}

module.exports = webpackConfig;
