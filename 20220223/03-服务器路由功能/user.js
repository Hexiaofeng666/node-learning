
const express = require('express')

// 创建路由对象

const router = express.Router()


router.get('/getUser',(req,res)=>{
    res.send('获取用户成功')
})
router.get('/setUser',(req,res)=>{
    res.send('添加用户成功')
})

module.exports = router