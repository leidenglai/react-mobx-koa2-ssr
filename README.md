# # React 版本的简历模板

## Koa2 + React + Webpack4 + antd

线上 react 版本 [leidenglai.com](https://www.leidenglai.com)
线上 node 版本 [leiresume.com](https://www.leiresume.com)

## 项目简介

此项目采用后端 nodejs koa 框架渲染 react 的简单项目 demo，只保留了 react，未加入数据管理框架如：redux，mobx；也未加入前端路由管理功能

如果想参考完全版本项目 demo：[GitHub - leidenglai/React-Koa2-SSR: React+Nodejs 同构项目 demo](https://github.com/leidenglai/React-Koa2-SSR)
包含了完整前后端同构项目基本框架：
koa 框架、前后端路由处理、数据管理 redux、MongoDB、Redis、token 认证等

## 本地开发

1. 安装依赖：`npm install`
2. 启动 node 开发环境：`npm run dev`
3. 构建生产环境版本：`npm run build`
4. 运行 node 生产环境：`npm run start`

## 开发时遇到的坑

- 依赖包：因为 node 环境是没有浏览器环境下的 window 等全局对象，所以很多依赖包需要找前后端通用版本如：fetch 要使用 isomorphic-fetch
- 打包：打包时使用 webpack，webpack 的有些插件也仅支持打包浏览器环境，如 style-loader 在打包服务器版本时，需要替换成 node-style-loader
