import Router from 'koa-router'
import { getUserData } from '../controllers/user'

const router = new Router({ prefix: '/user' })

router.get('/info', getUserData)

export default router
