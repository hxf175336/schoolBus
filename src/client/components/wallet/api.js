import resource from '../../resource/index'
const apiList = [{
  key: 'addRechargeMoney',
  url: '/api/addRechargeMoney',
  method: 'post'
}, {
  key: 'getUserMessage',
  url: '/api/getUserMessage',
  method: 'post'
}]
export default resource(apiList)
