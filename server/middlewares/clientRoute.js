import React from 'react'
import Router from 'koa-router'
import { renderToString } from 'react-dom/server'
import { ResumePage } from '../../client/containers/resume'

const router = new Router()

// 添加路由
router.get('/', async ctx => {
  const Root = renderToString(
    <div className="container-wrapper">
      <ResumePage />
    </div>
  )

  await ctx.render('index', {
    root: Root
  })
})

export default router
