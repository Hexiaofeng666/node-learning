
const express = require('express')

// 创建路由对象

const router = express.Router()


router.get('/getPage',(req,res)=>{
    res.send('获取页面成功')
})
router.get('/setPage',(req,res)=>{
    res.send('添加页面成功')
})

module.exports = router