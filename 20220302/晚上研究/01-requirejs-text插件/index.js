// !隔开
// 相当于以libs/text插件导入resource/textc.css
require(['libs/text!resource/textc.css','libs/text!resource/texth.html','libs/text!resource/textt.txt'],function(cssStr,htmlStr,txtStr){
	
	console.log(cssStr);
	console.log(htmlStr);
	
	document.getElementById('style').innerText = cssStr;
	
	document.body.innerHTML = htmlStr + txtStr;
	
})

