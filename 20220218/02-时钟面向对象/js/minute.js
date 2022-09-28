// 时钟的分针

// 创建 Minute 构造函数，让其继承与 Second
function Minute(){
	Second.call(this);
}
Minute.prototype = Object.create(Second.prototype);
Minute.prototype.constructor = Minute;

// 重写父类的方法
Minute.prototype.renderSettings = function(){
	var args = {};
	args.zIndex = 8;
	args.color = 'blue';
	args.duration = 60 * 60;
	args.delay = -(new Date().getMinutes() * 60) - (new Date().getSeconds());
	return args;
}
Minute.prototype.layoutSettings = function(){
	var args = {};
	args.eleScaleX = 0.015;
	args.eleScaleY = 0.7;
	args.spanEleScaleY = 0.4;
	return args;
}



