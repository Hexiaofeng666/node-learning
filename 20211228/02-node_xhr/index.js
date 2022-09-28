const express = require('express')

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

app.post('/addContent',(req,res)=>{
    contentArr.push(req.body)
    res.send('添加成功')
})

app.listen(3000,()=>{
    console.log('服务器开启成功...');
})
