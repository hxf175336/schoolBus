<!-- 交易记录 -->
<template>
  <div class="recording">
    <menuNav></menuNav>
    <div class="recording-main">
    	<mt-navbar class="page-part" v-model="moneyTabs">
	      <mt-tab-item id="1">充值记录</mt-tab-item>
	      <mt-tab-item id="2">消费记录</mt-tab-item>
	    </mt-navbar>
	    <mt-tab-container v-model="moneyTabs">
	      <mt-tab-container-item id="1">
	        <div v-if="rechargeList.length > 0">
	        	<mt-cell  v-for="item in rechargeList" :title="item.consumeType | consumeTitle" 
	        		:label="item.updateTime" :value="item.consumeMoney + '元'">
	        	</mt-cell>
	        </div>
	        <div v-else ><p class="tip">暂无记录</p></div>
	      </mt-tab-container-item>
	      <mt-tab-container-item id="2">
	        <div v-if="consumeList.length > 0">
	        	<mt-cell  v-for="item in consumeList" :title="item.consumeType | consumeTitle" 
	        :label="item.updateTime" :value="item.consumeMoney+'元'"></mt-cell>
	        </div>
	        <div v-else><p class="tip">暂无记录</p></div>
	      </mt-tab-container-item>
	    </mt-tab-container>
    </div>
  </div>
</template>

<script>
import menuNav from '../common/menu.vue'
import {getCookie} from 'util/utils.js'
import '../../filter/index.js';
import API from './api.js'
export default {
	data() {
		return {
			moneyTabs: '1',
			rechargeList: [], //充值列表
			consumeList: [], //消费记录
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			let userName = getCookie('userName');
			if (userName == null) {
				this.$router.replace('/login');
				return ;
			}
			this.getRechargeList(userName);
			this.getConsumeList(userName);
		},
		// 获取充值列表
		getRechargeList(name) {
			let param = {
				userName: name,
				type: 1
			};
			API.getRechargeList(param)
			.then(response => {
				let res = response.body;
				if (res.code == 0) {
					this.rechargeList = res.list;
					// console.log(this.rechargeList);
				} else {
					console.log(res.message);
				}
			})
		},
		// 获取消费记录
		getConsumeList(name) {
			let param = {
				userName: name,
				type: 0
			};
			API.getConsumeList(param)
			.then(response => {
				let res =response.body;
				if (res.code == 0) {
					this.consumeList = res.list;
					// console.log(this.consumeList);
				} else {
					console.log(res.message);
				}

			})
		}
	},
	components: {
		menuNav
	}
}
</script>

<style lang="less">
.recording {
	margin-top: 50px;
	.mint-tab-item-label {
		font-size: 16px;
	}
	.mint-tab-container {
		padding: 3px 0;
	}
	.mint-cell {
		margin: 0 12px;
	}
	.tip {
		text-align: center
	}
	.mint-cell-label {
		font-size: 14px;
	}
	.mint-cell {
		min-height: 68px;
	}
	.mint-cell-value {
		font-weight: bold;
	}
}
</style>
