<template>
	<div class="shopcar-goodlist">
		<div class="goods-list">
			<!-- 商品列表区 -->
			<!-- 自定义假数据 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch>开关</mt-switch>
						<img src="http://47.102.206.147:8080/coffe/images/Latte.jpg" />
						<div class="info">
								<h1>这是一杯咖啡</h1>
								<p>
									<span class="price">￥2199</span>
									<span><numbox></numbox></span>
									<a href="#">删除</a>
								</p>
							</div>
					</div>
				</div>
			</div>
			<!-- 从服务器获取数据 -->
			<div class="mui-card" v-for="(item,i) in goodslist" :key='item.id'>
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesun" >
						<mt-switch @change="selectedChanged(item.id,$store.getters.getGoodSelected[item.id])" v-model="$store.getters.getGoodSelected[item.id]">开关</mt-switch>
						<img src="item.thumb_path" />
						<div class="info">
								<h1>{{item.title}}</h1>
								<p>
									<span class="price">￥{{item.sell_price}}</span>
									<span><numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox></span>
									<!-- 如何从购物车获取商品的数量
									 1.先创建一个空对象，循环购物车所有商品数据。
									 2.把当前循环这条商品id作为对象的属性名，count作为属性值
									 3.把所有循环完后，就会得到一个对象，-->
									<a href="#" @click.prevent="remove(item.id,i)">删除</a>
								</p>
							</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 结算区域 -->
		<div class="mui-card">
						<div class="mui-card-content">
							<div class="mui-card-content-inner jiesuan">
								<div class="left">
									<p>总计(不含运费)</p>
									<p>已勾选商品<span class="red">0{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价 <span class="red">￥0{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
								</div>
								<mt-button type="danger" size="small">去结算</mt-button>
							</div>
						</div>
						
		</div>
		<p>{{$store.getters.getGoodSelected}}</p>
	</div>
</template>

<script>
	import numbox from '../subcomponent/shopcar_numbox.vue'
	export default{
		data(){
			return {
				goodslist:[]//购物车中所有商品的数据
			}
		},
		created(){
			this.getGoodsList()
		},
		methods:{
			getGoodsList(){
				//获取到store所有商品的id拼接出一个，分割的字符串
				//获取购物车商品列表
				var idArr=[]
				this.$store.state.car.forEach(item=>idArr.push(item.id))
				if(idArr.length<=0){
					return
				}
				this.$http.get('api/goods/getshopcarlist'+idArr.join(',')).then(result=>{
					if(result.body.status===0){
						this.goodslist=result.body.message
					}
				})
			},
			remove(id,index){
				//点击删除，把商品从store中根据id删除。把当前组件中的goodlist中对应要删除的那个商品，使用index来删除
				this.goodslist.splice(index,1)
				this.$store.commit('removeFromCar',id)
			},
			selectedChanged(){
				//每当点击开关，把最新的开关状态
				console.log(id+'===='+val)
				this.$store.commit('updateGoodsSelected',{id,selected:val})
			}
		},
		components:{
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-goodlist{
		background-color: #EEEEEE;
		overflow: hidden;
		.goods-list{
			.mui-card-content-inner{
				display: flex;
				align-items: center;
				.info{
					p{
						display: flex;
						justify-content: space-between;
						font-size: 10px;
						text-align: center;
					}
				}
			}
			img{
				width: 60px;
				height: 60px;
			}
			h1{
				font-size: 15px;
				text-align: center;
			}
			.info{
				.price{
					color: red;
					font-weight: bold;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}
		}
		.jiesuan{
			display: flex;/* 在同一行 */
			justify-content: space-between;/* 两边对齐 */
			align-items: center; /* 纵向剧中*/
			.red{
				color: red;
				font-weight: bold;
				font-size: 16px;
			}
		}
	
	}
</style>
