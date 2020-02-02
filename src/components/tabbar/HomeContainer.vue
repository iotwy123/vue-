<template>
	<div>
		<h3>HomeContainer</h3>
		<!-- 轮播图区域 -->
		<!-- <mt-swipe :auto='4000' >
			<mt-swipe-item v-for="item in lunbotuList" :key='item.url'>
			<img src="item.img"/>
			</mt-swipe-item>
		</mt-swipe> -->
		<!-- 自定义区域 -->
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

		<!-- 六宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" style="width: 33%;">
				<router-link to="/home/newslist">
					<span class="mui-icon mui-icon-chat"></span>
					<div class="mui-media-body">新闻资讯</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" style="width: 33%;">
				<router-link to="/home/photolist">
					<span class="mui-icon mui-icon-camera"><span class="mui-badge">5</span></span>
					<div class="mui-media-body">图片分享</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" style="width: 33%;">
				<router-link to="/home/goodlist">
					<span class="mui-icon mui-icon-home"></span>
					<div class="mui-media-body">商品</div>
				</router-link>
			</li>
			<br/>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" style="width: 33%;">
				<a href="#">
					<span class="mui-icon mui-icon-chatbubble"></span>
					<div class="mui-media-body">留言反馈</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" style="width: 33%;">
				<a href="#">
					<span class="mui-icon mui-icon-videocam"></span>
					<div class="mui-media-body">视频专区</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" style="width: 33%;">
				<a href="#">
					<span class="mui-icon mui-icon-phone"></span>
					<div class="mui-media-body">联系我们</div>
				</a>
			</li>
		
		</ul>
	</div>
</template>

<script>
	import swiper from '../subcomponent/swiper.vue'
	import {
		Toast
	} from 'mint-ui'
	export default {
		data() {
			return {
				lunbotuList: []
			}
		},
		created() {
			//this.getLunbotu()
		},
		methods: {
			getLunbotu() {
				this.$http.get('api/getlunbo').then(result => {
					//console.log(result.body)
					if (result.body.status === 0) {
						this.lunbotuList = result.body.message
					} else {
						Toast('加载轮播图失败。。。。')
					}
				})
			}
		},
		components:{
			swiper
		}
	}
</script>

<style lang="scss" scoped>

	
</style>
