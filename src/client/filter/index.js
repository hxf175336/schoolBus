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
// 几天前
Vue.filter('oldTime', (value) => {
	let resTime = [],
		result = '',
		byTime = [365*24*60*60*1000, 24*60*60*1000, 60*60*1000, 60*1000,1000], 
		unit = ["年","天","小时","分钟","秒钟"],
		ct = new Date().getTime() - Number(value);
		for(let i = 0; i < byTime.length; i++) {
			if (ct > byTime[i]) {
				let temp = Math.floor(ct/byTime[i]);
				result = temp + unit[i] + '前';
				break;
			}
		}
	return result;
})


