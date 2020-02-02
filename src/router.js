//导入VUE-ROUTER npm包 import 包,VUE.USE一下
import VueRouter from 'vue-router'
//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/newslist.vue'
import NewsInfo from './components/news/newsinfo.vue'
import PhotoList from './components/photos/photolist.vue'
import PhotoInfo from './components/photos/photoinfo.vue'
import GoodList from './components/goods/goodlist.vue'
import GoodInfo from './components/goods/goodinfo.vue'
import GoodsDesc from './components/goods/goodsdesc.vue'
import GoodsComment from './components/goods/goodscomment.vue'
var router =new VueRouter({
	routes:[
		{path:'/',redirect:'./home'},//路由重定向,把/重定向成./home这个路径
		{path:'/home', component:HomeContainer},
		{path:'/member',component:MemberContainer},
		{path:'/shopcar',component:ShopcarContainer},
		{path:'/search',component:SearchContainer},
		{path:'/home/newslist',component:NewsList},
		{path:'/home/newsinfo/:id',component:NewsInfo},
		{path:'/home/photolist',component:PhotoList},
		{path:'/home/photoinfo/:id',component:PhotoInfo},
		{path:'/home/goodlist',component:GoodList},
		{path:'/home/goodinfo/:id',component:GoodInfo},
		{path:'/home/goodinfo/',component:GoodInfo,name:'goodinfo'},
		{path:'/home/goodsdesc',component:GoodsDesc},
		{path:'/home/goodscomment',component:GoodsComment},
	],
	linkActiveClass:'mui-active'  //覆盖默认的路由高亮类
})

//把路由对象暴露出去
export default router