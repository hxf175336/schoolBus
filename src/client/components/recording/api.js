import resource from '../../resource/index'
const apiList = [{
  key: 'getRechargeList', //充值列表
  url: '/api/getRechargeMoney',
  method: 'post'
}, {
  key: 'getConsumeList', //消费列表
  url: '/api/getRechargeMoney',
  method: 'post'
}]
export default resource(apiList)
