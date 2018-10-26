import requestData from 'utils/requestData'

/**
 * 对应后端API
 */
class Service {
  /**
   * 获取用户数据
   * @return {Promise}
   */
  fetchServUserData() {
    return requestData({
      method: 'get',
      api: '/user/info'
    })
  }
}

// 实例化后再导出
export default new Service()
