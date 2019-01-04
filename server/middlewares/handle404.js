async function handle404(ctx, next) {
  if (ctx.status === 404) {
    if (/^\/api\/|^\/static\//.test(ctx.url)) {
      next()
    } else {
      ctx.redirect('/home')
      ctx.status = 301
    }
  } else {
    next()
  }
}

export default handle404
