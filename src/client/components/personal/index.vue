<!-- 个人中心 -->
<template>
  <div class="personal">
    <menuNav></menuNav>
    <div class="person-main">
    	<div class="userImg">
    		<img :src='"../../assets/foo.jpg"' alt="">
    		<div class="fileBox">
			    <input type="file" id="file"  @change="getFile" class="inputstyle">
			</div>
    	</div>
    	<mt-cell title="姓名" is-link>
  			<span style="color: #111">{{firstName? firstName : '未设置'}}</span>
		</mt-cell>
		<mt-cell title="生日" is-link @click.native="open('pickerTime')">
  			<span style="color: #111">{{userBirth | formatDate}}</span>
		</mt-cell>
		<mt-cell title="性别" is-link style="margin-top:2px;">
  			<mt-radio
			  v-model="sex"
			  :options="['男', '女']">
			</mt-radio>
		</mt-cell>
		<mt-cell title="手机号" is-link >
  			<span style="color: #111">{{userPhone}}</span>
		</mt-cell>
		<mt-cell title="foo用户名" is-link >
  			<span style="color: #111">{{userName}}</span>
		</mt-cell>
		<mt-button type="primary">退出</mt-button>

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
export default {
	data() {
		return {
			userBirth: '',
			firstName: '赵兴来',
			sex: '男',
			userPhone: '15926446035',
			userName: 'zhaoxinglai',
			Img: '',
			accepts : { //允许的上传类型
                type : String,
                default : 'image/jpeg,image/jpg,image/png,image/gif'
            },
            maxSize : {
                type : Number,
                default : 0 //上传大小限制
            }, 
		}
	},
	
	methods: {
		open(picker) {
        	this.$refs[picker].open();
      	},
		handleChange(value) {
	        this.userBirth = value;
	    },
	    getFile(event) {
	    	let _files = event.target.files[0];

	    	if (_files.length < 1) return ;
	    	const formData = new FormData();
	    	
            formData['file'] = _files;
                    
           	this.$http.get('/api/upload').then(response => {
                const result = response.body
            }
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
			height:125px;
			text-align: center;
			img {
				position: relative;
				border-radius: 50px;
				width: 100px;
				height: 100px;
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
		}
		.mint-cell-text {
			margin-left: 12px;
		}
		.mint-button {
			width: 80%;
			margin-top:32px;
			margin-left: 10%;
		}
	}
}
</style>
