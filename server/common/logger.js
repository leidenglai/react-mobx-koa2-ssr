const config = require('../config')
const pathLib = require('path')
const env = process.env.NODE_ENV || 'development'
const log4js = require('log4js')

log4js.configure({
  appenders: { cheese: { type: 'file', filename: pathLib.join(config.logDir, 'cheese.log') }},
  categories: { default: { appenders: ['cheese'], level: config.debug && env !== 'test' ? 'DEBUG' : 'ERROR' }}
})

const logger = log4js.getLogger('cheese')

module.exports = logger
