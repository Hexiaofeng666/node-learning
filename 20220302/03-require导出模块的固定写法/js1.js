// define用来定义一个模块
define(function(){
    const num1 = 1,num2=2
    const hello = function(){
        alert('你好世界')
    }
    // 导出一个模块
    return{
        num1,
        num2,
        hello
    }
})