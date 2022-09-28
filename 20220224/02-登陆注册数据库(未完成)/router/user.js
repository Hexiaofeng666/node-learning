const express = require('express')

// 创建一个新路由
const router = express.Router()

const fs = require('fs')


// 导入mongoose
const mongoose = require('mongoose')

// 设置连接数据库地址,h5-2109是数据库的名称，如果没有此数据库，则会自动创建
mongoose.connect('mongodb://localhost:27017/h5-20220224')
// 连接数据库
const db = mongoose.connection

// 监听数据库连接的状态
db.on('open', function () {
    console.log('数据库连接成功');
})
db.on('error', function () {
    console.log('数据库连接失败');
})

// 获取 Scheme 对象（图表结构对象）
const Scheme = mongoose.Schema

// 创建一个数据结构表
// 参数一：集合的结构
// 参数二：集合的名称
const userScheme = new Scheme({
    username: String,
    psw: String
}, {
    // 获取一行数据的构造函数
    collection: 'test-user'
})

const User = mongoose.model('user', userScheme)


// ----------------------- 注册 -----------------------
router.get('/register', (req, res) => {
    console.log(req.query.username);
    User.find({
        username: req.query.username
    }, (err, data) => {
        if (!err) {
            if (data.length != 0) {
                res.send('数据已经存在!' + data)
                return
            } else if (req.query.psw != req.query.repsd) {
                res.send('密码不一致')
                return
            } else {
                // res.send('密码一致，注册成功')
                // 根据User构造函数，来创建一个user对象
                const user = new User(req.query)

                // 储存
                user.save((err, data, status) => {
                    console.log('---------');
                    // console.log(data);
                    console.log('---------');
                    if (!err) {
                        res.send('密码一致，注册成功')
                    } else {
                        res.send('添加失败')
                    }
                })
            }
            // console.log(data);
        }
    })
})
// ----------------------- 删除 -----------------------
// router.get('/remove', (req, res) => {
//     console.log(req.query.username);
//     User.find({
//         username: req.query.username
//     }, (err, data) => {
//         if (!err) {
//             if (data.length != 0) {
//                 res.send('数据已经存在!' + data)
//                 return
//             } else if (req.query.psw != req.query.repsd) {
//                 res.send('密码不一致')
//                 return
//             } else {
//                 // res.send('密码一致，注册成功')
//                 // 根据User构造函数，来创建一个user对象
//                 const user = new User(req.query)

//                 // 储存
//                 user.save((err, data, status) => {
//                     console.log('---------');
//                     // console.log(data);
//                     console.log('---------');
//                     if (!err) {
//                         res.send('密码一致，注册成功')
//                     } else {
//                         res.send('添加失败')
//                     }
//                 })
//             }
//             // console.log(data);
//         }
//     })
// })



// 导出路由对象
module.exports = router