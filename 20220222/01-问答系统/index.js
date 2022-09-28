const express = require('express')

const fs = require('fs')

const multer = require('multer')

const app = express()

const template = require('art-template')

app.use(express.static('wwwroot'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// 配置储存上传文件的 storage 
const storage = multer.diskStorage({
    destination: 'wwwroot/uploads',
    filename: (req,res,callback)=>{
        // const petname = req.headers.cookie.split('=')[1]
        const petname = formatCookie(req.headers.cookie,'petname')
        callback(null,petname + '.png')
    }
})
const upload = multer({ storage })

// ----------------------- 注册 -----------------------
app.post('/user/register',(req,res)=>{
    // console.log(req);

    // 先判断有没有 users 这个文件夹
    fs.stat('users',(exi)=>{
        console.log(exi);
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
            console.log(exi);
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

// ----------------------- 注册 -----------------------
// ----------------------- 登录 -----------------------
app.post('/user/login',(req,res)=>{
    const fileName = 'users/' + req.body.petname + '.txt'
    fs.stat(fileName,(err)=>{
        if(!err){
            // 有文件，读取文件的内容然后进行密码的比较
            fs.readFile(fileName,(err,data)=>{
                if(!err){

                    const user = JSON.parse(data)
                    console.log(user);
                    if(user.password == req.body.password){

                        // 后端设置后，在调用该接口后，其他所有请求都会生效
                        // 将用户的信息设置到 cookie 中（下次使用时不需要再次登录）
                        const expires = new Date()
                        expires.setMonth(expires.getMonth() + 1)
                        // 将用户的登录信息返回给前端
                        res.cookie('petname',req.body.petname,{expires})
                        res.status(200).json({
                            code: '2000',
                            message: '登录成功'
                        })
                    }else {
                        res.status(200).json({
                            code: '2003',
                            message: '密码错误，请重新登录'
                        })
                    }

                }else {
                    // 系统错误，文件读取失败
                    res.status(200).json({
                        code: '2002',
                        message: '系统错误，文件读取失败'
                    })
                }
            })

        }else {
            // 没有文件
            res.status(200).json({
                code: '2001',
                message: '用户不存在'
            })
        }

    })


})
// ----------------------- 登录 -----------------------
// ----------------------- 退出登录 -----------------------
app.get('/user/logout',(req,res)=>{
    // 清除 cookie 中的 petname 
    res.clearCookie('petname')
    res.status(200).json({
        code: '3000',
        message: '退出登录成功'
    })
})

// ----------------------- 退出登录 -----------------------

// ----------------------- 上传头像 -----------------------

app.post('/user/photo',upload.single('photo'),(req,res)=>{
    res.status(200).json({
        code: '4000',
        message: '上传头像成功'
    })
})

// ----------------------- 上传头像 -----------------------


// ----------------------- 发表问题 -----------------------
app.post('/querstion/ask',(req,res)=>{
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

    console.log(req.headers.cookie);

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
            res.status(200).json({
                code: '5000',
                message: '提交问题成功'
            })
        }  
    })
}
})
// ----------------------- 发表问题 -----------------------
// ----------------------- 获取首页数据 -----------------------
app.get('/',(req,res)=>{
    // 获取所有文件
    fs.readdir('querstion',(err,files)=>{
        if(err){
            // 读取文件失败
            res.status(200).json({
                code: '6001',
                message: '系统错误，文件读取失败'
            })
        }else {
            // 读取文件成功
            // 将数组反序排列，目的是让最近的数据显示在最上面
            files = files.reverse()
            console.log(files);
            // 创建一个数组容器，存放所有的问题对象
            let querstions = []
            for(let i = 0; i < files.length; i++){
                const file = files[i]
                // 拼接文件路径
                const filePath = 'querstion/' + file
                // 获取文件中的内容
                const data = fs.readFileSync(filePath)
                const obj = JSON.parse(data)
                querstions.push(obj)
            }


            //模板化渲染页面
            let render = require('./wwwroot/index.art')
            
            // template
            const htmlStr = template(__dirname + './wwwroot/index.art',querstions)

            res.status(200).json(htmlStr)
        }
    })

})
// ----------------------- 获取首页数据 -----------------------

// ----------------------- 回答问题 -----------------------
app.post('/querstion/answer',(req,res)=>{

    

    const querstion = formatCookie(req.headers.cookie,'question')
    const petname = formatCookie(req.headers.cookie,'petname')

    // console.log(querstion,petname);

    // 获取问题路径
    const filePath = 'querstion/' + querstion + '.txt'

    fs.readFile(filePath,(err,data)=>{
        console.log(req.body);
        console.log('------------------------------');
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
                res.status(200).json({
                    code: '7000',
                    message: '提交答案成功，给你笔芯哟亲！'
                })
            }
        })

        }
    })
})
// ----------------------- 回答问题 -----------------------
app.listen('3000',()=>{
    console.log('开启成功...');
})


// 拆分 Cookie 的方法
function formatCookie(cookie,key){
    // cookie = 'petname=tx; question=1645425627428; name=tx'
    // cookie = 'petname=tx'
    // key = 'petname'
    if(cookie.indexOf('; ') == -1){
        // 只有一个 cookie
        const arr = cookie.split('=')
        if(arr[0] == key){
            return arr[1]
        }
    }else {
        // 有多个 cookie
        const arr = cookie.split('; ')
        console.log(arr);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const items = element.split('=')
            if(items[0] == key){
                return items[1]
            }
        }
    }
}
// let str = formatCookie('a=小猛; b=甘泉; c=金乐','b')
// console.log(str);

/*
    petname=tx
    petname=tx; question=1645425627428
    petname=tx; question=1645425627428; name=tx
    通过 indexOf() 判断是一个 cookie 还是多个
    如果是一个那么我们可以直接通过 = 来进行拆分
    如果是多个我们可以通过 ; 封号先将多个 cookie 拆成数组
    然后遍历数组取出想要的东西
*/ 