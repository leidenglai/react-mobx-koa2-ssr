import { User } from '../models'

/**
 * 获取用户信息
 */
export async function getUserData() {
  const user = await User.findOne({ uid: 1 }, { uid: 0, _id: 0, __v: 0 }, { lean: true }).exec()

  return user
}
