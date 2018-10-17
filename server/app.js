import Koa from 'koa'
import logger from 'koa-logger'
import session from 'koa-session'
import compress from 'koa-compress'
import convert from 'koa-convert'

const app = new Koa()

app.keys = ['this is my secret']
app.use(convert(session(app)))
app.use(compress())
app.use(logger())

export default app
