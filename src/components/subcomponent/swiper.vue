<template>
	<div>
		<mt-swipe :auto='4000'>
			<mt-swipe-item>
				<img src="http://47.102.206.147:8080/coffe/images/cooker.jpg" :class="{full:isfull}"/>
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="http://47.102.206.147:8080/coffe/images/banner.jpg" :class="{full:isfull}"/>
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="http://47.102.206.147:8080/coffe/images/Latte.jpg" :class="{full:isfull}"/>
			</mt-swipe-item>
		</mt-swipe>
	</div>
	<!-- 1.首页中的图片宽和高都使用了100%的宽度
		2.在商品详情页面中，轮播图的图片如果使用宽高100%的话，页面不好看
		3.经过分析，首页轮播图和详情页面中的轮播图一个是宽度百分百，一个是自适应
		4.定义一个属性手动调动作为参数-->
</template>

<script>
	export default{
		props:['lunbotuList','isfull']
	}
</script>

<style lang="scss" scoped>
	.mint-swipe {
		height: 200px;
	
		.mint-swipe-item {
			text-align: center;
			/* &:nth-child(1) {
				background-color: red;
			}
	
			&:nth-child(2) {
				background-color: greenyellow;
			}
	
			&:nth-child(3) {
				background-color: blue;
			} */
			img{
				height: 100%;
				
			}
			
		}
	}
	.full{
		width: 100%;
		
	}
</style>
