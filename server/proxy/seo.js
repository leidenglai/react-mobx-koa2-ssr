import { Seo } from '../models'

/**
 * 获取用户信息
 * @param {string} url 当前请求的路径
 *
 * @return {Object} seoInfo 页面的seo信息
 */
export async function getSeoInfo(url) {
  const seoInfo = await Seo.findOne({ url }, { _id: 0, __v: 0 }, { lean: true }).exec()

  return seoInfo
}
