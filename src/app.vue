<template>
	<div class="app-container">
		
		<!-- 顶部 header 区域 -->
		<mt-header fixed title="wy_vue项目">
			 <span slot="left" @click='goBack' v-show="flag">
			    <mt-button icon="back">返回</mt-button>
			  </span>
		</mt-header>
		
		<!-- 中间的 路由 router_view区域 -->
		<transition >
			<router-view></router-view>
		</transition>
		
		<!-- 底部tabbar区域 -->
			<nav class="mui-bar mui-bar-tab">
					<router-link class="mui-tab-item" to="/home">
						<span class="mui-icon mui-icon-home"></span>
						<span class="mui-tab-label">首页</span>
					</router-link>
					<router-link class="mui-tab-item" to="/member">
						<span class="mui-icon mui-icon-contact"></span>
						<span class="mui-tab-label">会员</span>
					</router-link>
					<router-link class="mui-tab-item" to="/shopcar">
						<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
							<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
						</span>
						<span class="mui-tab-label">购物车</span>
					</router-link>
					<router-link class="mui-tab-item" to="/search">
						<span class="mui-icon mui-icon-search"></span>
						<span class="mui-tab-label">搜所</span>
					</router-link>
				</nav>
		

	</div>
</template>

<script>
	export default{
		data(){
			return{
				flag:false,
			}
		},
		created(){
			if(this.$route.path==='/home'){
				this.flag=false
			}
			else{
				this.flag=true
			}
		},
		methods:{
			goBack(){
				//点击后退
				this.$router.go(-1)
			}
		},
		watch:{
			'$route.path':function(newVal){
				if(newVal==='./home')
				this.flag=false
				else
				this.flag=true
			}
		}
	}
	
</script>

<style lang='scss' scoped>
	.min-header{
		z-index: 99;
	}
	.app-container{
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
	}
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	
	
	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}
</style>
