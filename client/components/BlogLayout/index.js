import React, { Component } from 'react'
import { Layout } from 'antd'
import { observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'
import style from './style.css'

const { Footer, Content } = Layout

@observer
class BlogLayout extends Component {
  render() {
    const { route } = this.props

    return (
      <Layout hasSider={false} className={style.appWrapper}>
        <Content className={style.appContent}>{renderRoutes(route.routes)}</Content>
        <Footer className={style.appFooter}>Footer</Footer>
      </Layout>
    )
  }
}

export default BlogLayout
