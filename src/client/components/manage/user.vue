<!-- 管理 -->
<template>
  	<div class="user">
	  	<ul>
	  		<li>
	  			<div class="userBox">
	  				<label for="">zhaoxinglai</label> 
	  				<label for="">普通用户</label>	
	  			</div>
	  			<div class="btnBox">
	  				<mt-button size="small" type="default">查看</mt-button>
	  				<mt-button size="small" type="primary">修改</mt-button>
	  				<mt-button size="small" type="danger">删除</mt-button>
	  			</div>
	  		</li>
	  	</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {

	},
	components: {
		
	}
}
</script>

<style lang="less">
.user {
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		li {
			background: #fafafa;
		    margin: 0;
		    padding: 12px;
		    margin-top: 12px;
			.userBox {
				line-height: 32px;
				height:40px;
				label {
					&:nth-child(1) {
						float: left;
						padding-left: 3px;
						font-weight: 600;
					}
					&:nth-child(2) {
						float: right;
						padding-right: 3px;
						color: #888;
					}
				}
			}
			.btnBox {
				align-items: baseline;
			    display: flex;
			    justify-content: space-between;
			    .mint-button {
			    	width: 30%;
			    }
			}
		}
	}
}
</style>
