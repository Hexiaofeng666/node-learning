/*
    npm 是目前最大的开源库生态系统,npm 是包管理工具
    模块的管理工具，可以进行安装卸载更新模块等操作
    npm: Node.js Package Manager

    创建项目：
    1. 先安装 npm ,npm 会随着 node.js 一起被安装，查看
       是否有 npm ,可以使用 npm -v 查看其版本号

    2. npm init 来创建一个 npm 项目，package.json 是项目
       的配置文件

    npm install express --save 安装一个模块包
    install 安装     express 模块名    
    --save 本地保存    -g 全局保存

    npm uninstall 模块名   卸载一个模块


*/ 

// require 是导入模块的函数，专门用来导入一个模块
const express = require('express')

// 通过 express 导入的函数来创建一个应用对象 app
const app = express()

// 配置服务器站点静态路径
app.use(express.static('wwwroot'))
// 当配置了服务器站点后会进入到指定路径找到 index.html 显示
// 如果没有配置服务器站点，请求就会进入到 / 方法中来
// request 请求对象
// response 响应对象
// app.get('/', (request, response) => {
    // send 响应结果，将后面的内容返回给页面
//     response.send('Hello World!')
// })


app.get('/getUser',(req,res)=>{
    console.log(req.query.object);
    console.log(req.query.age);
    res.send({
        name: '猛',
        age: '28',
        sex: false
    })
})
// 写一个 get 接口
app.get('/getUserInfo',(req,res)=>{

    let age
    if(req.query.name == '猛'){
        age = 18
    }else {
        age = 48
    }

    res.send(`
        <h1>
            用户名： ${req.query.name}
            <br />
            年龄： ${age}
        </h1>
    `)
})


app.listen('3000', () => {
    console.log(`服务器开启成功连接： http://localhost:3000`)
})