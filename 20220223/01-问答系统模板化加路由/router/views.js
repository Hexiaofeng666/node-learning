const express = require('express')
const fs = require('fs')
const template = require('../module/template')
const formatCookie = require('../module/cookie')
// 创建一个新路由
const router = express.Router()

// ----------------------- 获取首页数据 -----------------------
router.get('/',(req,res)=>{
    let petname = ''
    if(req.headers.cookie){
        petname  = formatCookie(req.headers.cookie,'petname')        
    }
    // 获取所有文件
    fs.readdir('querstion',(err,files)=>{
        if(err){
            // 读取文件失败
            res.status(200).json({
                code: '6001',
                message: '系统错误，文件读取失败'
            })
        }else {
            // 读取文件成功
            // 将数组反序排列，目的是让最近的数据显示在最上面
            files = files.reverse()
            console.log(files);
            // 创建一个数组容器，存放所有的问题对象
            let querstions = []
            for(let i = 0; i < files.length; i++){
                const file = files[i]
                // 拼接文件路径
                const filePath = 'querstion/' + file
                // 获取文件中的内容
                const data = fs.readFileSync(filePath)
                const obj = JSON.parse(data)
                querstions.push(obj)
            }

            // 模板化渲染页面
            // let render = require('./wwwroot/index.art')

            console.log(__dirname);
            // template
            let htmlStr = template(__dirname + '/../wwwroot/index.art',{querstions,petname,title: '首页'})

            // const render = require('../wwwroot/index.art')
            res.status(200).send(htmlStr)
        }
    })

})
// ----------------------- 获取首页数据 -----------------------
// 去注册页面的接口
router.get('/register-page',(req,res)=>{
    const render = require('../wwwroot/register.art')
    const htmlStr = render({title: '注册'})
    res.status(200).send(htmlStr)
})
// ----------------------- 登录 -----------------------
// 获取登录页面的接口
router.get('/login-page',(req,res)=>{
    const render = require('../wwwroot/login.art')
    const htmlStr = render({title: '登录'})
    res.status(200).send(htmlStr)
})
// ----------------------- 上传头像 -----------------------
router.get('/user-page',(req,res)=>{
    const render = require('../wwwroot/userInfo.art')
    const htmlStr = render({title: '个人资料'})
    res.status(200).send(htmlStr)
})
// ----------------------- 发表问题 -----------------------
// 发表问题的页面跳转接口
router.get('/ask-page',(req,res)=>{
    const render = require('../wwwroot/ask.art')
    const htmlStr = render({title: '提问'})
    res.status(200).send(htmlStr)
})
// ----------------------- 回答问题 -----------------------
// 回答问题的页面跳转接口
router.get('/answer-page',(req,res)=>{
    const render = require('../wwwroot/answer.art')
    const htmlStr = render({title: '回答'})
    res.status(200).send(htmlStr)
})





// 导出路由对象
module.exports = router