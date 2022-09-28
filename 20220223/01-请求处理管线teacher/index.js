
const express = require('express')

const app = express()

// 请求处理管线中的一个函数
// next 下一个等待处理的请求回调函数
function firstFun(req,res,next){
    console.log(req.query.name);
    // 当前函数中的所有内容执行完毕后，可以进行回调下一个处理函数
    next()
}

function secondFun(req,res,next){
    console.log(req.query.age);
    
    next()
}

function isLogin(req,res,next){
    if(req.cookie){
        // 登录了
    }else {
        // 未登录
    }
}

function charSet(req,res,next){
    res.set('Content-type', 'text/html;charset=utf-8');
    console.log('通用的功能，可以进行响应头编码设置，或跨域问题的处理');
    next()
}

// app.use 可以在默认处理管线中添加一个回调函数，每次请求
// 的时候都会先来执行默认处理管线中的回调函数，然后才会执行
// 各自接口的处理管线中的回调函数
app.use(charSet)

app.get('/',isLogin,firstFun, secondFun,(req,res)=>{
    console.log('请求 / 接口成功了...');

    res.send('收到来自 / 的请求')
})

app.get('/index/:age',(req,res)=>{
    console.log(req.params.age);
    res.send('收到来自 /index 的请求')
})

app.listen('3000',()=>{
    console.log('服务器启动成功...点击http://localhost:3000/');
})
