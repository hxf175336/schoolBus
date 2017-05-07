<!-- adminDetail -->
<template>
  <div class="adminDetail">
  	<mt-header fixed title="foo校园通活动推送">
  		<router-link to="/admin" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
  	</mt-header>
  	<form class="detail-main" id="uploadPic" enctype="multipart/form-data" >
  		<mt-field label="推文标题" name="title" v-model="title" placeholder="title"></mt-field>	
		<mt-field label="推文内容" name="content" v-model="content" placeholder="content" type="textarea" rows="8">
		</mt-field>
		<VueImgInputer v-model="picValue" theme="light"></VueImgInputer>
		
 		<mt-button type="primary" @click="send">发布</mt-button>
  	</form>
  	<mt-popup 
  		v-model="popupVisible" 
  		position="top" 
  		class="mint-popup-2" 
  		:modal="false">
	        <p>{{errorTip}}</p>
	</mt-popup>
  </div>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
import {getCookie} from 'util/utils.js'
// import uploadPic from 'util/upload.js'
import API from './api.js'
export default {
	data() {
		return {
			popupVisible: false,
			errorTip: '',
			userType: '',
			picValue: '',
			title: '',
			content: '',	
		}
	},
	mounted() {
		this.init();
	},
	watch: {
		picValue(newPicvalue) {
			this.picValue = newPicvalue;
		},
		popupVisible(visible) {
	      if (visible) {
	        setTimeout(() => {
	          this.popupVisible = false;
	        }, 1000);
	      }
	    }
	},
	methods: {
		init() {
	      this.cookie();
	    },
	    // 获取cookie
	    cookie() {
		    let userType = getCookie('userType');
		    if (userType && userType !== '') {
		      	this.userType = userType;
		    } else {
		      	this.$router.replace('/admin');
		    }
	    },
	    send() {
	    	if (this.content == '' || this.title == '' || this.content == '') {
	    		this.errorTip = '信息不完整';
	    		this.popupVisible = true;
	    		return ;
	    	}
	    	if (this.picValue.size > 5242880) {
	    		this.errorTip = "图片不能超过5M";
	    		this.popupVisible = true;
	    		return ;
	    	} 
	    	let form = new FormData( document.getElementById("uploadPic"));
      		form.append('upfile', this.picValue);
      		form.append('title', this.title);
      		form.append('content', this.content);
      		API.upload(form)
      		.then(response => {
      			this.$router.go(-1);
      		})
	    }
	    
	},
	components: {
		VueImgInputer
	}
}
</script>

<style lang="less">
.adminDetail {
	.mint-header {
		position: fixed;
	    width: 100%;
	    box-shadow: 0px 1px 4px #333;
	    z-index: 1;
	    top: 0;
	    height: 50px;
	    font-size: 16px;
	}
	.detail-main {
		padding: 12px;
		margin-top: 50px;
		.mint-button {
			width: 80%;
			margin-left: 10%;
			margin-top: 32px;
		}
		.img-inputer {
			left: 50%;
			margin-left: -130px;
		}
	}
	.mint-popup-2 {
	      width: 100%;
	      height: 50px;
	      text-align: center;
	      background-color: rgba(0,0,0,.7);
	      backface-visibility: hidden;
	      p {
	        color: #fff;
	      }
	    }
}
</style>
