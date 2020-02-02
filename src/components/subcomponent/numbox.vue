<template>
	<div>
		<span class="mui-numbox" data-numbox-min='1' data-numbox-max='a'>
							<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
							<input id="test" class="mui-input-numbox" type="number" value="5" @change="countChanged" ref="numbox"/>
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
				//文本框的数据被修改时，把新数据通过事件传递给父组件
				console.log(this.$refs.numbox.value)
				this.$emit('getcount',parseInt(this.$refs.numbox.value))
				}
		},
		props:['max'],
		watch:{
			max:function(newVal,oldVal){
				mui('.mui-box').numbox().setOption('max',newVal)
			}
		}
	}
</script>

<style>
</style>
