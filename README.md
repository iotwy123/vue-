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