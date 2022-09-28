const express = require('express')

const app = express()

app.use(express.static('wwwroot'))


// 导入mongoose
const mongoose = require('mongoose')
// 设置链接数据库地址,h5-2109是数据库的名称,如果没有此数据库则自动创建
mongoose.connect('mongodb://localhost:27017/h5-2109')
// 链接数据库
const db = mongoose.connection
// 监听数据库链接状态
db.on('open', function () {
    console.log('数据库链接成功');
})
db.on('error', function () {
    console.log('数据库链接失败');
})

const Scheme = mongoose.Schema
// 获取Scheme 对象(图表结构对象)
// 参数一：集合的结构
// 参数二：集合的名称
const uesrScheme = new Scheme({
    name: String,
    age: Number
}, {
    collation: 'test-user'
})

// 根据User 构造函数，来创建一个user对象
const User = mongoose.model('user', uesrScheme)

app.get('/add', (req, res) => {
    console.log(req.query);
    const user = new User(req.query)

    // 储存
    user.save((err, data, status) => {
        if (!err) {
            res.send('添加成功')
        } else {
            res.send('添加失败')
        }
    })
})

app.get('/select', (req, res) => {

    if (req.query.name) {
        // 根据名字查询
        // User.find({name:req.query.name},(err,data)=>{
        //     if(!err){
        //         res.send('查询成功：' + data)
        //         console.log(data);
        //     }
        // })
    } else {
        // 无条件查询，查询出全部内容
    }

    User.find(req.query, (err, data) => {
        res.send('查询成功：' + data)
    })

    // res.send('查询成功：')
    // User.find((err,data)=>{
    //     res.send('查询成功：' + data)
    // }).sort({age:-1}).limit(1)

    // 查询出年龄小于30
    // User.find({age: {$lte: 30}},(err,data)=>{
    //         res.send('查询成功：' + data)
    //     })



})
// 修改
app.get('/update',(req,res)=>{
    User.updateOne({name: req.query.name},{age: req.query.age},(err,result)=>{
        if(!err){
            console.log(result);
            if(result.nModified > 0){
                // 有修改
                res.send('修改成功')
            }
            else{
                // 值没有变或者没有修改
                res.send('修改失败')
            }
        }
    })
})

// 删除
app.get('/remove',(req,res)=>{
    // 删除年龄最大的
    User.find((err,data)=>{
        const user = data[0]

        // res.send(user)
        User.remove({_id: user._id},(err)=>{
            if(!err){
                // 删除的数量
                console.log(d.deletedCount);
                res.send('删除年龄最大的成功')
            }
        })
    }).sort({age:-1}).limit(1)
})


app.listen('3000', () => {
    console.log('服务器开启成功....');
})
