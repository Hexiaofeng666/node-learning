
const express = require('express')

// 创建路由对象

const page = express.Router()


page.get('/getPage',(req,res)=>{
    res.send('获取页面成功')
})
page.get('/setPage',(req,res)=>{
    res.send('添加页面成功')
})

module.exports = page