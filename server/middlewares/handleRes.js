async function handleRes(ctx, next) {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET')
  ctx.set('Access-Control-Allow-Credentials', true)

  if (ctx.body) {
    const { data, code, message } = ctx.body

    if (code !== 200 && code !== undefined) {
      ctx.body = {
        code,
        data: null,
        message
      }
    } else {
      ctx.body = {
        code: 200,
        data,
        message: message || 'success'
      }
    }
  }
  await next()
}

export default handleRes
