<!-- 充值 -->
<template>
  <div class="addMoney">
    <p class="back" @click="back"><i class="iconfont">&#xe606;</i></p>
	<div class="addMoneyHeader">
		<p>我的余额(RMB)</p>
    	<p>{{accountBalance | moneyTofixed}}</p>
	</div>
	<div class="addMoneyContainer">
		<p class="main-title">充值金额</p>
		<div class="main-money">
			<div :class="clickStatus == 1 ? 'borderColor' : '' " @click="checkOutMoney(1)">
				<p>充值<em>20</em>元</p>
				<p>+<em>2</em>元</p>
			</div>
			<div :class="clickStatus == 2 ? 'borderColor' : ''" @click="checkOutMoney(2)">
				<p>充值<em>30</em>元</p>
				<p>+<em>3</em>元</p>
			</div>
			<div :class="clickStatus == 3 ? 'borderColor' : '' " @click="checkOutMoney(3)">
				<p>充值<em>50</em>元</p>
				<p>+<em>5</em>元</p>
			</div>
		</div>
		<mt-button type="primary" @click="addMoney()">立即充值</mt-button>

	</div>
  </div>
</template>

<script>
import {getCookie} from 'util/utils.js'
import { Toast } from 'mint-ui';
import API from './api.js'
import '../../filter/index.js'

export default {
	props: {
		accountBalance: {
			type: Number
		}
	},
	data() {
		return {
			clickStatus: 1,
			userName: '',
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.cookie();
		},
		// 判断用户是否登陆
		cookie() {
			let userName = getCookie('userName');
			if (userName && userName !== '') {
				this.userName = userName;
			} else {
				this.$router.replace('/login');
			}
		},

		checkOutMoney(value) {
			this.clickStatus = value;
		},
		addMoney() {
			let moneyNumber, param, lock = false;
			if (lock == true)  return ;
			lock = true;
			switch(this.clickStatus){
				case 1: 
					moneyNumber = 22;
					break;
				case 2: 
					moneyNumber = 33;
					break;
				case 3: 
					moneyNumber = 55;
			}
			param = {
				userName: this.userName,
				type: '1',
				consumeMoney: moneyNumber,
			};
			API.addRechargeMoney(param)
			.then(response => {
				lock = false;
				let res = response.body;
				if (res.code == 0) {
					Toast({
			            message: '充值成功！',
			            iconClass: 'mintui mintui-success'
			        });
			        this.$emit('getBalanceMoney');
				}
			})
		},
		back() {
			this.$emit('reset');
		}
	}
}
</script>

<style lang="less">
.addMoney {
	margin-top: 50px;
	padding-top: 12px;
	.back {
		text-indent: 12px;
	}
	.addMoneyHeader {
		padding: 12px;
		text-align: center;
		p {
			&:nth-of-type(2) {
				font-size:36px;
				font-weight: bold;
			}
		}
	}
	.addMoneyContainer {
		.main-title {
			background: #f6f8fa;
		    color: #5a5a5a;
		    line-height: 32px;
		    font-size: 18px;
		    margin: 0;
		    padding: 6px 0 6px 16px;
		}
		.main-money {
			display:flex;
			justify-content:space-between;
			align-items:center;
			margin-top:32px;
			padding: 6px;
			div {
				width: 108px;
				height: 65px;
				text-align:center;
				border: 1px solid #ccc;
				color: #5a5a5a;
				p {
					margin: 0;
					font-size:18px;
					line-height:32px;
					
					&:nth-of-type(2) {
						color: #C00;
					}
					em {
						font-style: normal;
					    font-weight: 700;
					    margin: 0px 2px;
					}
				}
			}
			.borderColor {
				border: 1px solid #26a2ff;
				font-weight: 600; 
			}
		}
		.mint-button {
			margin-top:32px;
		}
	}
}
</style>
