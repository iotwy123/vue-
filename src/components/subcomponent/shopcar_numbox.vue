<template>
	<div>
		<span class="mui-numbox" data-numbox-min='1' data-numbox-max='10'>
							<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
							<input id="test" class="mui-input-numbox" type="number"  :value="initcount" @change="countChanged" ref="numbox" readonly/>
							<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
						</span>
	</div>
	<!-- 子组件什么时候把数据传递给父组件 -->
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default{
		data(){
			return {
				a:'',
			}
		},
		created(){
			this.a=this.max
		},
		mounted(){
			mui(".mui-numbox").numbox();
			console.log(this.max)
			console.log(this.a)
		},
		methods:{
			countChanged(){
				//数量改变了
				//每当数量值改变，把数据同步到购物车store中。
				this.$store.commit('updateGoodIfo',{id:this.goodsid,count:this.$refs.numbox.value})
				}
		},
		props:['initcount','goodsid']
	}
</script>

<style>
</style>
