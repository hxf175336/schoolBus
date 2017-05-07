<!-- 个人中心 -->
<template>
  <div class="personal">
    <menuNav></menuNav>
    <div class="person-main">
    	<div class="userImg">
    		<img :src='"../../assets/foo.jpg"' alt="">
    		
    	</div>
    	<mt-cell title="姓名" is-link>
  			<span style="color: #111;z-index: 1;" @click="setName" >{{firstName? firstName : '未设置'}}</span>
		</mt-cell>
		<mt-cell title="生日" is-link @click.native="open('pickerTime')">
  			<span style="color: #111">{{userBirth}}</span>
		</mt-cell>
		
		<mt-cell title="手机号" is-link @click.native="modifyPhone">
  			<span style="color: #111">{{userPhone}}</span>
		</mt-cell>
		<mt-cell title="foo用户名" is-link @click.native="modifyUserName">
  			<span style="color: #111">{{userName}}</span>
		</mt-cell>
		<mt-button type="primary" @click="logout">退出登陆</mt-button>

		<mt-datetime-picker
			type="date"
			:start-date="new Date(1970,1,1)"
			ref="pickerTime"
	      	v-model="userBirth"
	     	@confirm="handleChange">
	    </mt-datetime-picker>

    </div>
  </div>
</template>

<script>
import {format} from 'util/utils.js'
import '../../filter/index.js'
import menuNav from '../common/menu.vue'
import {getCookie} from 'util/utils.js'
import { MessageBox } from 'mint-ui';
import API from './api.js'
export default {
	data() {
		return {
			userBirth: '',
			firstName: '',
			userPhone: '15926446035',
			userName: '',
		}
	},
	
	mounted() {
		this.init();
	},
	methods: {
		init() {
	      this.cookie();
	      this.getUserMessage();
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
		getUserMessage() {
			API.getUserMessage({
				userName: this.userName
			}).then(response => {
				this.userPhone = response.body.data.userPhone;
				this.firstName = response.body.data.trueName;
				if (response.body.data.birthDay) {
					this.userBirth =  response.body.data.birthDay
				}
			})	
		},	
		open(picker) {
        	this.$refs[picker].open();
        	
      	},
		handleChange(value) {
	        this.userBirth = format(new Date(value), 'yyyy-MM-dd');
	       	API.setBirthDay({
	    		userName: this.userName,
	    		birthDay: this.userBirth
	    	}).then(response => {
	    		let res = response.body;
	    		if (res.code == 0) {
	    			this.init();
	    		}
	    	})
	    },
	    modifyPhone(){
	    	MessageBox.prompt(' ', '输入手机号').then(({ value }) => {
		    	if (value) {
		    		console.log(value);
		    		API.modifyPhone({
		    			userName: this.userName,
		    			newPhone: value
		    		}).then(response => {
		    		let res = response.body;
		    			if (res.code == 0) {
		    				this.init();
		    			}
		    		})
		    	} else {
		    		return ;
		    	}
		    }, (err) => {
		    	console.log(err);
		    	return ;
		    });
	    },
	    modifyUserName() {
	    	MessageBox.prompt(' ', '请输入用户名').then(({ value }) => {
		    	if (value) {
		    		API.modifyUserName({
		    			userName: this.userName,
		    			newUserName: value
		    		}).then(response => {
		    		let res = response.body;
		    			if (res.code == 0) {
		    				this.init();
		    			}
		    		})
		    	} else {
		    		return ;
		    	}
		    }, (err) => {
		    	console.log(err);
		    	return ;
		    });
	    },
	    //退出登录
	    logout() {
	    	API.logout().then(response => {
	    		let res = response.body;
	    		if (res.code == 0 ) {
	    			this.init();
	    		}
	    	})
	    },
	    // 设置姓名
	    setName() {
	    	MessageBox.prompt(' ', '请输入姓名').then(({ value }) => {
	    		if (value) {
	    			API.setName({
	    				userName: this.userName,
	    				trueName: value
	    			}).then(response => {
	    				let res = response.body;
	    				if (res.code == 0) {
	    					this.init();
	    				}
	    			})
	    		} else {
	    			return ;
	    		}
	    	}, (err) => {
	    		console.log(err);
	    		return ;
	    	})
	    }
	},
	components: {
		menuNav
	}
}
</script>

<style lang="less">
.personal {
	margin-top: 50px;
	width: 100%;
	.person-main {
		width: 100%;
		.userImg {
			display: flex;
			align-items: center;
			position: relative;
			justify-content: center;
			width:100%;
			height:175px;
			text-align: center;
			img {
				position: relative;
				border-radius: 50px;
				width: 100px;
				height: 100px;
				box-shadow: 
					-2px 0 2px #ccc, 
					2px 0 2px #ccc, 
					0 -2px 2px #ccc,
					0 2px 2px #ccc;
			}
			.fileBox{
				opacity: 0;
				float: left;
			    /* height: 41px; */
			    background: #f5696c;
			    width: 100px;
			    height: 100px;
			    position: absolute;
			    border-radius: 50px;
			    top: 50%;
			    left: 50%;
			    margin-left: -50px;
			    margin-top: -50px;
			}
			
			.inputstyle{
			    width: 100px;
			    height: 100px;
			    cursor: pointer;
			    font-size: 30px;
			    outline: medium none;
			    position: absolute;
			    filter:alpha(opacity=0);
			    -moz-opacity:0;
			    opacity:0; 
			    left:0px;
			    top: 0px;
			}
		}
		.mint-cell {
			width: 100%;
			.edit {
				height: 40px;
				border: 0;
				z-index:2;	
				text-align: right;
				padding-right: 3px;
			}
			&:nth-of-type(3) {
				margin-top: 40px
			}
		}
		.mint-cell-text {
			margin-left: 12px;
		}
		.mint-button {
			width: 96%;
			margin-top:32px;
			margin-left: 2%;
		}
	}

}
</style>
