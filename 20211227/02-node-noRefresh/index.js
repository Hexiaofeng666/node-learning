
const express = require('express')

const app = express()

app.use(express.static('wwwroot'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.post('/login',(req,res)=>{
    res.send({
        userName: req.body.username,
        password: req.body.password
    })
})


app.listen('3000',()=>{
    console.log('服务器开启成功');
})
