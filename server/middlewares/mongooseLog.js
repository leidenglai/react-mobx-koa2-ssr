import mongoose from 'mongoose'
import logger from '../common/logger'
import config from '../config'

if (config.debug) {
  let traceMQuery = function(method, info, query) {
    return function(err, result, millis) {
      if (err) {
        logger.error('traceMQuery error:', err)
      }
      let infos = []

      infos.push(query._collection.collection.name + '.' + method.blue)
      infos.push(JSON.stringify(info))
      infos.push((millis + 'ms').green)

      logger.debug('MONGO'.magenta, infos.join(' '))
    }
  }

  mongoose.Mongoose.prototype.mquery.setGlobalTraceFunction(traceMQuery)
}
