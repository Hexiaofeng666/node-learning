const express = require('express')

// 创建一个新路由
const router = express.Router()

const formatCookie = require('../module/cookie')
const fs = require('fs')

// ----------------------- 发表问题 -----------------------
router.post('/ask',(req,res)=>{
    // 先判断有没有 querstion 这个文件夹
    fs.stat('querstion',(exi)=>{
        // console.log(exi);
        if(!exi){
            // 存在，可以写入
            writeFile()
        }else {
            // 文件夹不存在，需要创建
            fs.mkdirSync('querstion',(err)=>{
                if(err){
                    // 创建失败
                    res.status(200).json({
                        code: '5001',
                        message: '系统创建文件夹失败'
                    })
                }else {
                    // 创建成功，可以写入
                    writeFile()
                }
            })
        }
    })
    
    
    
     // 封装一个将问题写入本地的方法
     function writeFile(){
    
        // 生成提问问题的文件名
        const date = new Date()
    
        const fileName = 'querstion/' + date.getTime() + '.txt'
        
        // console.log(req.headers.cookie);
    
        // 生成需要保存的信息
        // req.body.petname = req.headers.cookie.split('=')[1]
        req.body.petname  = formatCookie(req.headers.cookie,'petname')
        req.body.ip = req.ip
        req.body.time = date
        // 防止跨网站攻击 XSS
        req.body.content = req.body.content.replace(/</g,'&lt;')
        req.body.content = req.body.content.replace(/>/g,'&gt;')
    
        // 写入文件
        fs.writeFile(fileName,JSON.stringify(req.body),(err)=>{
            if(err){
                // 写入失败
                res.status(200).json({
                    code: '5002',
                    message: '系统错误，写入文件失败'
                })
            }else {
                // 写入成功
                // res.status(200).json({
                //     code: '5000',
                //     message: '提交问题成功'
                // })
                res.redirect('/')
            }  
        })
    }
    })
// ----------------------- 发表问题 -----------------------

// ----------------------- 回答问题 -----------------------
router.post('/answer',(req,res)=>{

    

    const querstion = formatCookie(req.headers.cookie,'question')
    const petname = formatCookie(req.headers.cookie,'petname')

    // console.log(querstion,petname);

    // 获取问题路径
    const filePath = 'querstion/' + querstion + '.txt'

    fs.readFile(filePath,(err,data)=>{
        if(!err){
            const dataObj = JSON.parse(data)
            // 先判断是否有回答过，如果没有回答过就创建一个字段
            if(!dataObj.answers){
                dataObj.answers = []
            }

        // 生成需要保存的信息
        req.body.petname = petname
        const date = new Date()
        req.body.ip = req.ip
        req.body.time = date
        req.body.querstion = querstion
        // 防止跨网站攻击 XSS
        req.body.content = req.body.content.replace(/</g,'&lt;')
        req.body.content = req.body.content.replace(/>/g,'&gt;')

        // console.log(req.body);
        // 将答案 push 到 dataObj.answers 中
        dataObj.answers.push(req.body)
        // 修改过后重新写入
        fs.writeFile(filePath,JSON.stringify(dataObj),(err)=>{
            if(err){
                // 写入失败
                res.status(200).json({
                    code: '7001',
                    message: '系统错误，写入文件失败'
                })
            }else {
                // 写入成功
                // res.status(200).json({
                //     code: '7000',
                //     message: '提交答案成功，给你笔芯哟亲！'
                // })
                res.redirect('/')
            }
        })

        }
    })
})
// ----------------------- 回答问题 -----------------------





// 导出路由对象
module.exports = router