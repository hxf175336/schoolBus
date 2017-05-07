import resource from '../../resource/index'
const apiList = [{
  key: 'getOneArticle',
  url: '/api/getOneArticle',
  method: 'post'
}, {
  key: 'setIslike',
  url: '/api/setIslike',
  method: 'post'
}, {
  key: 'setMessage',
  url: '/api/setMessage',
  method: 'post'
}]
export default resource(apiList)
