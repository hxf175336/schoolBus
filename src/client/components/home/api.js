import resource from '../../resource/index'
const apiList = [{
  key: 'getlocation',
  url: '/api/getlocation',
  method: 'post'
}, {
  key: 'payForMoney',
  url: '/api/payForMoney',
  method: 'post'
}, {
  key: 'getDriverIp',
  url: '/api/getDriverIp',
  method: 'post'
}]
export default resource(apiList)
