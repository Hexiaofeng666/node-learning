// 创建一个路由
const express = require('express')
const router = express.Router()
// 导入操作数据库集合的构造函数 Student
const Student = require('../module/mongoose')


// 进去添加页面
router.get('/add', (req, res) => {
    const render = require('../views/add.art')
    const htmlStr = render({
        title: '神奇添加',
        submitVal:'添加'
    })
    // console.log(render);
    res.status(200).send(htmlStr)
})
// 进去修改页面
router.get('/edit', (req, res) => {


    // 通过id查询到该学生的所有信息
    Student.findOne({
        _id: req.query.id
    }, (err, data) => {
        if (!err) {
            const render = require('../views/add.art')
            const htmlStr = render({
                title: '神奇修改',
                student:data,
                submitVal:'修改'
            })
            // console.log(render);
            res.status(200).send(htmlStr)
        }else{
            res.status(200).send('查询失败')
        }
    })

})

// console.log(getShowPages(10,11))

// 导出路由对象
module.exports = router