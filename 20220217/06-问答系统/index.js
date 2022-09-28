const express = require('express')

const app = express()

app.use(express.static('wwwroot'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// ----------------------- 注册 -----------------------
app.post('/user/register',(req,res)=>{
    
})

// ----------------------- 注册 -----------------------

app.listen('3000',()=>{
    console.log('开启成功...');
})