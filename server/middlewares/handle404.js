async function handle404(ctx, next) {
  // if (ctx.status === 404) {
  //   ctx.redirect('/')
  //   ctx.status = 301
  // } else {
  //   next()
  // }
  // console.log(ctx)

  next()
}

export default handle404
