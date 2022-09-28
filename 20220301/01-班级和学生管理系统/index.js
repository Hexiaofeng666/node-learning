const express = require('express')

const app = express()

app.use(express.static('wwwroot'))

app.use(express.urlencoded({extended:true}))

// app.use(require('./routers/view'))

// app.use('/student' ,require('./routers/student'))

const template = require('art-template')

// 导入操作库的对象(包含两个构造函数Student和Class)
const db = require('./db')

const Class = db.Class
const Student = db.Student

// 添加班级信息的接口
app.post('/create-class',(req,res)=>{
    //首先查询出现在已经开了多少个班级
    // 然后再原基础上进行 加1 即可
    Class.count({subject: req.body.subject},(err,count)=>{
        // 得到最新的期数
        req.body.session = count +1
        console.log(req.body);
        const cla = new Class(req.body)
        cla.save((err,data)=>{
            if(!err){
                res.redirect('/')
            }
        })
    })
})

// 跳转到添加学生的页面
app.get('/create-student',(req,res)=>{
    Class.find((err,data)=>{
        if(data.length>0){
            // 有班级
            // console.log(data[0].subject);
            const render = require('./views/create-student.art')
            const htmlStr = render({data})
            // console.log(render);
            res.status(200).send(htmlStr)
        }
        else{
            // 无班级
            res.status(200).send('请先添加班级信息')
        }
    })
})

// 储存学生信息的接口
app.post('/create-student',(req,res)=>{
    const stu = new Student(req.body)
    stu.save((err,data)=>{
        if (!err) {
            res.redirect('/create-student')
        }
    })
})
// 查看所有班级信息
app.get('/all-class',(req,res)=>{
    Class.find((err,data)=>{
        if(data.length>0){
            // 有班级
            // console.log(data[0].subject);
            const render = require('./views/all-class.art')
            const htmlStr = render({data})
            // console.log(render);
            res.status(200).send(htmlStr)
        
        }
        else{
            // 无班级
            res.status(200).send('请先添加班级信息')
        }
    })
})
// 查看某一个教室(我的)
// app.get('/lookallstu',(req,res)=>{
//     console.log(req.query.id);
//     Student.find({classinfo: req.query.id},(err,data)=>{
//         if(data.length>0){
//             // const render = require('./views/lookclass.art')
//             // const htmlStr = render({data})
//             // console.log(data);
//             res.status(200).send({data})
//         }
//         else{
//             res.status(200).send('请先添加班级信息')
//         }
//     })
// })
//获取学生列表页面(老师)
app.get('/student-list',(req,res)=>{
    Student.find(req.query,(err,data)=>{
            const render = require('./views/student-list.art')
            const htmlStr = render({data})
            // console.log(data);
            res.status(200).send(htmlStr)
    }).populate('classinfo')
})



app.listen('3000',()=>{
    console.log('服务器开启成功.....http://localhost:3000');
})