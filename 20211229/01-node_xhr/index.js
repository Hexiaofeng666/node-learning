const express = require('express')

// multer 处理文件上传和下载用的
const multer = require('multer')
const form = multer()

const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('wwwroot'))

let contentArr = [{
    content: '摇一摇'
},{
    content: '瞧一瞧'
},{
    content: '看一看'
},{
    content: '逛一逛'
},{
    content: '乐一乐'
}]
app.get('/addContent',(req,res)=>{
    contentArr.push(req.query)
    console.log(contentArr);
    res.json({
        message: '添加成功',
        contentArr,
        state: 200
    })
})

// app.post('/addContent',(req,res)=>{
//     console.log('post 请求成功',req.body);
//     contentArr.push(req.body)
//     // res.send('添加成功')
//     res.json({
//         message: '添加成功',
//         contentArr,
//         state: 200
//     })
// })


app.post('/addContent',form.array(),(req,res)=>{
    console.log('post 请求成功',req.body);
    contentArr.push(req.body)
    // res.send('添加成功')
    res.json({
        message: '添加成功',
        contentArr,
        state: 200
    })
})




app.listen(3000,()=>{
    console.log('服务器开启成功...');
})
