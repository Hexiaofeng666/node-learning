// 定义模块
define(['exports'],function(exports){
    const num1 = 1,num2=2
    const hello = function(){
        alert('你好世界')
    }
    exports.obj = {
        num1,
        num2,
        hello
    }
})