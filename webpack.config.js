const path=require("path")
const webpack=require('webpack')
//导入包 在内存中生成的HTML页面插件
const htmlWebpackPlugin=require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
module.exports={
	entry:path.join(__dirname,'./src/main.js'),
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'bundle.js'
	},
	mode:'development',
	devServer:{ //这是配置dev-server命令的第二种形式,相对来说较麻烦
		open:true,//自动打开浏览器
		port:3000,//设置浏览器启动端口
		//contentBase:'src',//托管根目录 这样加载不出来bootstrap文件暂时注释掉
		hot:true//启用热更新
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(), //new一个热更新对象.
		new htmlWebpackPlugin({
			//创建一个 在内存中生成html的插件
			template:path.join(__dirname,'./src/index.html'),//指定
			//指定模板页面,将来会根据路径去生成内存中的页面
			filename:'index.html'//指定生成的页面的名称
		}),
		  new VueLoaderPlugin(),
	],
	module:{
		//这个节点,用于配置所有 第三方模块和加载器
		rules:[
				//创建一个.css文件,然后import引入到main.js中,下载包,npm i ,配置rules
				//调用顺序从右到左.
			{test: /\.css$/,use:['style-loader','css-loader']},//配置处理.css文件的第三方loader规则转换
			{test: /\.less$/,use:['style-loader','css-loader','less-loader']},//这是处理less的第三方规则
			{test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},//这是处理.scss文件的第三方loader规则
			{test: /\.jpg|png|gif|bmp|jpeg$/,use:'url-loader?name=[name].[ext]'}, //处理图片路径的loader,只有一个url-loader所以不用数组
			//url-loader后边可以加参数,例如limit,给定的值是图片大小,单位是字节,如果参数值大于其大小,会转换成base64的.
			//name=[name].[ext]保留原来的名字和后缀名. 在[name]前放一个[hash:8]-[name]名字前放一个hash值
			{test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
			{test: /\.js$/,use:'babel-loader',exclude:/node_modules/ },
			//这是配置babel来转换ES6语法
			{test: /\.vue$/,use: 'vue-loader'}
			//处理vue文件的第三方loader
		]
	},
	resolve:{
		alias:{
			//"vue$":"vue/dist/vue.js" //设置vue被导入时的包的路径
		}
	},
}