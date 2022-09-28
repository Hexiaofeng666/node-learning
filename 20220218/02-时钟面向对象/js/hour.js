// 时钟的分针

// 创建 Hour 构造函数，让其继承与 Second
function Hour(){
	Second.call(this);
}
Hour.prototype = Object.create(Second.prototype);
Hour.prototype.constructor = Hour;


// 重写父类的方法
Hour.prototype.renderSettings = function(){
	var args = {};
	args.zIndex = 7;
	args.color = 'black';
	args.duration = 60 * 60 * 12;
	args.delay = -(new Date().getHours() * 60 * 60) - (new Date().getMinutes() * 60) - (new Date().getSeconds());
	return args;
}
Hour.prototype.layoutSettings = function(){
	var args = {};
	args.eleScaleX = 0.02;
	args.eleScaleY = 0.5;
	args.spanEleScaleY = 0.3;
	return args;
}



