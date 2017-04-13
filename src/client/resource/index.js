/**
* resource init
**/
import Vue from 'vue'
import VueResource from 'vue-resource'

// vue 引入 vue-resource
Vue.use(VueResource);

// vue 全局配置
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
Vue.http.options.xhr = {withCredentials: true};

// Interceptors 请求体处理
Vue.http.interceptors.push((request, next) => {
  next()
})

function resource (apiList) {
  let resourceList = {};
  apiList.forEach((item) => {
    let api = Vue.resource(item.url);
    switch (item.method) {
      case 'get':
        resourceList[item.key] = (params) => {
          return new Promise(function (resolve, reject) {
            api.get(params).then(function (response) {
              resolve(response);
            }).catch(function (response) {
              console.log(response.body);
            })
          });
        }
        break;
      case 'post':
        resourceList[item.key] = (params) => {
          return new Promise(function (resolve, reject) {
            api.save(params).then(function (response) {
              resolve(response);
            }).catch(function (response) {
              console.log(response.body);
            })
          })
        }
        break;
    }
  })
  resourceList.http = Vue.http;
  return resourceList
}


export default resource
