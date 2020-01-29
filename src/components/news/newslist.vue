<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="http://47.102.206.147:8080/coffe/images/Latte.jpg">
					<div class="mui-media-body">
						<h1>幸福</h1>
						<p class='mui-ellipsis'>
							<span>发表时间：2020-12-12 21:21:21</span>
							<span>点击：0次</span>
						</p>
					</div>
				</a>
			</li>
		</ul>
		<!-- 上边是假数据 -->
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" src="item.img_url">
					<div class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class='mui-ellipsis'>
							<span>发表时间：{item.add_time|dateFormat}</span>
							<span>点击：{{item.click}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				newslist:[]  //新闻列表
			}
		},
		created(){
			this.getNewsList()
		},
		methods:{
			getNewsList(){
				this.$http.get('api/getnewslist').then(result=>{
					if(result.body.status===0){
						//如果没有失败应该把数据保存到data上
						this.newslist=result.body.message
					}else{
						Toast('获取失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mui-table-view{
		li{
			h1{
				font-size: 14px;
			}
			.mui-ellipsis{
				font-size: 12px;
				color: #225aff;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
