// 创建一个路由
const express = require('express')
const router = express.Router()

// 导入操作数据库集合的构造函数 Student
const Student = require('../module/mongoose')
const { route } = require('./view')

// 添加学生信息的接口
router.post('/add',(req,res)=>{
    // 添加信息的时间
    req.body.createTime = new Date()
    
    // const arr = [
    //     '张',
    //     '李',
    //     '王',
    //     '吴',
    //     '甘',
    //     '赵',
    //     '钱',
    //     '周'
    // ]
    // const arr2 = [
    //     '天',
    //     '地',
    //     '神',
    //     '小',
    //     '晓',
    //     '宇',
    //     '青',
    //     '亿'
    // ]
    // const arr3 = [
    //     '涛',
    //     '淘',
    //     '杨',
    //     '洋',
    //     '水',
    //     '迪',
    //     '山',
    //     '淼'
    // ]
    // const a = [true,false]
    // const n = ['1','2','3','4','5','6','7','8','9']
    // for(let i = 0; i < 50; i++){
    //     req.body.name = arr[Math.floor(Math.random()*8)] + arr2[Math.floor(Math.random()*8)] + arr3[Math.floor(Math.random()*8)]
    //     req.body.age = Math.floor(Math.random()*100)
    //     req.body.gender = a[Math.floor(Math.random()*2)]
    //     req.body.phone = '18' + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)]
    //     req.body.email = n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + n[Math.floor(Math.random()*9)] + '@qq.com'
    //     req.body.detail = req.body.name + '真好看，像春天的太阳一样'
        const student = new Student(req.body)

        student.save((err)=>{
            if(!err){
                res.redirect('/')
            }else {
                res.send('<script>location.href="/";alert("储存数据失败")</script>')
            }
             
        })
    // }
   
    // res.redirect('/')
})



// ------------------ 获取首页数据 ------------------
// 获取首页数据
// 获取首页数据时，假设一页展示 5 条数据
const countOfPage = 5

router.get('/info',(req,res)=>{
    let page = req.query.page * 1
    if(!req.query.page){
        // 定义当前在第一页
        page = 1
    }
    
    // 先获取学生的总数量
    Student.count((err, total)=>{
        
        if(!err){
            // 根据数量求出总页数
            const allPage = Math.ceil(total / countOfPage)
            // 要显示的页数
            const showPages = getShowPages(page, allPage)
            // 查询出所有数据
            Student.find((err,data)=>{
                console.log(err);
                if(!err){
                    // const render = require('../views/index.art')
                    // const htmlStr = render({
                    //     title: '豪华首页',
                    //     data,
                    //     allPage,
                    //     page,
                    //     showPages
                    // })

                    res.status(200).json({
                        title: '豪华首页',
                        data,
                        allPage,
                        page,
                        showPages
                    })

                    // console.log(render);
                    // res.status(200).send(htmlStr)
                }else {
                    res.status(200).send('查询失败')
                }
            }).skip((page - 1) * countOfPage).limit(countOfPage)

        }else {
            res.status(200).send('获取失败')
        }
       


    })

   
    
    // res.status(200).send('htmlStr')
})



function getShowPages(page,allPage){
    // page: 当前页  3
    // allPage：总页数  11
    // 
    // 用来保存当前点击的这一页的前几页和后几页
    let showPages = []
    if(allPage <= 5){
        for(let i = 0; i < allPage; i++){
            showPages[i] = i + 1
        }
    }else {
        // 假设 page = 8
        // 6  7   8   9   10
        showPages.push(page)
        let offset = 1
        while (showPages.length < 5) {
            if(page - offset > 0){
                showPages.unshift(page - offset)
            }
            if(page + offset <=  allPage){
                showPages.push(page + offset)
            }
            offset++
        }
        return showPages
    }
}
// ------------------ 获取首页数据 ------------------

// ------------------ 删除数据的接口 ------------------

router.post('/remove',(req,res)=>{
    // console.log('-------------------');
    // console.log(req.body);
    // console.log('-------------------');
    // console.log(req.query);
    Student.remove({_id:req.body.id},(err)=>{
        if(!err){
            res.status(200).send('删除成功')
        }
    })
})


// ------------------ 删除数据的接口 ------------------

// ------------------ 修改数据的接口 ------------------

router.post('/update',(req,res)=>{
    // res.send(req.query.id)
    // console.log('-------------------');
    // console.log(req.body);
    // console.log('-------------------');
    // console.log(req.query);
    Student.updateOne({_id:req.query.id},req.body,(err,result)=>{
        if(!err){
            res.redirect('/')
            
        }
        else{
            res.status(200).send('修改失败')
        }
    })
})


// ------------------ 修改数据的接口 ------------------


// -------------------搜索数据的接口--------------------
router.get('/search',(req,res)=>{
    // 收集所有的请求条件
    // 因为我们这里需要的是模糊查询（只要包含就算）
    let condition={}
    if(req.query.name.length > 0){
        condition.name={$regex: req.query.name}
    }
    if(req.query.gender == 'true'){
        condition.gender = true
    }else if(req.query.gender == 'false'){
        condition.gender = false
    }
    if(req.query.phone.length > 0){
        condition.phone={$regex: req.query.phone}
    }
    Student.find(condition,(err,data)=>{
        if(!err){
            res.status(200).json({data})
        }
    })
})

// -------------------搜索数据的接口--------------------

// 导出路由对象
module.exports = router