<template>
	<div class="goodinfo-container">
		
		<!-- 小球 -->
		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		
		<!-- 商品轮播区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
				</div>
			</div>
		</div>
	
	<!-- 商品购买区 -->
		<div class="mui-card">
			<div class="mui-card-header">商品的名称标题</div><!-- {{goodsinfo.title}} -->
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- goodsinfo.market_price   goodsinfo.sell_price -->
						<p class="price">
							市场价：<del>￥2399</del>&nbsp;&nbsp;销售价:<span class="now_price">￥2199</span>
						</p>
						<!-- 如何实现加入购物车时拿到选择的数量
								1.经过分析，按钮属于goodsinfo页面数字属于numbox组件
								涉及到了父子组件的嵌套问题，所以无法最直接在goodinfo页面中
								获取选中商品的数量
								2.如何解决这个问题呢：涉及到了子组件向父组件传值，时间调用机制
								3.事件调用的本质，父向子传递方法，子调用方法，把数据作为参数传递给这个方法-->
						<p>
							购买数量:<span><numbox @getcount="getSelectedCount" :max="this.max"></numbox></span>
						</p>
						<mt-button type="primary" size='small' >立即购买</mt-button>
						<mt-button type="danger" size='small' @click="addToShopCar">加入购物车</mt-button>
					</div>
				</div>
			
		</div>
	<!-- 商品参数区 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- goodsinfo.goods_no -->
						<p>商品货号：</p>
						<!-- goodsinfo.stock_quantity -->
						<p>库存情况：</p>
						<!-- goodsinfo.add_time|dateFormate -->
						<p>上架时间：</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc()">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment()">商品评论</mt-button>
				</div>
			
		</div>
		
	</div>
</template>

<script>
	import swiper from '../subcomponent/swiper.vue'
	import numbox from '../subcomponent/numbox.vue'
	export default {
		data() {
			return {
				id: this.$route.params.id, //将路由数据挂在到id上方便后续调用
				lunbotu: [] ,//轮播图的数据
				goodsinfo:{},//获取到的商品信息
				ballFlag:false,//控制小球隐藏和显示的标识
				selectedCount:1, //保存用户选中的商品数量，保证用户的值
				max:10,//自己伪装的最大库存量值，
			}
		},
		created() {
			//this.getLunbotu()
			//this.getGoodsInfo()
		},
		
		methods: {
			getLunbotu() {
				this.$http.get('api/getthumimage' + this.id).then(result => {
					if (result.body.status === 0) {
						//先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img不认识item.src
						result.body.message.forEach(item => {
							item.img = item.src
						})
						this.lunbotu = result.body.message
					}
				})
			},
			getGoodsInfo() {
				this.$http.get('api/goods/getinfo' + this.id).then(result => {
					if (result.body.status === 0) {
						this.goodsinfo = result.body.message[0]
					}
				})
			},
			goDesc(){
				//点击使用编程式导航跳转到图文界面
				this.$router.push('/home/goodsdesc')
	
			},
			goComment(){
				//点击跳转到评论页面
				this.$router.push('/home/goodscomment')
			},
			addToShopCar(){
				this.ballFlag=!this.ballFlag
			},
			beforeEnter(el){
				el.style.transform='translate(0,0)'
			},
			enter(el,done){
				el.offsetWidth;
				//小球动画优化思路：
				//先分析导致动画不准确的本质原因：移动位置写死了
				//只要分辨率和测试不一样，就会出现问题
				//因此经过分析，位移距离不能写死
				//得到解决思路：让先得到徽标的横纵坐标，在得到小球的横纵坐标让y值求差，x值也求差
				//得到的结果就是横纵坐标要位移的距离
				//如何获取徽标和小球的位置  domobject.getBoundingClientRect()
			
				//获取小球在页面中的位置
				const ballPosition=this.$refs.ball.getBoundingClientRect();
				//获取徽标在页面中的位置
				const badgePosition=document.getElementById('badge').getBoundingClientRect();
				
				const xDist=badgePosition.left-ballPosition.left;
				const yDist=badgePosition.top-ballPosition.top;
				/* console.log(xDist);
				console.log(yDist); */
				el.style.transform=`translate(${xDist}px,${yDist}px)`;
				el.style.transition='all 2s cubic-bezier(.4,-0.3,1,.68)';
				done();
				
			},
			afterEnter(el){
				this.ballFlag=!this.ballFlag
			},
			getSelectedCount(count){
				//当子组件把选中的数量值传递给父组件时，把选中的值保存到data上
				this.selectedCount=count
				console.log('父组件拿到的值为'+this.selectedCount)
			}
			
		},
		components: {
			swiper,
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.goodinfo-container {
		background-color: #eee;
		overflow: hidden;
		.ball{
			width:15px;
			height:15px;
			border-radius:50%;
			background-color:red;
			position:absolute;
			z-index:99;
			top:390px;
			left:150px;
			
		}
		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}
		.mui-card-footer{
			display: block;
			button{
				margin:10px;
			}
		}
	}

	
	
</style>
