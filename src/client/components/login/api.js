import resource from '../../resource/index'
const apiList = [{
  key: 'login',
  url: '/api/login',
  method: 'post'
}]
export default resource(apiList)
