
// 如何利用 requireJs 加载 css 文件
// libs/css --> libs/css.js
// css/style --> css/style.css
// 中间以 '!' 隔开
require(['libs/css!css/style'],function(){
	// 其实 css.js 实现原理很简单，读取 css 文件内容，创建 style 
	// 标签，把 css 内容拼接进去，把 style 标签放到 head 中。
	alert('js和css资源加载完毕');
});

// 相比require-text插件，此插件自动创建style