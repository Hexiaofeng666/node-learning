
const express = require('express')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('wwwroot'))

app.get('/user',(req,res)=>{
    res.send(req.query)
})

app.post('/user',(req,res)=>{
    res.send(req.body)
})

app.listen(3000,()=>{
    console.log('成功...');
})
