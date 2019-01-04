// import { Seo } from '../models'
import seoJson from '../data/seo.json'
import _ from 'lodash'

/**
 * 获取用户信息
 * @param {string} url 当前请求的路径
 *
 * @return {Object} seoInfo 页面的seo信息
 */
export async function getSeoInfo(url) {
  // const seoInfo = await Seo.findOne({ url }, { _id: 0, __v: 0 }, { lean: true }).exec()
  // 暂用json代替数据库
  const seoInfo = _.find(seoJson, { url })

  return seoInfo
}
