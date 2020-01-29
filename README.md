# 这是一个项目
# author:wy\
# 第一次修改
# 用传统的方式把修改后的代码上传到码云上
## 1.命令行 git add .          git commit -m ""         git push -u origin master
## 2.vscode界面化
## 3.test

#制作首页APP组件
#完成header 组件区域，使用mint-ui中的header组件
#制做底部的Tabbar区域，使用的是MUI的Tabbar.html
#要在中间区域放置一个router-view 来展示路由匹配到的组件

#在制作购物车小图表时购物车操作会多一些，
1.首先把扩展图标的CSS样式拷贝到项目MUI-CSS-中
2.拷贝扩展字体库的ttf文件  font文件到项目MUI-FONT中
3.为购物车小图标添加图像样式，在appvue中。
4.main.js中引入第一步的.css文件

改造tabbar为router-link
设置路由高亮

点击tabbar中的路由链接展示对应的路由组件

制作首页轮播图布局，加载轮播图数据
使用vue-resource和this.$http.get获取数据
获取到的数据，要保存到data身上
使用v-for循环渲染每一个item项

改造九宫格区域样式

改造我们的新闻资讯 路由链接
绘制界面（使用MUI中的media-list.html），使用vue-resource获取数据，渲染真实数据

实现新闻咨询列表，点击跳转到新闻详情：第一步，把列表中的每一项改造成router-link同时，在跳转的时候应该提供唯一的ID标识符
创建新闻详情的组件页面NewsInfo.vue
在路由模块中，将新闻详情的路由地址和组件页面对应起来

实现新闻详情的页面布局和数据渲染

单独封装一个comment。vue组件
第一步创建一个模板，在使用该组件的页面中手动导入comment组件 import commont from './comment.vue'
在父组件中使用components属性，将导入的组件注册为自己的子组件
将注册子组件的名称以标签的形式在页面中引用

获取所有的评论数据显示到页面中，
实现点击加载更多评论的功能：
1.为按钮绑定事件，在事件中去请求下一页数据
2.点击加载更多，主要配置pageindex++,重新调用this.getComment方法。
3.为了防止新数据复制老数据，加载更多时：应该让老数据调用数组的contact方法拼接上新数据