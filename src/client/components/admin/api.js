import resource from '../../resource/index'
const apiList = [{
  key: 'adminLogin',
  url: '/api/adminlogin',
  method: 'post'
}]
export default resource(apiList)
