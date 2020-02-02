<template>
	
		<div class="goods-list">
			
			<router-link class="goods-item" to='/home/goodinfo'>
				<img src="http://47.102.206.147:8080/coffe/images/Latte.jpg" />
				<h1 class='title'>
					华为某某手机
				</h1>
				<div class="info">
					<p class="price">
						<span class="now">￥899</span>
						<span class="old">￥999</span>
					</p>
					<p class="sell">
						<span>热卖中</span>
						<span>剩60件</span>
					</p>
				</div>
			</router-link>
			<!-- 通过vue的方法进行路由条转，通过JS实现，具体函数是router.push -->
			<div class="goods-item" @click="godetail()">
				<img src="http://47.102.206.147:8080/coffe/images/Latte.jpg" />
				<h1 class='title'>
					华为某某手机
				</h1>
				<div class="info">
					<p class="price">
						<span class="now">￥899</span>
						<span class="old">￥999</span>
					</p>
					<p class="sell">
						<span>热卖中</span>
						<span>剩60件</span>
					</p>
				</div>
			</div>
			<div class="goods-item">
				<img src="http://47.102.206.147:8080/coffe/images/Latte.jpg" />
				<h1 class='title'>
					华为某某手机
				</h1>
				<div class="info">
					<p class="price">
						<span class="now">￥899</span>
						<span class="old">￥999</span>
					</p>
					<p class="sell">
						<span>热卖中</span>
						<span>剩60件</span>
					</p>
				</div>
			</div>
			<!-- 服务器获取数据 -->
			<router-link class="goods-item" v-for='item in goodslist' :key='item.id'  to="'/home/goodinfo'+item.id" tag="div">
				<img src="item.img_url" />
					<h1 class='title'>
						{{item.title}}
					</h1>
					<div class="info">
						<p class="price">
							<span class="now">￥{{item.sell_pricr}}</span>
							<span class="old">￥{{item.market_price}}</span>
						</p>
						<p class="sell">
							<span>热卖中</span>
							<span>剩{{item.stock_quantity}}件</span>
						</p>
					</div>
				</router-link>
				<!-- 换一种加载路由的形式 -->
				<!-- 1.使用a标签  2.使用window.location.href（js语句） -->
				<div class="goods-item" v-for='item in goodslist' :key='item.id' @click="godetail()" >
					<img src="item.img_url" />
						<h1 class='title'>
							{{item.title}}
						</h1>
						<div class="info">
							<p class="price">
								<span class="now">￥{{item.sell_pricr}}</span>
								<span class="old">￥{{item.market_price}}</span>
							</p>
							<p class="sell">
								<span>热卖中</span>
								<span>剩{{item.stock_quantity}}件</span>
							</p>
						</div>
					</div>
				
				
				<mt-button type="danger" size='large'>加载更多 </mt-button>
		</div>
		
	
</template>

<script>
	export default{
		data(){
			return {
				//data是往组件内部挂在私有数据
				pageindex:1,
				goodslist:[],//存放商品列表的数组
			}
		},
		created(){
			this.getGoodList()
		},
		methods:{
			getGoodList(){
				//获取商品列表
				this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
					if(result.body.status===0)
					{
						//this.goodslist=result.body.message
						//拼接，一般使用在加载更多上
						this.goodslist=this.goodslist.concat(result.body.message)
						
					}
				})
			},
			getMore(){
				this.pageindex++
				this.getGoodList()
			},
			godetail(){
				//JS方式进行路由跳转
				//vue-router编辑式导航通过router的实例方法
				//注意要区分this.$route和this.$router这两个对象，其中this.$route路由参数对象
				//所有路由中的参数params query 都属他
				//this.$router是一个路由导航对象用它可以方便的使用JS代码，实现路由的条转
				//第一种传递路由路径
				//this.$router.push('/home/goodinfo')
				//第二种传递路由对象
				//this.$router.push({path:'/home/goodinfo'})
				//第三种传递自定义路由名称，在router.js中
				this.$router.push({name:'goodinfo'})
				//this.$router.push({name:'goodinfo',params:{id}}) //含参数的形式
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		padding: 7px;
		justify-content: space-between;
		
		.goods-item{
			width: 49%;
			padding: 2px;
			border: 1px solid #CCCCCC;
			box-shadow: 0 0 8px #CCCCCC;
			margin: 3px 0px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;/* 上下对齐 */
			min-height: 293px;
			img{
				width:100%
			}
			.title{
				font-size:14px;
			}
			.info{
				background-color: #E3E3E3;
				p{
					margin: 0;
					padding: 5px;
				}
				.price{
					
					.now{
						color: red;
						font-weight: bold;
						font-size: 16px;
					}
					.old{
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.sell{
					display: flex;
					justify-content: space-between;
					font-size: 13px;
				}
			}
		}
	}
</style>
