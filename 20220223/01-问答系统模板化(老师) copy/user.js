
const express = require('express')

// 创建路由对象

const user = express.Router()

user.post('/register',(req,res)=>{
    res.send('获取register页面成功')
    console.log(req);
    console.log('------------------');
    console.log(res);
    console.log('-------================');
    // 先判断有没有 users 这个文件夹
    fs.stat('users',(exi)=>{
        if(!exi){
            // 存在，可以写入
            writeFile()
        }else {
            // 文件夹不存在，需要创建
            fs.mkdirSync('users',(err)=>{
                if(err){
                    // 创建失败
                    res.status(200).json({
                        code: '1002',
                        message: '系统创建文件夹失败'
                    })
                }else {
                    // 创建成功，可以写入
                    writeFile()
                }
            })
        }
    })

    // 封装一个将注册信息写入本地的方法
    function writeFile(){

        const fileName = 'users/' + req.body.petname + '.txt'
        fs.stat(fileName,(exi)=>{
            if(!exi){
                // 用户存在，已被抢注
                res.status(200).json({
                    code: '1001',
                    message: '用户已存在，请重新注册'
                })
            }else {
                // 用户不存在，可以写入
                // 记录注册 ip 地址
                req.body.ip = req.ip
                // 添加注册时间
                req.body.time = new Date()

                // 未注册的用户，将其信息写入本地
                fs.writeFile(fileName,JSON.stringify(req.body),(err)=>{
                    if(err){
                        res.status(200).json({
                            code: '1002',
                            message: '系统写入文件失败'
                        })
                    }else {
                        // 保存成功
                        res.status(200).json({
                            code: '1000',
                            message: '恭喜你注册成功'
                        })
                    }
                })

            }
        })

    }

    // res.send('注册成功')
})
user.post('/login',(req,res)=>{
    res.send('login')
    // const fileName = 'users/' + req.body.petname + '.txt'
    // fs.stat(fileName,(err)=>{
    //     if(!err){
    //         // 有文件，读取文件的内容然后进行密码的比较
    //         fs.readFile(fileName,(err,data)=>{
    //             if(!err){

    //                 const user = JSON.parse(data)
    //                 if(user.password == req.body.password){

    //                     // 后端设置后，在调用该接口后，其他所有请求都会生效
    //                     // 将用户的信息设置到 cookie 中（下次使用时不需要再次登录）
    //                     const expires = new Date()
    //                     expires.setMonth(expires.getMonth() + 1)
    //                     // 将用户的登录信息返回给前端
    //                     res.cookie('petname',req.body.petname,{expires})
    //                     res.status(200).json({
    //                         code: '2000',
    //                         message: '登录成功'
    //                     })
    //                 }else {
    //                     res.status(200).json({
    //                         code: '2003',
    //                         message: '密码错误，请重新登录'
    //                     })
    //                 }

    //             }else {
    //                 // 系统错误，文件读取失败
    //                 res.status(200).json({
    //                     code: '2002',
    //                     message: '系统错误，文件读取失败'
    //                 })
    //             }
    //         })

    //     }else {
    //         // 没有文件
    //         res.status(200).json({
    //             code: '2001',
    //             message: '用户不存在'
    //         })
    //     }

    // })


})
module.exports = user