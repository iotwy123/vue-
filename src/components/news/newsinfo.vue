<template>
	<div class="newsinfo-container">
		<!-- 大标题 -->
		<h3 class="title">
			新闻标题
		</h3>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
			<span>点击：{{newsinfo.click}}次</span>
		</p>
		<hr />
		<!-- 内容区 -->
		<div class="content" v-html="newsinfo.content"></div>
		<!-- 获取到的数据 -->
		<comment-box :id="this.id"></comment-box>
		<!-- 自定义数据 -->
		<comment-box></comment-box>
	</div>
</template>

<script>
	//1.导入评论子组件
	import comment from '../subcomponent/comment.vue'
	import {Toast} from 'mint-ui'
	export default{
		
		data(){
			return{
				id:this.$route.params.id , //将url地址中传过来的id值，倒挂在data上，方便以后使用
				newsinfo:{}//新闻对象
			}
		},
		created(){
			this.getNewsInfo()
		},
		methods:{
			getNewsInfo(){
				this.$http.get('api/getnew/'+this.id).then(result=>{
					if(result.body.status===0){
						this.newsinfo=result.body.message
					}else{
						Toast('获取新闻失败')
					}
				})
			}
		},
		components:{
			//注册子组件
			'comment-box':comment
		}
	}
</script>

<style lang="scss" >
	.newsinfo-container{
		padding: 0 4px;
		.title{
			font-size: 14px;
			text-align: center;
			margin: 15px 0;
			color: red;
			
		}
		.subtitle{
			font-size: 13px;
			color:blue;
			display: flex;
			justify-content: space-between;
		}
		.content{
			img{
				width: 100%;
			}
		}
	}
</style>
