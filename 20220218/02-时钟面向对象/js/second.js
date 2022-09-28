// 时钟的秒针

// 创建 Second 构造函数，让其继承与 Control
function Second(){
	// 继承属性，构造函数内的继承
	Control.call(this);
}
// 原型的继承
Second.prototype = Object.create(Control.prototype);
// 添加构造函数
Second.prototype.constructor = Second;

// 继续为 Second 的原型添加方法
// 该方法是为了创建标签时修改标签的初始状态
Second.prototype.renderSettings = function(){
	var args = {};
	args.zIndex = 9;
	args.color = 'red';
	args.duration = 60;
	args.delay = -(new Date().getSeconds());
	return args;
}


Second.prototype.render = function(){
	Control.prototype.render.call(this);
	
	var args = this.renderSettings();
	
	
	// this.ele 负责旋转
	this.ele.style.zIndex = args.zIndex;
	this.ele.style.backgroundColor = 'initial';
	this.ele.style.animation = 'rotates ' + args.duration + 's linear infinite';
	this.ele.style.animationDelay = args.delay + 's';
	
	
	
	// this.spanEle 负责显示
	this.spanEle = document.createElement('span');
	this.spanEle.style.backgroundColor = args.color;
	this.spanEle.style.display = 'block';
	this.ele.appendChild(this.spanEle);
	
}


// 继续在 Second 的原型上继续添加方法

Second.prototype.layoutSettings = function(){
	var args = {};
	args.eleScaleX = 0.01;
	args.eleScaleY = 0.8;
	args.spanEleScaleY = 0.5;
	return args;
}

Second.prototype.layout = function(){
	Control.prototype.layout.call(this);
	var args = this.layoutSettings();
	
	var r = Control.radius;
	
	// this.ele 负责旋转
	this.ele.style.width = r * args.eleScaleX + 'px';
	this.ele.style.height = r * args.eleScaleY + 'px';
	this.ele.style.top = Control.clientHeight / 2 - r * args.eleScaleY / 2 + 'px';
	this.ele.style.left = Control.clientWidth / 2 - r * args.eleScaleX / 2 + 'px';
	
	// this.spanEle 负责显示
	this.spanEle.style.width =  r * args.eleScaleX + 'px';
	this.spanEle.style.height =  r * args.spanEleScaleY + 'px';
	this.spanEle.style.borderRadius = r * args.eleScaleX + 'px';
	
}







