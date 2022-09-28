
const express = require('express')

const app = express()

// 该模块是用来做数据请求用的
const http = require('http')

// console.log(http);
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

// 通过服务器代理来解决跨域问题
app.get('/live',(req,res)=>{

    res.set('Access-Control-Allow-Origin','*')

    http.get('http://open.douyucdn.cn/api/RoomApi/live',(res2)=>{
        let str = ''
        // 监听数据的传输
        res2.on('data',(data)=>{
            console.log(data);
            str += data
        })
        res2.on('end',()=>{
            res.send(str)
        })
    })
    // res.send('1')
})

app.listen(3000, ()=>{
    console.log('服务器开启成功...');
})
