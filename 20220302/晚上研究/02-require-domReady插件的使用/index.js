require(['./libs/domReady'],function(dr){
	
	// dr 是一个函数，此函数需要传递一个回调函数
	console.log(dr);
	
	dr(function(){
		// 当 html 文件中标签比较多时，效果比较明显
		// domReady() 会在 html 文件中所有标签元素
		// 加载完毕后才会执行回调函数
		console.log('页面加载完毕');
	})
	
	
	// 原生 js 的加载完毕方法
//	document.onload
//	DOMContentLoaded
	
	
	// jQuery 的加载完毕方法
//	$(function(){
//		
//	});
	
	
	
})
