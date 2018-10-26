import React, { Component } from 'react'
import { Layout, Icon, Card, Progress, Row, Col, List, Timeline, Tag } from 'antd'
import { observer, inject } from 'mobx-react'
import style from './resume.style.css'
import SetStaticContext from 'components/SetStaticContext'

const { Content } = Layout
const TimelineItem = Timeline.Item
const ListItem = List.Item

@inject('userStore')
@observer
export default class ResumePage extends Component {
  // 服务器端渲染需要的静态方法
  /**
   * 本页的seo
   */
  static seoInfo = {
    title: '雷登来的简历',
    description: '雷登来的简历，高级前端开发工程师、前端架构。5年前端开发经验，其中2年js游戏开发，3年电商开发。'
  }
  /**
   * 初始化之前需要加载的数据
   * @param {Store} options.stores mobx的store
   */
  static onEnter({ stores }) {
    return Promise.all([stores.userStore.fetchUserData()])
  }

  constructor(props) {
    super(props)

    // 获取我的信息
    if (!props.userStore.username) {
      props.userStore.fetchUserData()
    }
  }

  render() {
    const { userStore } = this.props
    const { userData } = userStore

    return (
      <SetStaticContext code={200} seoInfo={ResumePage.seoInfo} onEnter={ResumePage.onEnter}>
        <Layout className={style.mainWrap}>
          <Content className={style.contentWrap}>
            <Row>
              <Col sm={24} md={8} xl={7}>
                <div className={style.siderTop}>
                  <div className={style.siderTopAvatar}>
                    <img width="46" height="46" style={inlineStyle.img} alt="头像" src={userData.avatar} />
                  </div>
                  <h2>{`${userStore.username}的简历`}</h2>
                  <p>{userData.slogan}</p>
                </div>

                <div>
                  <Card
                    style={inlineStyle.card}
                    bordered={false}
                    title={
                      <div>
                        <Icon type="user" theme="outlined" />
                        <span className={style.siderTitle}>Basic info. 基本信息</span>
                      </div>
                    }>
                    <div className={style.contentList}>
                      <Row>
                        <Col span={7}>个人信息：</Col>
                        <Col span={17}>
                          {userStore.username} / {userStore.age}岁 / {userStore.workYears}
                          年工作经验 / {userData.education}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={7}>职位：</Col>
                        <Col span={17}>
                          {userData.company} / {userData.position}
                        </Col>
                      </Row>
                      {userData.socialList &&
                        userData.socialList.map((item, key) =>
                          <Row key={key}>
                            <Col span={7}>{item.platform}：</Col>
                            <Col span={17}>
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                {item.title}
                              </a>
                            </Col>
                          </Row>)}
                    </div>
                  </Card>
                  <Card
                    style={inlineStyle.card}
                    bordered={false}
                    title={
                      <div>
                        <Icon type="phone" theme="outlined" />
                        <span className={style.siderTitle}>Contact. 联系方式</span>
                      </div>
                    }>
                    <div className={style.contentList}>
                      <Row>
                        <Col span={7}>Email: </Col>
                        <Col span={17}>
                          <a href={`mailto:${userData.email}`}>{userData.email}</a>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={7}>手机/微信: </Col>
                        <Col span={17}>{userData.phone}</Col>
                      </Row>
                    </div>
                  </Card>
                  <Card
                    style={inlineStyle.card}
                    bordered={false}
                    title={
                      <div>
                        <Icon type="like" theme="outlined" />
                        <span className={style.siderTitle}>Application. 期望工作</span>
                      </div>
                    }>
                    <div className={style.contentList}>
                      <Row>
                        {userData.expectedWork &&
                          <Col>
                            {userData.expectedWork.position} / {userData.expectedWork.city} / {userData.expectedWork.salary}
                            k+
                          </Col>
                        }
                      </Row>
                    </div>
                  </Card>
                  <Card
                    style={inlineStyle.card}
                    bordered={false}
                    title={
                      <div>
                        <Icon type="thunderbolt" theme="outlined" />
                        <span className={style.siderTitle}>Tech. 个人能力</span>
                      </div>
                    }>
                    <div className={style.siderContentList}>
                      {userData.techList &&
                        userData.techList.map((item, key) =>
                          <Row key={key} className={style.siderContentLi}>
                            <Col span={10}>{item.skill}</Col>
                            <Col span={14}>
                              <Progress percent={item.score} showInfo={false} />
                            </Col>
                          </Row>)}
                    </div>
                  </Card>
                </div>
              </Col>
              <Col sm={24} md={16} xl={17}>
                <Card
                  style={inlineStyle.card}
                  bordered={false}
                  title={
                    <div>
                      <Icon type="double-right" theme="outlined" />
                      <span className={style.siderTitle}>Skill. 主要技能</span>
                    </div>
                  }>
                  <List
                    split={false}
                    size="small"
                    dataSource={userData.skillList}
                    renderItem={item =>
                      <ListItem>
                        <li>{item}</li>
                      </ListItem>
                    }
                  />
                </Card>
                <Card
                  style={inlineStyle.card}
                  bordered={false}
                  title={
                    <div>
                      <Icon type="double-right" theme="outlined" />
                      <span className={style.siderTitle}>Company. 工作经历</span>
                    </div>
                  }>
                  <Timeline>
                    {userData.workList &&
                      userData.workList.map((item, key) =>
                        <TimelineItem key={key}>
                          <Row className={style.timelineHeader}>
                            <Col xs={24} sm={16} className={style.companyInfo}>
                              <div className={style.companyLogo}>
                                <img width="46" height="46" style={inlineStyle.img} src={item.logo} alt="公司Logo" />
                              </div>
                              <div className={style.infoName}>
                                <h4>
                                  {item.company} / {item.team}
                                </h4>
                                <p>{item.position}</p>
                              </div>
                            </Col>
                            <Col xs={24} sm={8} className={style.companyDate}>
                              <span>{item.period}</span>
                            </Col>
                          </Row>
                          <div className={style.timelineTag}>
                            {item.tag.map((text, key) =>
                              <Tag style={inlineStyle.tag} key={key}>
                                {text}
                              </Tag>)}
                          </div>
                          <div className={style.timelineContent}>
                            <p dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        </TimelineItem>)}
                  </Timeline>
                </Card>
                <Card
                  style={inlineStyle.card}
                  bordered={false}
                  title={
                    <div>
                      <Icon type="double-right" theme="outlined" />
                      <span className={style.siderTitle}>Project. 项目经历</span>
                    </div>
                  }>
                  <Timeline>
                    {userData.projectList &&
                      userData.projectList.map((item, key) =>
                        <TimelineItem key={key}>
                          <Row className={style.timelineHeader}>
                            <Col xs={24} sm={16} className={style.companyInfo}>
                              <h4>{item.name}</h4>
                            </Col>
                            <Col xs={24} sm={8} className={style.companyDate}>
                              <span>{item.period}</span>
                            </Col>
                          </Row>
                          <div className={style.timelineTag}>
                            {item.tag.map((text, key) =>
                              <Tag style={inlineStyle.tag} key={key}>
                                {text}
                              </Tag>)}
                          </div>
                          <div className={style.timelineContent}>
                            <div dangerouslySetInnerHTML={{ __html: item.description }} className={style.expListContent} />
                          </div>
                        </TimelineItem>)}
                  </Timeline>
                </Card>
                <Card
                  style={inlineStyle.card}
                  bordered={false}
                  title={
                    <div>
                      <Icon type="double-right" theme="outlined" />
                      <span className={style.siderTitle}>University. 教育经历</span>
                    </div>
                  }>
                  <Timeline>
                    {userData.schoolList &&
                      userData.schoolList.map((item, key) =>
                        <TimelineItem key={key}>
                          <Row className={style.timelineHeader}>
                            <Col xs={24} sm={16} className={style.companyInfo}>
                              <div className={style.companyLogo}>
                                <img width="46" height="46" style={inlineStyle.img} src={item.logo} alt="学校Logo" />
                              </div>
                              <div className={style.infoName}>
                                <h4>{item.name}</h4>
                                <p>{item.position}</p>
                              </div>
                            </Col>
                            <Col xs={24} sm={8} className={style.companyDate}>
                              <span>{item.period}</span>
                            </Col>
                          </Row>
                        </TimelineItem>)}
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </SetStaticContext>
    )
  }
}

const inlineStyle = {
  card: { backgroundColor: 'transparent', marginBottom: 24 },
  img: { width: '100%', height: '100%' },
  tag: { border: '1px solid #EAEDEC', borderRadius: 100, color: '#999' }
}
