import Router from 'koa-router'
import { getSeoInfo } from '../controllers/seo'

const router = new Router({ prefix: '/seo' })

router.get('/info', getSeoInfo)

export default router
