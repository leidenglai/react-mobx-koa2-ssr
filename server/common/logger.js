import config from '../config'
import path from 'path'
import log4js from 'log4js'

const env = process.env.NODE_ENV || 'development'

log4js.configure({
  appenders: { cheese: { type: 'file', filename: path.join(config.logDir, 'cheese.log') }},
  categories: { default: { appenders: ['cheese'], level: config.debug && env !== 'test' ? 'DEBUG' : 'ERROR' }}
})

const logger = log4js.getLogger('cheese')

export default logger
