// 时钟周围的小圆点
// minute 第几个点
function Diamond(minute){
	console.log(minute)
	// 点与点之间的弧度
	this.minute = minute;
	this.angle = (2 * Math.PI) * this.minute / 60;
	Control.call(this);

}
// 原型的继承
Diamond.prototype = Object.create(Control.prototype);
// 添加构造函数
Diamond.prototype.constructor = Diamond;

// 重写父类的方法
Diamond.prototype.render = function(){
	Control.prototype.render.call(this);
	
}
Diamond.prototype.layout = function(){
	Control.prototype.layout.call(this);
	
	// 大小
	var size = this.minute % 5 == 0 ? 0.02 : 0.01;
	this.ele.style.width = Control.radius * size + 'px';
	this.ele.style.height = Control.radius * size + 'px';
//	console.log(this.minute)
	this.ele.style.borderRadius = '50%';
	
	//  cos     sin
	// 位置 
	this.ele.style.left = Control.clientWidth / 2 + Control.radius / 2.2 * Math.cos(this.angle) - Control.radius * size / 2 + 'px';
	this.ele.style.top = Control.clientHeight / 2 + Control.radius / 2.2 * Math.sin(this.angle) - Control.radius * size / 2 + 'px';
	
	
}





