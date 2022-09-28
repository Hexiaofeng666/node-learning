const express = require('express')
const fs = require('fs')
const template = require('../module/template')
// const formatCookie = require('../module/cookie')
// 创建一个新路由
const router = express.Router()



// 获取登录页面的接口
router.get('/login-page',(req,res)=>{
    console.log('你妈的');
    const render = require('../wwwroot/login.art')
    const htmlStr = render({title: '登录'})
    res.status(200).send(htmlStr)
})

// 去注册页面的接口
router.get('/register-page',(req,res)=>{
    const render = require('../wwwroot/register.art')
    const htmlStr = render({title: '注册'})
    res.status(200).send(htmlStr)
})


// 发表问题的页面跳转接口
router.get('/update-page',(req,res)=>{
    const render = require('../wwwroot/update.art')
    const htmlStr = render({title: '更新'})
    res.status(200).send(htmlStr)
})


// 回答问题的页面跳转接口
router.get('/delete-page',(req,res)=>{
    const render = require('../wwwroot/delete.art')
    const htmlStr = render({title: '删除'})
    res.status(200).send(htmlStr)
})

// 导出路由对象
module.exports = router