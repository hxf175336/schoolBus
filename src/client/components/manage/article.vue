<!-- 管理 -->
<template>
  	<div class="article">
	  	<ul>
	  		<li>
	  			<div class="articleBox">
	  				<a href="">
	  					<label for=""></label> 
	  				</a>
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
.article {
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		li {
			background: #fafafa;
		    margin: 0;
		    padding: 12px;
		    margin-top: 12px;
			.articleBox {
				line-height: 45px;
				height:45px;
				a {
					text-decoration: none;
					color: black;
				}
				label {
					&:nth-child(1) {
						display: block;
						float: left;
						padding-left: 3px;
						font-weight: 600;
						overflow:hidden;
			            text-indent: 6px;
			            width: 100%;
			            text-overflow:ellipsis;
			            -o-text-overflow:ellipsis;
			            -webkit-text-overflow:ellipsis;
			            -moz-text-overflow:ellipsis;
			            white-space:nowrap;
					}
					
				}
			}
			.btnBox {
				padding: 3px 0px;
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
