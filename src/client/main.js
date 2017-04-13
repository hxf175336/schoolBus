import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Map from './router'
import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'
// 百度地图组件
import BaiduMap from 'vue-baidu-map'


Vue.use(VueRouter);
Vue.use(MintUI);

// ak: 开发者秘钥
Vue.use(BaiduMap, {
  ak: '4b04053e2f36b919f23fe04a9b2959e3'
});

const router = new VueRouter(Map)


// 根组件
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
