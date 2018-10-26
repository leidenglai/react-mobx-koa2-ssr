/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
import { formatDate } from '../common/tools'

export default function(schema) {
  schema.methods.createAtAgo = function() {
    return formatDate(this.createAt, true)
  }

  schema.methods.updateAtAgo = function() {
    return formatDate(this.updateAt, true)
  }
}
