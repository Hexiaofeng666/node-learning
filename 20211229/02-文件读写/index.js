const express = require('express')

// multer 处理文件上传和下载用的
const multer = require('multer')
const form = multer()

const app = express()

// fs 是用来做文件处理的
let fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('wwwroot'))

// 提交数据的方法
app.post('/add', form.array(), (req,res)=>{

    // console.log(req.body.username);

    let msg = {
        username: req.body.username,
        content: req.body.content,
        // 将提交时间记录下来
        time: new Date()
    }
    console.log(msg);

    // fs.stat 获取有没有对应的路径
    fs.stat('data',(err, stats)=>{
        // console.log(err);
        // console.log(stats);
        // 如果没有文件
        if(!stats){
            // 创建文件夹
            fs.mkdirSync('data')
        }
    })

    // 储存用户的提交信息
    // fs.appendFile 将内如写入文件中
    // message.txt 文件如果不存在会自动创建
    // 第二个参数是写入的内容，一定要注意需要字符串类型
    fs.appendFile('data/message.txt', JSON.stringify(msg) + ',' ,(err)=>{
        if(err){
            res.send('留言失败');
        }
    })

    res.send('添加成功')
})


// 读文件，获取到我们提交的所有数据信息
app.get('/getContent',(req,res)=>{
    fs.stat('data/message.txt',(err,stats)=>{

        
        if(stats){
            // 文件存在
            // 将文件中的内容读取出来
            fs.readFile('data/message.txt',(err,data)=>{
                console.log(err);
                console.log(data);
                res.send('[' + data.slice(0, data.length - 1) + ']')
            })
        }else {
            // 文件不存在

        }
         
    })
})

app.listen(3000,()=>{
    console.log('服务器开启成功...');
})