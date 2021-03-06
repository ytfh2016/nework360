import { Badge, Button, Rate } from 'antd'
import React from 'react'
import { browserHistory } from 'react-router'
import { getRate } from '../../utils'

const classNameSpace = 'service-list-item'

const jumpToProfile = (userId) => () => {
  browserHistory.push({
    pathname: '/profile',
    state: {
      userId,
    },
  })
}

function ServiceListItem ({
                            score,
                            amount,
                            status,
                            userId,
                            nickname,
                            avatarUrl,
                            clueNumber,
                            scoreCount,
                            updateTime,
                            joinedTime,
                            quoteNumber,
                            showIMModal,
                            description,
                            serviceName,
                            badgeStatus,
                            amountFinal,
                            hasEvaluated,
                            selectedUser,
                            showDeleteModal,
                            jumpToNeedDetail,
                            showEvaluateModal,
                            cancelServiceOrder,
                            withdrawServiceOrder,
                            showInitiatePaymentModal,
                          }) {
  return (
    <div className={ `${classNameSpace}-container` }>
      <div className={ `${classNameSpace}-top-wrapper` }>
        <div className="info">
          <span className={ `${classNameSpace}-title` }>{ serviceName }</span><span
          className={ `${classNameSpace}-date` }> { updateTime }</span>
        </div>
        <div className={ `${classNameSpace}-operate` } onClick={ jumpToNeedDetail }>
          查看需求
        </div>
      </div>
      <div className={ `${classNameSpace}-content-wrapper` }>
        <div className='left'>
          <div className="left-avatar-wrapper">
            <Badge dot={ badgeStatus }>
              <img
                src={ avatarUrl || './images/headshot-default.png' }
                alt="头像"
                width="50"
                height="50"
                style={ {cursor: 'pointer'} }
                onClick={ jumpToProfile(userId) }
              />
            </Badge>
            <div onClick={ showIMModal } style={ {color: '#008bf7', cursor: 'pointer'} }
              className={ `${classNameSpace}-message-wrapper` }><i
              className="iconfont icon-message"/><span>在线沟通</span></div>
          </div>
          <div className="name">
            { nickname }
          </div>
          <div className="rate-wrapper">
            { score && <Rate
              allowHalf
              disabled
              defaultValue={ getRate(score) }
              character={ <i className="iconfont icon-rate-star-full"/> }
            /> }
            { score && <p className="rate">{ score }</p> }
            { score && <p className="evaluation">({ scoreCount }条评价)</p> }
          </div>
          <div className="date">
            已加入{ joinedTime }
          </div>
        </div>
        <div className='middle'>
          <div className="price">¥ { amount / 100 }</div>
          <div className="tip">我的报价金额</div>
          <p className="information">
            { description }
          </p>
        </div>
        {
          OperatePanel({
            status,
            amount,
            nickname,
            clueNumber,
            amountFinal,
            quoteNumber,
            hasEvaluated,
            selectedUser,
            showDeleteModal,
            showEvaluateModal,
            cancelServiceOrder,
            withdrawServiceOrder,
            showInitiatePaymentModal,
          })
        }
      </div>
    </div>
  )
}

const statusMap = {
  'quote': '还未选择',
  'bingo': '被选中',
  'error': '错误',
  'cancel': '已取消',
  'withdraw': '已撤回',
  'paywait': '等待支付',
  'orderSucc': '订单完成',
  'servicewait': '未选中',
  'collectSucc': '收款成功',
  'back': '未选中退款',
}

function OperatePanel ({
                         status,
                         amount,
                         clueNumber,
                         amountFinal,
                         quoteNumber,
                         selectedUser,
                         hasEvaluated,
                         showDeleteModal,
                         showEvaluateModal,
                         cancelServiceOrder,
                         deleteServiceOrder,
                         withdrawServiceOrder,
                         showInitiatePaymentModal,
                       }) {
  if (statusMap[status] === '还未选择') {
    return (
      <div className="right">
        <img
          src="./images/order-wait.png"
          alt="等待选择"
          width="50"
          height="50"
        />
        <p>
          { quoteNumber }人已报价
        </p>
        <p>等待客户选择服务人员</p>
      </div>
    )
  }
  if (statusMap[status] === '被选中') {
    return (
      <div className="right">
        <p className="congratulation">恭喜，您已被选中</p>
        <Button type="primary" onClick={ showInitiatePaymentModal }>收款</Button>
        <p className="cancel-order" onClick={ cancelServiceOrder }>取消订单</p>
      </div>
    )
  }
  if (statusMap[status] === '未选中') {
    return (<div className="right">
      <img
        src="./images/order-fail.png"
        alt="订单失败"
        width="50"
        height="50"
      />
      <p>已选择 { selectedUser } 服务</p>
      <p className="recall" onClick={ withdrawServiceOrder }>撤回报价</p>
    </div>)
  }
  if (statusMap[status] === '未选中退款') {
    return (<div className="right">
      <img
        src="./images/order-fail.png"
        alt="订单失败"
        width="50"
        height="50"
      />
      <p>已选择 { selectedUser } 服务</p>
      <p>支付 { clueNumber } 张线索卡已自动退回线索卡账户</p>
    </div>)
  }
  if (statusMap[status] === '等待支付') {
    return (<div className="right">
      <img
        src="./images/order-paying.png"
        alt="等待选择"
        width="50"
        height="50"
      />
      <p>
        等待支付
      </p>
      <p>¥ { amountFinal / 100 || amount / 100 }</p>
    </div>)
  }
  if (statusMap[status] === '收款成功') {
    return (<div className="right">
      <p className="payed">已成功收款¥ { amountFinal / 100 || amount / 100 }</p>
      {
        hasEvaluated
          ? <Button type="primary" disabled>已评价</Button>
          : <Button type="primary" onClick={ showEvaluateModal }>评价</Button>
      }
    </div>)
  }
  if (statusMap[status] === '已取消') {
    return (<div className="right">
      <img
        src="./images/order-canceled.png"
        alt="订单已取消"
        width="50"
        height="50"
      />
      <p>
        订单已取消
      </p>
      <p className="delete-order" onClick={ showDeleteModal }>删除订单</p>
    </div>)
  }
  if (statusMap[status] === '错误') {
    return (<div>错误</div>)
  }
}

export { ServiceListItem as view }