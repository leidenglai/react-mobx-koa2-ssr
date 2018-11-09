# # React SSR 的简单模板

## Koa2 + React + Mobx + Webpack4 + antd

## 项目简介

此项目采用后端 nodejs koa2 框架渲染 react + mobx 的项目 demo，主要实现如下功能：

1. react + antd 实现 UI 界面
2. mobx 管理数据
3. API 服务器，koa2+mongoDB
4. SSR(前后端同构)，后端渲染时预加载数据
5. 简单的 SEO 功能

## 本地开发

1. 安装依赖：`npm install`
2. 启动 MongoDB
3. 启动 node 开发环境：`npm run dev`
4. 构建生产环境版本：`npm run build`
5. 运行 node 生产环境：`npm run start`

现项目中有一个简历模版页，路由：http://127.0.0.1:3725/resume 目录：/client/containers/resume/，可以做后端数据预加载的参考。

## 目录结构

- /build // 项目构建，webpack 配置目录
- /client // 客户端代码
- /server // 服务器端代码
- /static // 不需要处理的静态文件，前后端都使用
- /views // index.tpl.html 模版文件目录
- ...

## 参考项目

- [GitHub - leidenglai/React-Koa2-SSR: React+Nodejs 同构项目 demo](https://github.com/leidenglai/React-Koa2-SSR)
- [react-koa-mobx-server-side-render](https://github.com/undefinedZNN/react-koa-mobx-server-side-render)
- [React Router V4 中文文档](https://github.com/react-translate-team/react-router-CN)
- [React + MobX TodoMVC Example](https://github.com/mobxjs/mobx-react-todomvc)
- [React Isomorphic Boilerplate](https://github.com/chikara-chan/react-isomorphic-boilerplate)

## 项目入口

进入项目根目录打开 package.json 文件，它定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。npm install 命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。
根据 scripts 属性下面的配置，我们可以看到项目有 4 个入口：

- start:front：只启动前端开发环境
- dev：启动服务器开发，也是本项目的主要启动方式
- start：启动项目生产环境，启动之前需要先构建项目生产环境代码
- test：启动项目测试

_开发入口 dev_
命令：`cross-env NODE_ENV=development nodemon --legacy-watch ./server/server.dev.js --watch server --watch build`

cross-env NODE_ENV=development
设置环境变量为 NODE_ENV development，cross-env 命令兼容 window

nodemon --legacy-watch ./server/server.dev.js --watch server --watch build
使用 nodemon 启动开发环境 同时实时监听代码变化，用于热更新，项目开发环境入口文件 `./server/server.dev.js`

_server.dev.js_
重要的几个点：

1. `require('babel-polyfill')` 他会仿效一个完整的 ES2015+ 环境
2. 配置 babel 运行环境，配置基本和 `.babelrc` 文件一样

```javascript
const babelRegister = require('@babel/register')

// Javascript require hook
babelRegister({
  // ....
})
```

3. webpack 以及热更新配置

## 开发时遇到的坑

- 依赖包：因为 node 环境是没有浏览器环境下的 window 等全局对象，所以很多依赖包需要找前后端通用版本如：fetch 要使用 isomorphic-fetch
- 打包：打包时使用 webpack，webpack 的有些插件也仅支持打包浏览器环境，如 style-loader 在打包服务器版本时，需要替换成 node-style-loader
- React-router v4 和 v3 版本差别很大，设计思路都发生改变，需要重新学习
- 后端渲染预请求数据需要注意 store 上下文、作用域问题、异步请求

## TODO

1. 还未配置如何构建生产代码
2. 动态参数的路由页面还没有试过，后续加入 博客详情页
