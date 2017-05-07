import resource from '../../resource/index'
const apiList = [{
  key: 'getActive',
  url: '/api/getActive',
  method: 'post'
}]
export default resource(apiList)
