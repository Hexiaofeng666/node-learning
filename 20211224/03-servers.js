/*
    JavaScript 是一种脚本语言，本身并不能编译执行，最早时期只作为浏览器的脚本，
    只能够在浏览器中执行(JavaScript必须依赖一个运行环境，作为载体才能够执行)

    node.js 是一个 JavaScript 的运行环境，可以独立于浏览器，所以能够让 JavaScript
    脱离浏览器，然后单独执行

    node.js 可以用于服务器开发，可以创建一个服务器环境

*/ 

console.log('人民币的单位是元，为什么到比人那里会变成万或者是亿？');
// 在 node.js 中没有 alert 这个函数，所以不能使用
// alert('你猜我会不会出来呢？')

let a = 2,b = 5

console.log(a + b)

let timer = new Date()

console.log(timer);
// 在 node.js 中对 DOM 所有操作都无效 document
// console.log(document);

// 在 node.js 中无 window 对象
// console.log(window);

setTimeout(()=>{
    console.log('定时器和延迟都可以正常使用');
},1000)

// 测试：数组，对象，for 循环能否使用

let arr = [1,2,3,4,5,6,7,8,9]

arr.forEach((num,index,arr)=>{
    console.log(num,index);
})

let obj = {
    name: '猛',
    age: 28,
    sex: '女'
}
console.log(obj.name);

for(let i = arr.length - 1;i >= 0; i--){
    console.log(arr[i]);
}

// 定义一个带参数且有返回值的函数
function add(num1,num2){
    return num1 * num2
}

console.log(add(2,8));