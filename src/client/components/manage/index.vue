<!-- 管理 -->
<template>
  	<div class="manage">
	  	<mt-header fixed title="foo校园后台管理"></mt-header>
	   	<div class="manage-main">
	   		<mt-navbar v-model="adminNav">
			  	<mt-tab-item id="1">用户管理</mt-tab-item>
			  	<mt-tab-item id="2">发文管理</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="adminNav">
			  	<mt-tab-container-item id="1">
			    	<userBox></userBox>
			  	</mt-tab-container-item>
			  	<mt-tab-container-item id="2">
			    	<articleBox></articleBox>
			  	</mt-tab-container-item>
			</mt-tab-container>
	   	</div>
	</div>
</template>

<script>
import userBox from './user.vue'
import articleBox from './article.vue'
export default {
	data() {
		return {
			adminNav: '1'
		}
	},
	methods: {

	},
	components: {
		userBox, articleBox
	}
}
</script>

<style lang="less">
.manage {
	font-size: 16px;
	.mint-header {
		height: 50px;
		
	}
	.manage-main {
		margin-top: 50px;
		.mint-tab-item-label {
			font-size: 16px;
		}
		.mint-tab-container {
			padding: 3px 6px;
		}
	}
}
</style>
