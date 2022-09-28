// 创建一个路由
const express = require('express')
const router = express.Router()
// 导入操作数据库集合的构造函数 Student
const Student = require('../module/mongoose')


// 进去添加页面
router.get('/addclass', (req, res) => {
    const render = require('../views/add.art')
    const htmlStr = render({
        title: '神奇添加',
        submitVal:'添加'
    })
    // console.log(render);
    res.status(200).send(htmlStr)
})

// 导出路由对象
module.exports = router