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

// 读文件，获取到我们提交的所有数据信息
app.get('/getData',(req,res)=>{
    fs.stat('data/data.json',(err,stats)=>{

        
        if(stats){
            // 文件存在
            // 将文件中的内容读取出来
            fs.readFile('data/data.json',(err,data)=>{
                console.log(err);
                console.log(data);
                // res.send('[' + data.slice(0, data.length - 1) + ']')
                res.send(data)
            })
        }else {
            // 文件不存在
            res.send('404')
        }
         
    })
})

app.listen(3000,()=>{
    console.log('服务器开启成功...');
})