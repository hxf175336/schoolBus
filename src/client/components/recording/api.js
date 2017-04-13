import resource from '../../resource/index'
const apiList = [{
  key: 'getRechargeList', //充值列表
  url: '/api/getRechargeList',
  method: 'post'
}, {
  key: 'getConsumeList',
  url: '/api/getConsumeList',
  method: 'post'
}]
export default resource(apiList)
