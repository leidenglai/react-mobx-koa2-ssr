import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { useStaticRendering } from 'mobx-react'
import { Provider } from 'mobx-react'
import routes from '../../client/routes'
import { createServerState as stores } from '../../client/stores'
import serialize from 'serialize-javascript'

// 避免mobx服务端渲染的内存泄漏问题
useStaticRendering(true)
/**
 * useful on the server for preloading data
 * @param {Object} location
 */
// const loadBranchData = location => {
//   const branch = matchRoutes(Routes, location.pathname)

//   const promises = branch.map(({ route, match }) => route.loadData ? route.loadData(match) : Promise.resolve(null))

//   return Promise.all(promises)
// }

async function clientRoute(ctx, next) {
  const routerContext = {
    status: 200,
    seoInfo: { title: '', keywords: '', description: '' }
  }

  let branch

  try {
    branch = matchRoutes(routes, ctx.url)
    console.log('预加载数据:', ctx.url)
  } catch (err) {
    return next()
  }

  const promises = branch.map(({ route, match }) => {
    const { component } = route
    const { params, path } = match

    return component.onEnter ? component.onEnter({ params, path, stores }) : Promise.resolve(null)
  })

  try {
    await Promise.all(promises)
    console.log('预加载数据完成')
  } catch (err) {
    console.log('预加载数据失败：', err)

    await next()
  }

  const Root = renderToString(
    <div className="container-wrapper">
      <Provider {...stores}>
        <StaticRouter location={ctx.url} context={routerContext}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    </div>
  )

  // 判断状态
  if (typeof routerContext.status !== 'undefined') {
    if (routerContext.status == 404) {
      await next()
    } else {
      await ctx.render('index', {
        root: Root,
        stores: serialize(stores, { isJSON: true }),
        title: routerContext.seoInfo.title,
        description: routerContext.seoInfo.description
      })
    }
  }
}

export default clientRoute
