// 时钟中间的小圆点
// 创建 Dot 构造函数，让其继承与 Control
function Dot(){
	// 继承属性，构造函数内的继承
	Control.call(this);
}
// 原型的继承
Dot.prototype = Object.create(Control.prototype);
// 添加构造函数
Dot.prototype.constructor = Dot;

// 继承的概念：
// 1. 子类继承父类，将拥有其所有属性和方法
// 2. 并且可以扩展自己的属性和方法

// 重写父类的方法
Dot.prototype.render = function(){
	Control.prototype.render.call(this);
	// 扩展此函数的功能
	this.ele.style.borderRadius = '50%';
	this.ele.style.zIndex = 10;
}

Dot.prototype.layout = function(){
	Control.prototype.layout.call(this);
	var r = Control.radius * 0.02;
	// 设置大小
	this.ele.style.width = r * 2 + 'px';
	this.ele.style.height = r * 2 + 'px';
	// 设置位置
	this.ele.style.top = Control.clientHeight / 2 - r + 'px';
	this.ele.style.left = Control.clientWidth / 2 - r + 'px';

}
