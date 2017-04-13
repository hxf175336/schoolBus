<template>
  <div class="wallet">
    <menuNav></menuNav>
    <div class="account-balance">
    	<p>我的余额(RMB)</p>
    	<p><i>42.0</i></p>
    	<mt-button type="primary">充值</mt-button>
    </div>
	<!-- <mt-navbar class="page-part" v-model="moneyTabs">
      <mt-tab-item id="1">充值记录</mt-tab-item>
      <mt-tab-item id="2">消费记录</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="moneyTabs">
      <mt-tab-container-item id="1">
        <mt-cell v-for="item in test1" :title="item.title" 
        :label="item.time" :value="item.content"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="item in test2" :title="item.title" 
        :label="item.time" :value="item.content"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container> -->
  </div>

</template>

<script>
import menuNav from '../common/menu.vue'

export default {
	data() {
		return {
			moneyTabs: '1',
			test1: [{
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}],
			test2: [{
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			}, {
				title: '行车消费',
				content: '1',
				time: '2017012'
			},]
		}
	},
	methods: {

	},
	components: {
	    menuNav
	}
}
</script>

<style lang="less">
.wallet {
	.account-balance {
		padding: 12px 0;
		width: 100%;
		height: 250px;
		text-transform: capitalize;
		background: #ffffff;
		backface-visibility: inherit;
		text-align: center;
		margin-top: 50px;
		p, button {
			line-height: 32px;
			&:nth-child(1) {
				color: #5a5a5a;
			} 
		}
		p {
			margin-bottom: 32px;
		}
		i {
			font-size: 36px;
			font-weight: bold;
		}
	}
	.mint-tab-item-label {
		font-size: 16px;
	}
	.mint-button--normal {
		display: block;
		width: 80%;
		margin: 0 auto;
		font-weight: bold;
		color: black;
	}
	.mint-cell-text {
		line-height: 24px;
	}
	.mint-cell-label {
		font-size: 14px;
	}
	.mint-cell {
		padding: 3px 12px;
	}
}
</style>
