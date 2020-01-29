<template>
	<div class="cmt-container">
	<h3>
		发表评论
	</h3>
	<hr>
	<textarea placeholder="请输入吐槽的内容,最多120字" maxlength="120">
		
	</textarea>
	<mt-button type="primary" size="large">发表评论</mt-button>
	<div class="cmt-list">
		<div class="cmt-item" v-for="(item,i) in comments":key="item.add_time">
			<div class="cmt-title">
				第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
			</div>
			<div class="cmt-body">
				{{item.content ==='undefined'? '此用户很烂没有评论':item.content}}
			</div>
		</div>
	</div>
	<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				pageIndex:1,//默认展示第一页
				comments:[] //所有的评论数据
			}
			
		},
		created(){
			this.getComment()
		},
		methods:{
			getComment(){
				//获取评论
				this.$http.get('"api/getcomment/"+this.id+"?pageindex="+this.pageIndex').then(result=>{
					if(result.body.status===0){
						//this.comments=result.body.message
						//每当获取新评论数据的时候不要把老数据清空覆盖，应该以老数据拼接上新数据
						this.comments=this.comments.concat(result.body.message)
					}else{
						Toast('获取评论失败')
					}
				})
			},
			getMore(){
				//加载更多
				this.pageIndex++
				this.getComment()
			}
		},
		props:['id']
	}
</script>

<style lang="scss" scoped>
	.cmt-container{
		h3{
			font-size: 18px;
		}
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
		}
		.cmt-list{
			margin: 10px 0px;
			.cmt-item{
				.cmt-title{
					font-size: 13px;
					background-color: #ccc;
					line-height: 30px;
				}
				.cmt-body{
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>
