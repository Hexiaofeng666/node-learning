const express = require('express')

const app = express()

app.use(express.static('wwwroot'))

// 导入mongoose
const mongoose = require('mongoose')

// 设置连接数据库地址,h5-2109是数据库的名称，如果没有此数据库，则会自动创建
mongoose.connect('mongodb://localhost:27017/h5-2109')
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
    name: String,
    age: Number
}, {
    // 获取一行数据的构造函数
    collection: 'test-user'
})

const User = mongoose.model('user', userScheme)

app.get('/add', (req, res) => {

    console.log(req.query);

    // 根据User构造函数，来创建一个user对象
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
        // User.find({name: req.query.name},(err,data)=>{
        //     if(!err){
        //         // 查询成功
        //         res.send('查询成功' + data)
        //         // console.log(data);
        //     }
        // })
    } else {
        // 无条件查询，查询出全部内容
    }

    // 如果 req.query 中有内容，那么该内容就会是查询条件
    // 如果 req.query 中无内容，那么该内容就会查询所有数据
    User.find(req.query,(err,data)=>{
        res.send('查询成功:' + data)
    })

    // 查询年龄最大的
    // .sort({age:-1}) 排序条件，年龄从大往小排列
    // User.find((err,data)=>{
    //     // res.send('查询成功' + data[0])
    //     res.send('查询成功' + data)
    // }).sort({age:-1}).limit(1)

    // 查询年龄最小的
    // User.find((err,data)=>{
    //     // res.send('查询成功' + data[0])
    //     res.send('查询成功' + data)
    // }).sort({age:1}).limit(1)

    // 查出年龄小于30的人  &lt小于  &gt大于
    // User.find({age:{$lte: 30}},(err,data)=>{
    //         // res.send('查询成功' + data[0])
    //         res.send('查询成功' + data)
    //     })

    // .find({$or:[{条件1},{条件2}]}); 查找所有满足条件1或条件2的数据。
    // User.find({$or:[{name:'何某'},{name:'何某锋'}]},(err,data)=>{
    //         // res.send('查询成功' + data[0])
    //         res.send('查询成功' + data)
    //     })
        
    // 查询条数
    // User.find(req.query,(err,data)=>{
    //     res.send('查询成功:' + data)
    // }).count()
    
    // 跳过查询结果前2条数据,且只查询出一条
    // User.find(req.query,(err,data)=>{
    //     res.send('查询成功:' + data)
    // }).skip(2).limit(1)

    // 删除 .remove({查询条件})
    // User.remove({name:'何某'})
    // 删除 根据id
    // User.remove({id:'6216fe4126c087d0149de7db'})

    // res.send('查询成功：')
})
app.get('/update',(req,res)=>{
    // 修改 .update({查询条件},{$set:{修改内容}})
    // User.updateOne({name:'何某'},{$set:{age:45}},(err,result)=>{
        User.updateOne({name: req.query.name},{age: req.query.age},(err,result)=>{
        if(!err){
            console.log('------');
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
    // 删除年龄最大的人
    // 第一步：先找到年龄最大的人
    User.find((err,data)=>{
        // res.send('查询成功:' + data)

        const user = data[0]
        console.log(user);
        // res.send(user)
        User.remove({_id: user._id},(err,d)=>{
            if(!err){
                console.log(d.deletedCount);
                res.send('删除年龄最大的成功')
            }
        })
        // 删除姓张的
        // User.remove({name: /^张/},(err,d)=>{
        //     if(!err){
        //         console.log(d.deletedCount);
        //         res.send('删除年龄最大的成功')
        //     }
        // })
    }).sort({age:-1}).limit(1)
})


app.listen('3005', () => {
    console.log('服务器开启成功....http://localhost:3005/');
})