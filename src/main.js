//入口文件
import Vue from 'vue'		//导入Vue包

import app from './app.vue'		//导入app组件 

import { Header } from 'mint-ui'  //导入nint-ui需要的组件包及样式,并使用注册
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)

import './lib/mui/css/mui.css'

var vm =new Vue({
	el:"#app",
	data:{},
	methods:{},
	render:c=>c(app)
	
})