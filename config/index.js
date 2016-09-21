/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config')
const argv = require('yargs').argv
const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const config = {
    env : process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base  : path.resolve(__dirname, '..'),

    // ----------------------------------
    // Server Configuration
    // ----------------------------------
    server_host : '0.0.0.0',
    server_port : process.env.PORT || 3000,

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_babel : {
        cacheDirectory : true,
        presets        : ['es2015', 'react', 'stage-0']
    },
    compiler_devtool         : 'source-map',
    compiler_hash_type       : 'hash',
    compiler_fail_on_warning : false,
    compiler_quiet           : false,
    compiler_public_path     : '/',
    compiler_stats           : {
        chunks : false,
        chunkModules : false,
        colors : true
    },
    compiler_vendors : [
        'react',
        'react-redux',
        'react-router',
        'redux'
    ],
}

config.dir_client = `${config.path_base}/client/src`;
config.dir_client_app = `${config.dir_client}/app`;
config.dir_dist = `${config.path_base}/dist`;
config.dir_test = `${config.path_base}/tests`;

/************************************************
 -------------------------------------------------
 All Internal Configuration Below
 Edit at Your Own Risk
 -------------------------------------------------
 ************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'development',
    '__PROD__'     : config.env === 'production',
    '__TEST__'     : config.env === 'test',
    '__COVERAGE__' : !argv.watch && config.env === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args)
}

config.utils_paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    client_app : base.bind(null, config.dir_client_app),
    dist   : base.bind(null, config.dir_dist)
}

config.server = {
  url: 'http://localhost',
  port: 9001
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments')
const overrides = environments[config.env]
if (overrides) {
    debug('Found overrides, applying to default configuration.')
    Object.assign(config, overrides(config))
} else {
    debug('No environment overrides found, defaults will be used.')
}

module.exports = config
