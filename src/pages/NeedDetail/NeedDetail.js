import { Button, Rate } from 'antd'
import React, { Component } from 'react'
import { view as NeedDetailItem } from './NeedDetailItem'
import './static/style/index.less'

export const classNameSpace = 'need-detail'

class NeedDetail extends Component {
  state = {
    pages: [
      [
        { content: '需要清洁的位置' },
        { content: [ '厨房过滤网', '厨房内部清洁' ] },
      ],
      [
        { content: '需要清洁的时间' },
        { content: [ '2018 年 5 月 26 日（周六）', '2018 年 5 月 30 日（周三）' ] },
      ],
      [
        { content: '需要清洁的地址' },
        { content: '北京市朝阳区阜通东大街天启大厦2308' },
      ],
      [
        { content: '特殊要求' },
        { content: '我的地毯有些年头了，上面有些油渍比较难清洗，麻烦多带一些强力清洗且不伤皮毛的洗衣液。地毯每周都要用吸尘器清扫一次，经常踩踏的地方需要更频繁的清扫。经常用吸尘器清扫可以防止砂粒聚积，从而延长地毯寿命，因为砂粒过多会磨断地毯纤维。每隔几星期，再多花些时间使用缝隙清扫工具对护壁板、暖气和其他不容易够到的地方进行清扫。' },
      ],
    ],
  }

  render () {
    const {
      pages,
    } = this.state
    return (
      <div className={ `${classNameSpace}-container` }>
        <main>
          <div className={ `${classNameSpace}-profile` }>
            <img
              src="http://p66yu2wkf.bkt.clouddn.com/21_avatar__avatar-2.jpg"
              alt="头像"
              width="50"
              height="50"
            />
            <div>
              <div className={ `${classNameSpace}-profile-name` }>
                rennaiqian
              </div>
              <div className={ `${classNameSpace}-rate-wrapper` }>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={ 4.5 }
                  character={ <i className="iconfont icon-rate-star-full"/> }
                />
                <p className="rate">{ 4.5 }</p>
                <p className="evaluation">（12条评价）</p>
              </div>
            </div>
          </div>
          <h2>Hi，我需要深度保洁服务，我的需求如下：</h2>
          {
            pages.map((page, index) => <NeedDetailItem data={ page } key={ index }/>)
          }
        </main>
        <footer>
          <div></div>
          <Button type="primary">立即报价</Button>
        </footer>
      </div>
    )
  }
}

export { NeedDetail as page }