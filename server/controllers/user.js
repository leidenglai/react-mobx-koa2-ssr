import * as proxyUser from '../proxy/user'

export function getUserData(ctx, next) {
  return proxyUser.getUserData().then(userData => {
    ctx.body = { data: userData }

    next()
  })
}
