<template>
  <div class="wallet">
    <menuNav></menuNav>
    <div v-if="!detail" class="account-balance">
    	<p>我的余额(RMB)</p>
    	<p>{{accountBalance | moneyTofixed}}</p>
    	<a href="/#/recording">
    		<div>查看交易明细</div>
    	</a>
    	<mt-button type="primary" @click="switchDetail">充值</mt-button>
    </div>
	<div v-else>
		<detail :account-balance="accountBalance"></detail>
	</div>
  </div>

</template>

<script>
import 'assets/css/wallet.less'
import menuNav from '../common/menu.vue'
import detail from './detail.vue'
import {getCookie} from 'util/utils.js'
import API from './api.js'
import '../../filter/index.js'
export default {
	data() {
		return {
			accountBalance: '',
			detail: false,
			userName: ''
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.cookie();
			this.getBalanceMoney();
		},
		// 获取cookie
		cookie() {
			let userName = getCookie('userName');
			if (userName && userName !== '') {
				this.userName = userName;
			} else {
				this.$router.replace('/login');
			}
		},
		// 切换到详情
		switchDetail() {
			this.detail = true;
		},
		// 
		getBalanceMoney() {
			API.getUserMessage({
				userName: this.userName
			}).then(response => {
				let res = response.body;
				this.accountBalance = res.data.accountBalance;
			})
		}
	},
	components: {
	    menuNav, detail
	}
}
</script>
