import resource from '../../resource/index'
const apiList = [{
  key: 'getlocation',
  url: '/api/getlocation',
  method: 'post'
}]
export default resource(apiList)
