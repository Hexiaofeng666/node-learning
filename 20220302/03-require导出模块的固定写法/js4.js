// 定义模块
define(['require'],function(require){

    const module = require('module')

    const num1 = 1,num2=2
    const hello = function(){
        alert('你好世界')
    }
    module.exports = {
        num1,
        num2,
        hello
    }
})