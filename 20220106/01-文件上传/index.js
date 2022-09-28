
const express = require('express')

const app = express()

const multer = require('multer')

const fs = require('fs')

app.use(express.json({limit: '100mb'}))

app.use(express.urlencoded({limit: '100mb',extended: true}))

app.use(express.static('wwwroot'))

// 处理点击加号，上传多张图片
// 创建一个储存对象
const storage = multer.diskStorage({
    // 设置图片的存放路径
    destination: 'wwwroot/imgs',
    filename: (req,file,callback)=>{
        const name = new Date().getDay() + Math.random()
        callback(null,name + '.png')
    }
})
const uploads = multer({storage})

app.post('/photo',uploads.array('photo', 9),(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    console.log('11111111111111');
    res.send('恭喜你上传成功...')
})


// 拖拽上传文件的接口
app.post('/uploadFile',(req,res)=>{
    // 文件数据流在 file 中
    console.log(req.body.file);
    // 将数据流转换为图片
    // 创建一个缓存区
    const buffer = Buffer.from(req.body.file,'base64')
    // 生成一个文件名
    const name = new Date().getDay() + Math.random()
    // 将文件储存起来
    fs.writeFile('wwwroot/files/' + name + req.body.type,buffer,(err)=>{
        if (err) {
            console.log('有错误写入失败');
            res.send('有错误写入失败')
        }else {
            console.log('写入成功');
            res.send('写入成功')
        }
    })
})


app.listen(3000, ()=>{
    console.log('服务器开启成功...');
})
