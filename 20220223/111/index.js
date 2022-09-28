
const express = require('express')

const app = express()

const user = require('./user')
const page = require('./page')
// 创建一个路由
// const router_bpp = express.Router()

// app.get('/api',(req,res)=>{
//     res.send('api请求成功')
// })
// router_bpp.get('/bpi',(req,res)=>{
//     res.send('bpi请求成功')
// })
// app.use('/',router_bpp)

app.use('/user',user)
app.use('/page',page)

app.listen('3006',()=>{
    console.log('服务器启动成功http://localhost:3006/page/getPage');
    console.log('服务器启动成功http://localhost:3006/user/getUser');
})