import React from 'react'
import { Route } from 'react-router-dom'

/**
 * 设置服务端渲染能在context获取面状态及seo信息
 * @param  {Object} options          组件Props
 * @param  {Number} options.code     页面状态吗
 * @param  {Component} options.children 子组件
 * @param  {Object} options.seoInfo  seo参数
 */
const SetStaticContext = ({ code, children, seoInfo }) =>
  <Route
    render={({ staticContext }) => {
      seoInfo = { title: '', keywords: '', description: '', ...seoInfo }

      if (staticContext) {
        staticContext.status = code ? code : 200
        staticContext.seoInfo = seoInfo
      }

      if (typeof window !== 'undefined') {
        // 在浏览器环境下却换页面时修改文档title, 达到与服务器一样的渲染结果
        document.title = seoInfo.title
      }

      return children
    }}
  />

export default SetStaticContext
