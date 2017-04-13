import resource from '../../resource/index'
const apiList = [{
  key: 'siginUp',
  url: '/api/signup',
  method: 'post'
}]
export default resource(apiList)
