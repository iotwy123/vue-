//入口文件
import Vue from 'vue'		//导入Vue包

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的路由模块
import router from './router.js'
import app from './app.vue'		//导入app组件 
//2.1导入vue-resource
//2.2安装vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root='http://vue.studyit.io'  //例如:'http://vue.studyit.io'设置全局根路径
Vue.http.options.emulateJSON=true;		//全局设置post表单数据提交格式

//定义全局过滤器
import moment from 'moment'  //导入格式化时间插件
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
	return moment(dataStr).format(pattern)
})
import MintUI from 'mint-ui'   //样式全部加载
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'  //导入mint-ui需要的组件包及样式,并使用注册
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)  //注册一下导入的组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次进入网站会调用main.js,在调用的时候把本地存储中,把购物车的数据读出来放到store中
var car=JSON.parse(localStorage.getItem('car')||'[]')
var store=new Vuex.Store({
	state:{
		//this.$store.state.***
		//car:car
		car:[],//将购物车商品的数据用一个数组存储起来,在car数组存储一些商品的对象,
		
	},
	mutations:{
		//this.$store.commit('方法的名称',传递唯一的参数)
		addToCar(state,goodsinfo){
			//点击加入购物车,把信息保存到car数组中
			//分析:1.如果购物车之前就已经有对应的商品只需要更新数量即可
			//2.如果没有,则把商品数据push到car中即可
			var flag=false  //假设购物车中没有找到对应的商品
			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count+=parseInt(goodsinfo.count)
					flag=true
					return true
				}
			})
			//最终循环完毕,得到的仍是false把商品放到购物车中
			if(!flag){
				state.car.push(goodsinfo)
			}
			
			//当更新car之后把car数组存储都本地localstorage中
			localStorage.setItem('car',JSON.stringify(state,car))
		},
		updateGoodIfo(state,goodsinfo){
			//修改购物车中商品的数量值
			//分析:
			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count=parseInt(goodsinfo.count)
					return true
				}
			})
			//修改完商品数量,把最新的数量保存到本地存储中
			localStorage.setItem('car',JSON.stringify(state,car))
		},
		removeFromCar(state,id){
			//根据Id,从store中的购物车中删除对应的那条商品数据
			state.car.some((item,i)=>{
				if(item.id==id){
					state.car.splice(i,1)
					return true
				}
			})
			//将删除完毕后的购物车数据同步到本地存储
			localStorage.setItem('car',JSON.stringify(state,car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id==info.id){
					item.selected=info.selected
				}
			})
			//把最新的所有购物车商品状态保存到store中去
			localStorage.setItem('car',JSON.stringify(state,car))
		}
	},
	getters:{
		//this.$store.getters.***
		//相当于计算属性,也相当于filter
		getAllCount(state){
			var c=0
			state.car.forEach(item=>{
				c+=item.count
			})
			c=1
			return c
		},
		getGoodsCount(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.count
			})
			return o
		},
		getGoodSelected(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state){
			var o={
				count:0,   //勾选的数量
				amount:0	//勾选的总价
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count+=item.count
					amount+=item.price*item.count
				}
			})
			return o
		}
	},
})

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


var vm =new Vue({
	el:"#app",
	data:{},
	methods:{},
	render:c=>c(app),
	router ,//挂在路由对象到VM实例上
	store//挂载store状态管理对象
})