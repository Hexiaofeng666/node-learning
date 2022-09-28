
const express = require('express')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(express.static('wwwroot'))


app.get('/getUser',(req,res)=>{
    console.log('请求成功');

    // 设置响应头的方式来解决跨域问题
    res.set('Access-Control-Allow-Origin','*')

    res.json({
        name: '张三',
        age: 18,
        sex: '女',
        h: 168,
        message: '一句话如何伤害你两次？',
        msg: '你单身这么久，应该挣了不少钱吧？'
    })
})


app.get('/getUser/jsonp',(req,res)=>{
    console.log('请求成功11111');

    res.jsonp({
        "name": "张三",
        "age": "18",
        "sex": "女",
        "h": "168",
        "message": "一句话如何伤害你两次？",
        "msg": "你单身这么久，应该挣了不少钱吧？"
    })
})


app.listen(3000, ()=>{
    console.log('服务器开启成功...');
})
