// 创建一个路由
const express = require('express')

const router = express.Router()

// 导入操作数据库集合的构造函数 Student
const Student = require('../module/mongoose')

// 添加学生信息的接口
router.post('/add', (req, res) => {
    // 添加信息的时间
    req.body.createTime = new Date()
    student.save((err) => {
        if(!err){
            res.redirect('/')
        }else{
            res.send('<script>location.href="/";alert("存储数据失败")</script>')
        }
    })
    // const arr = [
    //     '天',
    //     '地',
    //     '玄',
    //     '神',
    //     '小',
    //     '晓',
    //     '语',
    //     '牛',
    //     '青'
    // ]
    // const arr2 = [
    //     '张',
    //     '李',
    //     '王',
    //     '吴',
    //     '甘',
    //     '赵',
    //     '钱',
    //     '周',
    //     '何'

    // ]
    // const arr3 = [
    //     '陶',
    //     '桃',
    //     '套',
    //     '逃',
    //     '涛',
    //     '淘',
    //     '焘',
    //     '滔',
    //     '萄'

    // ]
    // const a = [true,false]
    // const n = ['1','2','3','4','5','6','7','8','9']
    // for (let i = 0; i < 10; i++) {
    //     req.body.name = arr2[Math.floor(Math.random()*8)] + arr[Math.floor(Math.random()*8)] + arr3[Math.floor(Math.random()*8)]
    //     req.body.age = Math.floor(Math.random()*100)
    //     req.body.gender =  a[Math.floor(Math.random()*2)]
    //     req.body.phone = '18' + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)]
    //     req.body.email =  + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + "@qq.com"
    //     req.body.detail = req.body.name + '真好看，像春天的花一样'
    //     const student = new Student(req.body)
    // }
    // res.redirect('/')


})









// 导出路由对象
module.exports = router