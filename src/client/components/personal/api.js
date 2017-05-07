import resource from '../../resource/index'
const apiList = [{
  key: 'getUserMessage',
  url: '/api/getUserMessage',
  method: 'post'
}, {
  key: 'logout',
  url: '/api/logout',
  method: 'post'
}, {
  key: 'setName',
  url: '/api/setName',
  method: 'post'
}, {
  key: 'setBirthDay',
  url: '/api/setBirthDay',
  method: 'post'
}, {
  key: 'modifyUserName',
  url: '/api/modifyUserName',
  method: 'post'
}, {
  key: 'modifyPhone',
  url: '/api/modifyPhone',
  method: 'post'
}]
export default resource(apiList)
