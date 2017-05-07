<!--  -->
<template>
  	<div class="home-detail">
  		<p type="text" @click="back"><i class="iconfont">&#xe606;</i></p>
  		<div class="pay-banner">
  			<p class="pay-title">本次行程消费</p>
  			<div class="pay-money">
  				<p>￥<i>1.00</i>元</p>
  			</div>
  			<div class="total-money">
  				<p>总费用：<i>1.00</i>元</p>
				<p>暂无可用红包</p>
  			</div>
  			<div class="thx">
  				<p>感谢使用foo校园通</p>
  			</div>
  		</div>
		<mt-button type="primary" @click="payForMoney">立即支付</mt-button>
  	</div>
</template>

<script>
import API from './api.js'
import { Toast } from 'mint-ui';
export default {
	props: {
		userName: {
			type: String
		}
	},
	data() {
		return {
			payMoney: 1,
		}
	},
	methods: {
		
		// 支付一块钱
		payForMoney() {
			let lock = false,
				param = {
					userName: this.userName,
					type: 0,
					consumeMoney: this.payMoney
				};
			if (lock == true) return ;
			lock = true;
			API.payForMoney(param)
			.then(response => {
				lock = false;
				let res = response.body;
				if (res.code == 0) {
					Toast({
			            message: '支付成功',
			            iconClass: 'mintui mintui-success'
			        });
			        let that = this;
					setTimeout(() => {
						that.$emit('reset');
					}, 1000)
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
.home-detail {
	padding: 12px;
	margin-top: 50px;
	font-size: 16px;
	.pay-banner {
		width: 98%;
		padding-top: 12px;
	    height: 255px;
	    background: #fff;
	    margin: 0 auto;
	    color:#333;
	    -moz-box-shadow:2px 2px 5px#d3c998;/*firefox*/  
        -webkit-box-shadow:2px 2px 5px#d3c998;/*webkit*/  
        box-shadow:2px 2px 5px #d3c998;/*opera或ie9*/
        .pay-title {
        	text-align: center;
        	position: relative;
        	&:before {
        		content: '';
        		width:25%;
        		border-top: 1px solid #333;
				position: absolute;
				top: 50%;
				left: 32px;
        	}
        	&:after {
        		content: '';
        		width:25%;
        		border-top: 1px solid #333;
				position: absolute;
				top: 50%;
				right: 32px;
        	}
        } 
        .total-money, .pay-money {
			display: flex;
		    
		    align-items: center;
        }
        i {
			font-style: normal;
        }
        .pay-money {
		    height: 100px;
		    justify-content: center;
		    font-variant: small-caps;
		    font-weight: 700;
		    i {
		    	font-size: 40px;
	        	vertical-align: baseline;
				margin-left: 2px;
				margin-right: 2px;
				font-family: fantasy;
	        }
        }
        .total-money {
			justify-content: space-around
        }
        .thx {
        	width: 100%;
        	height: 39px;
        	text-align: center;
        	background: #fafafa;
        	p {
        		line-height: 39px;
        		color: #111;
        	}
        }
	}
	.mint-button--normal {
		width: 100%;
	    line-height: 32px;
	    margin-top: 32px;
	    height: 50px;
	}
}
</style>
