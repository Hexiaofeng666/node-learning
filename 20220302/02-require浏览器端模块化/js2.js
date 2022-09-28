


// 定义模块的时候
define(['js1'],function (js1) {
    console.log(js1);
    function fun(){
        console.log('这是js2中的函数');
    }
    // 在js2中定义与js1同名变量依然会产生覆盖问题
    var num = 999
    return {
        num,
        fun,
        js1
    }
})