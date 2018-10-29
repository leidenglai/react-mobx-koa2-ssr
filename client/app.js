/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'
// https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
import 'isomorphic-fetch'

import Root from 'client/root'

if (__DEV__) {
  console.info('[当前环境] 开发环境')
}

/* global __PROD__ */
if (__PROD__) {
  console.info('[当前环境] 生产环境')
}

// ================================
// 将根组件挂载到 DOM，启动！
// ================================
ReactDOM.hydrate(<Root />, document.getElementById('app'))
