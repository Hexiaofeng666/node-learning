const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('wwwroot'))

let userArr = [{
    userId: 'admin',
    password: '96e79218965eb72c92a549dd5a330112'
},{
    userId: 'admin1',
    password: '96e79218965eb72c92a549dd5a330112'
},{
    userId: 'admin2',
    password: '96e79218965eb72c92a549dd5a330112'
}]

// 处理注册的接口
app.post('/register',(req,res)=>{
    console.log(req.body);
    // 判断用户是否存在
    let isUser = false
    // 获取到用户名和用户的密码
    const userId = req.body.username
    const password = req.body.password
    // console.log('进入注册接口');
    userArr.forEach((user)=>{
        if(user.userId == userId){
            // 该用户已存在
            isUser = true
            res.send('<h1>用户已存在，即将返回注册页面</h1><script>setTimeout(()=>{history.back()},1000)</script>')
        }
    })
    if(isUser == false){
        // 用户不存在
        userArr.push({
            userId,
            password
        })
        // console.log(userArr);
        // 用户不存在
        res.send('<h1>用户注册成功，即将进入登录页面</h1><script>setTimeout(()=>{location.href = "./index.html"},1000)</script>')
    }

})


// 登录的接口
app.post('/login',(req,res)=>{
    // 获取到用户名和用户的密码
    const userId = req.body.username
    const password = req.body.password

    // 判断用户是否存在
    let isUser = false

    userArr.forEach((user)=>{
        if(user.userId == userId){
            console.log(user,req.body);
            // 该用户存在
            // 对密码进行验证
            isUser = true
            if(user.password == password){
                res.send('<h1>💐恭喜💐登录💐成功💐</h1>')
            }else {
                res.send('<h1>密码错误，即将返回登录页面</h1><script>setTimeout(()=>{history.back()},1000)</script>')
            }
        }
    })

    if(isUser == false){
        // 该用户不存在
        res.send('<h1>用户不存在，即将返回登录页面</h1><script>setTimeout(()=>{history.back()},1000)</script>')
    }

})




app.listen(3000,()=>{
    console.log('服务器开启成功...');
})
