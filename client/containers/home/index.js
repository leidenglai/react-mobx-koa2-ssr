import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import style from './home.style.css'
import SetStaticContext from 'components/SetStaticContext'
import 'assets/animation.less'

export default class Home extends PureComponent {
  // 服务器端渲染需要的静态方法
  /**
   * 本页的seo
   */
  static seoInfo = {
    title: 'XiaoLei\'s Home',
    description: '雷登来的博客，JavaScript开发心得记录。'
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SetStaticContext code={200} seoInfo={Home.seoInfo}>
        <div className={style.container}>
          <div className={style.frame}>
            <div className={style.bg} />
            <div className={style.spider_man} />
          </div>
          <div className={style.overlay} />

          <main className={style.wrapper}>
            <div className={style.slogon_wrap}>
              <h1 className="glitch" data-text="XiaoLei & 雷登来">
                XiaoLei & 雷登来
              </h1>
              <p>Coder • Front-end Developer • Hello World!</p>
            </div>

            <nav className={style.share_wrap}>
              <ul>
                <li>
                  <a
                    className={style.link_item}
                    href="https://github.com/leidenglai"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Github">
                    <Icon type="github" />
                  </a>
                </li>
                <li>
                  <a
                    className={style.link_item}
                    href="https://www.zhihu.com/people/denglai/posts"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="知乎">
                    <Icon type="zhihu" />
                  </a>
                </li>
                {/* <li>
                  <Link className={style.link_item} title="在线简历" to="/resume" target="_blank" rel="noopener noreferrer">
                    <Icon type="file-text" />
                  </Link>
                </li> */}
                <li>
                  <a className={style.link_item} title="发送邮件" href="mailto:leidenglai@qq.com" target="_blank" rel="noopener noreferrer">
                    <Icon type="mail" />
                  </a>
                </li>
              </ul>
            </nav>
          </main>
          <footer className={style.footer}>©Lei Denglai. Designed by ajlkn.</footer>
        </div>
      </SetStaticContext>
    )
  }
}
