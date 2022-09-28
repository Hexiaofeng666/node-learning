
const express = require('express')

const app = express()

const multer = require('multer')

app.use(express.json())

app.use(express.urlencoded({extended: true}))

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

app.listen(3000, ()=>{
    console.log('服务器开启成功...');
})
