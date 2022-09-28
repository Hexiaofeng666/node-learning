
const express = require('express')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('wwwroot'))

app.get('/user',(req,res)=>{
    setTimeout(()=>{
        res.send(req.query)
    },3000)
})

app.post('/user',(req,res)=>{
    res.send(req.body)
})

app.listen(3000,()=>{
    console.log('成功...');
})
