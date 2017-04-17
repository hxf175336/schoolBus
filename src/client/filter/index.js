import Vue from 'vue'
import {format} from '../util/utils.js'
// 消费类型
Vue.filter('consumeTitle', (value) => {
	if (!value) return ;
  	return value == '0' ? '行程消费' : '账号充值';
})
// 
Vue.filter('moneyTofixed', (value) => {
	if (!value) return ;
  	return value.toFixed(2);
})
Vue.filter('formatDate', (value) => {
	let date = new Date(value);
	return format(date, 'yyyy-MM-dd');
})
