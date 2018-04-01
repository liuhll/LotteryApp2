'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://api.clmeng.com/dev"',
  APP_VERSION: '100',
  VERSIONNAME: '"v1.0.0"',
  PLATFORM: '1'
})
