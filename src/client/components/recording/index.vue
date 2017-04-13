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
	        <mt-cell v-for="item in rechargeList" :title="item.title" 
	        :label="item.time" :value="item.content"></mt-cell>
	      </mt-tab-container-item>
	      <mt-tab-container-item id="2">
	        <mt-cell v-for="item in consumeList" :title="item.title" 
	        :label="item.time" :value="item.content"></mt-cell>
	      </mt-tab-container-item>
	    </mt-tab-container>
    </div>
  </div>
</template>

<script>
import menuNav from '../common/menu.vue'
import {getCookie} from 'util/utils.js'
import API from './api.js'
export default {
	data() {
		return {
			moneyTabs: '1',
			rechargeList: [], //充值列表
			consumeList: [], //消费记录
		}
	},

	methods: {
		init() {
			let userName = getCookie('userName');
			this.getRechargeList(userName);
			this.getConsumeList(userName);
		},
		// 获取充值列表
		getRechargeList(name) {
			let param = {
				userName: name,
				type: 1
			};
		},
		// 获取消费记录
		getConsumeList(name) {
			let param = {
				userName: name,
				type: 0
			};
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
}
</style>
