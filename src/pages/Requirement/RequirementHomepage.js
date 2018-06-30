import { Button } from 'antd'
import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer'
import { getNearbySKill } from '../../service/requirement'
import { view as ServicePersonCard } from './ServicePersonCard'
import './static/style/homepage.less'

class RequirementHomePage extends Component {

  state = {
    servicePersonList: [],
    totalCount: '',
  }
  getNearBySkill = async () => {
    const { data: { data, pageinfo } } = await getNearbySKill({
      serviceId: 10,
      userId: 22,
    })
    if (data) {
      console.log(data)
      this.setState({
        servicePersonList: data,
        totalCount: pageinfo.totalCount,
      })
    }
  }

  render () {
    return (
      <div className="requirement-homepage-container">
        <main>
          <div className="top-background">
            <div className="top-content">
              <h1>仅需一分钟</h1>
              <h1>即可为您匹配专业的</h1>
              <h1>深度保洁 服务人员</h1>
              <div className="stroke-1">
                <img
                  src="./images/stroke-1.png"
                  alt="stroke"
                  width="176"
                  height="7"
                />
              </div>
              <div className="stroke-2">
                <img
                  src="./images/stroke-2.png"
                  alt="stroke"
                  width="131"
                  height="9.3"
                />
              </div>
              <Button type="primary">开始</Button>
              <div className="qa">
                <h3>如何解决您的问题？</h3>
                <div className="tip">
                  <div className="index-item">1</div>
                  <div className="tip-content">
                    <div className="title">回答需求问卷</div>
                    <div>耗时1min左右，需要您简单选择几个问题，以便于服务人员清楚您的需要</div>
                  </div>
                </div>
                <div className="tip">
                  <div className="index-item">2</div>
                  <div className="tip-content">
                    <div className="title">服务人员报价</div>
                    <div>服务人员将根据您的回答响应您的诉求，我们将推荐1位或者更多供您选择</div>
                  </div>
                </div>
                <div className="tip">
                  <div className="index-item">3</div>
                  <div className="tip-content">
                    <div className="title">线下享受服务</div>
                    <div>服务人员将上门为您服务，您可为服务的感受和满意程度打分</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-person-container">
            <h2>您附近有 { this.state.totalCount } 位深度保洁的服务人员</h2>
            <p>他们离您的当前位置较近，可迅速到达服务地点，响应您的诉求...</p>
            <div className="service-person-card-wrapper">
              {
                this.state.servicePersonList.map(({
                                                    hireTimes,
                                                    evaluateScore,
                                                    userBasicInfoVO,
                                                    userEvaluate,
                                                  }) =>
                  <ServicePersonCard
                    key={ userBasicInfoVO.userId }
                    nickname={ userBasicInfoVO.nickname }
                    hireTimes={ hireTimes }
                    evaluateCount={ evaluateScore.count }
                    evaluateScore={ evaluateScore.ave }
                    joinedTime={ userBasicInfoVO.createTime }
                    avatarUrl={ userBasicInfoVO.avatar }
                    evaluation={ userEvaluate ? userEvaluate.content : '' }
                  />)
              }
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }

  componentDidMount () {
    this.getNearBySkill()
  }

}

export { RequirementHomePage as page }