// 服务器的创建
const express = require('express')

const app = express()

app.use(express.static('wwwroot'))

app.use(express.urlencoded({extended:true}))

const template = require('art-template')

app.use(require('./routers/view.js'))

app.use('/student',require('./routers/student'))







app.listen('3000',()=>{
    console.log('开启成功...http://localhost:3000/');
})