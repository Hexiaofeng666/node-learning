// 作为一个基类，让点、时、分、秒等都直接继承或
// 间接的继承 contorl

function Control(){
	this.render();
	this.layout();
}

// 创建标签的方法
Control.prototype.render = function(){
	this.ele = document.createElement('div');
	this.ele.style.backgroundColor = 'black';
	this.ele.style.position = 'absolute';
	document.body.appendChild(this.ele);
}
// 布局界面的方法 (位置和大小)
Control.prototype.layout = function(){
	// 因为每个创建出来的元素位置我们是不知道的
	// 所以这里我们将此方法加上，创建的时候再
	// 进行位置调整
}
//Control.prototype.resizeWindow 和 Control.resizeWindow
//的区别，一个是属于原型的方法，需要用实例(对象)去调用，一个是
//属于构造函数的方法，需要用构造函数去调用
// 获取尺寸大小的方法
Control.resizeWindow = function(){
	console.log(document)
	console.log(document.documentElement)
	Control.clientWidth = document.documentElement.clientWidth;
	Control.clientHeight = document.documentElement.clientHeight;
	// radius 半径
	Control.radius = Math.min(Control.clientWidth,Control.clientHeight);
}
// 因为这里是构造函数的方法，我们直接进行使用构造函数进行
// 调用
Control.resizeWindow()



