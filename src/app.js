/* 入口启动文件 */
import React from 'react'
import ReactDOM from 'react-dom'

import { ResumePage } from './containers/resume'

/* global __DEV__ */
if (__DEV__) {
  console.info('[当前环境] 开发环境')
}

/* global __PROD__ */
if (__PROD__) {
  console.info('[当前环境] 生产环境')
}

const App = () =>
  <div className="container-wrapper">
    <ResumePage />
  </div>

// ================================
// 将根组件挂载到 DOM，启动！
// ================================
ReactDOM.hydrate(<App />, document.getElementById('app'))
