// require 是用来导入一个模块用的
const express = require('express')

// 创建服务器对象
const app = express()


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 设置服务器静态资源文件，服务器根目录
// ** 注意：文件名一定要和这里设置的路径名一样 **
app.use(express.static('wwwroot'))

/*
    get 请求和 post 请求的区别
    get 请求：
    get 请求会将请求的数据附加在 URL 后面（会将信息暴露出来），参数是用 ? 拼接，多
    个参数之间使用 & 符号进行连接
    get 请求因为参数是拼接在 URL 后面的，所以浏览器和服务器会对 URL 进行长度的
    限制，因此 get 请求不合适做大量数据传输
    get 请求会将所有的用户信息或者其他重要参数暴露出来所以不够安全

    post 请求：
    post 请求会将请求的数据放在请求体中，参数不会被暴露出来
    post 请求的参数是放在请求体中的，所以理论上是无长度限制的，服务端是可以进行数据
    大小的限制，如果需要传递大量数据时，建议使用 post 请求
    post 相对比 get 更加安全，因为参数是不会暴露出来
*/ 



app.get('/getUser',(req,res)=>{
    res.send(`
        <h1>
        /getUser 请求成功，获取的用户是 小猛
        </h1>
    `)
})

const userArr = []

app.get('/addUser',(req,res)=>{

    // 在这里要获取到用户提交的信息
    console.log(req.query.userName);
    userArr.push(req.query.userName)
    res.send(`
        <h1>
            添加用户 ${userArr} 成功
        </h1>
    `)
})


app.post('/postUser', function (req, res) {
    console.log(req.body);
    res.send(`
    <h1>
        添加用户 ${userArr} 成功
    </h1>
`)
  })


app.listen('3000',()=>{
    console.log('服务器开启成功...');
})
