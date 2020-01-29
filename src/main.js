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

//定义全局过滤器
import moment from 'moment'  //导入格式化时间插件
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
	return moment(dataStr).format(pattern)
})

import { Header,Swipe,SwipeItem,Button } from 'mint-ui'  //导入nint-ui需要的组件包及样式,并使用注册
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)  //注册一下导入的组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

var vm =new Vue({
	el:"#app",
	data:{},
	methods:{},
	render:c=>c(app),
	router //挂在路由对象到VM实例上
})