import resource from '../../resource/index'
const apiList = [{
  key: 'upload',
  url: '/api/upload',
  method: 'post'
}]
export default resource(apiList)
