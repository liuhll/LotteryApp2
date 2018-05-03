'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://localhost:1459"',
    APP_VERSION: '100',
    VERSIONNAME: '"v1.0.0-bate"',
    PLATFORM: '1'
})