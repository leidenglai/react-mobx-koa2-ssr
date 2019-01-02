import React, { Component } from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
// import style from './bloglist.style.css'
import SetStaticContext from 'components/SetStaticContext'

@inject('blogStore')
@observer
export default class BlogList extends Component {
  // 服务器端渲染需要的静态方法
  /**
   * 本页的seo
   */
  static seoInfo = {
    title: 'Blog列表',
    description: '雷登来的博客，JavaScript开发心得记录。'
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SetStaticContext code={200} seoInfo={BlogList.seoInfo}>
        <h1>Blog List Demo Page</h1>
        <Link to={'/resume'}>我的简历</Link>
        <div>
          <Button type="primary">aaaa</Button>
        </div>
      </SetStaticContext>
    )
  }
}
