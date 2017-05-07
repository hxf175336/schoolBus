<!-- 推文详情页 -->
<template>
  <div class="activitydetail">
  	<menuNav></menuNav>
  	<div class="article">
  		<p class='back' @click="back"><i class="iconfont">&#xe605;</i></p>
	    <div class="title">
	    	<p>{{articleDetail.articleTitle}} </p>
	    	<p>
	    		<span>时间：{{articleDetail.sendTime}}</span>
	    		<span>点赞数：{{articleDetail.islike}}</span>
	    	</p>
	    </div>
	    <div class="banner">
	    	<img :src="'/src/servers/public/' + articleDetail.picUrl">
	    </div>
	    <div class="content">
	    	
	    	<p>{{articleDetail.content}}</p>
	    </div>
  	</div>
    <div class="messageList">
    	<p class="box">评论区</p>
    	<ul v-if="messageList && messageList.length > 0">
    		<li v-for="item in messageList">
    			<div><p>{{item.messageText}}</p></div>
    			<div class="userIcon">by: {{item.byWho}}</div>
    			<div class="time">{{item.createTime | oldTime}}</div>
    		</li>
    	</ul>
    	<ul class="tipBox" v-else><p class="tip">暂无评论</p></ul>
    </div>
    <div class="footer">
    	<div class="like">
    		<i class="iconfont" :class="isLike? 'is': ''" @click="like">&#xe63f;</i>
    	</div>
    	<div class="message">
    		<input type="text" v-model="messageText" placeholder="我要吐槽">
    		<div @click="sendMessage"><i class="iconfont">&#xe623;</i></div>
    	</div>
    </div>
  </div>
</template>

<script>
import menuNav from '../common/menu.vue'
import API from './api.js'
import { Toast } from 'mint-ui';
import {getCookie} from 'util/utils.js'
import '../../filter/index.js'

export default {
	
	data() {
		return {
			isLike: false,
			articleId: '',
			userName: '',
			messageText: '',
			articleDetail: {},
			messageList: [],
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){
			this.articleId = this.$route.query.articleId;
			this.cookie();
			this.getAriticleDetail();
		},
		cookie() {
		    let userName = getCookie('userName');
		    if (userName && userName !== '') {
		        this.userName = userName;
		    } else {
		        this.$router.replace('/login');
		    }
	    },
		like() {
			this.isLike = true;
			let param = {
				like: 1,
				articleId: this.articleId
			};
			API.setIslike(param)
			.then(response => {
				let res = response.body;
				if (res.code == 0) {
					this.init();
				}
			})
		},
		sendMessage() {
			let param = {
				articleId: this.articleId,
				messageText: this.messageText,
				byWho: this.userName,
			}
			API.setMessage(param)
			.then(response => {
				let res = response.body;
				if (res.code == 0) {
					Toast({
			            message: '留言成功',
			            iconClass: 'mintui mintui-success'
			        });
			        this.messageText = '';
			        this.init();
				}
			})	
		},
		back() {
			this.$router.go(-1);
		},
		getAriticleDetail() {
	      API.getOneArticle({
	        articleId: this.articleId
	      }).then(response => {
	        let res = response.body;
	        if (res.code == 0) {
	          this.articleDetail = res.list
	          if (!this.articleDetail.message) {
	          	this.messageList = [];
	          } else {
	          	this.messageList = this.articleDetail.message.reverse();
	          }
	        }
	      })
	    },
	},
	components: {
		menuNav
	}
}
</script>

<style lang="less">
.activitydetail {
	margin-top: 50px;
	background: #f6f8fa;
	margin-bottom: 70px;
	.article {
		margin-bottom: 20px;
		background: #fff;
		.back {
			padding: 12px 0 0 6px;
			margin: 0;
		}
		.title {
			line-height: 32px;
		    font-size: 20px;
		    p {
		    	margin: 0;
				&:nth-of-type(1) {
					text-align:center;
					font-weight: 700;
				}
		    	&:nth-of-type(2) {
		    		font-size: 15px;
		    	}
		    	span {
		    		&:nth-of-type(1) {
		    			float: left;
		    			padding-left: 14px;
		    		}
		    		&:nth-of-type(2) {
						float: right;
		    			padding-right: 14px;
		    		}
		    	}
		    }
		}
		.banner {
			padding: 6px;
			img {
				width: 100%;
				height: 180px;
			}
		}
		.content {
			text-indent: 6px;
			padding: 6px;
			color: #5a5a5a;
			p {
				font-size: 16px;
				word-break: break-all;
			    word-wrap: break-word;
				line-height: 28px;
			}
		}
	}
	
	.footer {
		padding: 5px;
	    height: 45px;
	    width: 100%;
	    position: fixed;
	    bottom: 0;
	    background: #fff;
	    margin-bottom: 20;
	    &:before {
	    	content: '';
	    	position: absolute;
	    	border-top: 1px solid #f6f8fa;
	    	top: 0;
	    	width: 100%;	
	    }
		div {
			display: inline-block;
		}
		i {
			font-size: 28px;
		}
		.like {
			text-indent: 6px;
			i {
				color: #26a2ff;
				vertical-align: middle;
			}
			.is {
				color: red;
			}
		}
		.message {
			width: 85%;

			input {
				height: 40px;
				width: 80%;
				border: 0;
				text-indent: 6px;
				font-size: 16px;
				&:focus {
					outline: none;
					border-bottom: 1px solid #f6f8fa;
				}
			}
			div {
				width: 15%;
				text-align: center;
				i {
					color: #888;

					vertical-align: -webkit-baseline-middle;
				}
			}
		}
	} 
	.messageList {
		background: #fff;
		position: relative;
		margin-bottom: 50px;
		width: 100%;
		.box {
			text-indent: 18px;
			line-height:40px;
			margin: 0;
			position:relative;
			&:after {
				content: '';
			    position: absolute;
			    border-top: 1px solid #f6f8fa;
			    width: 100%;
			    bottom: 0;	
			    left: 0;
			}
			&:before {
				content: '';
				position: absolute;
				width: 5px;
				height: 15px;
				left: 0;
				background: #ffc107;
				left: 2%;
    			top: 30%;
			}
		}
		ul {
			width: 100%;
			list-style-type: none;
			padding: 0;
			margin: 0;
			.tip {
				text-align:center;
			}
			li {
				width: 90%;
				position: relative;
				padding: 8px 0;
				margin-left: 5%;
				p {
					padding-left: 6px;
					line-height: 32px;
					margin: 0;
					padding: 0;
					font-size:16px; 
				}
				&:after {
					content: '';
			    	position: absolute;
			    	border-top: 1px solid #f6f8fa;
			    	width: 100%;
			    	bottom: 0;	
			    	left: 0;
				}
				.userIcon {
					width: 140px;
				    display: inline-block;
				}
				.time {
					float: right;
					font-size: 12px;
				}
			}
		}
		.tipBox {
			padding: 6px;
		}
	}
}
</style>
