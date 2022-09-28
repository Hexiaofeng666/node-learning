// 创建一个路由
const express = require('express')

const router = express.Router()
// 导入操作数据库集合的构造函数 Student
const Student = require('../module/mongoose')

// 获取首页数据
// 获取首页数据时，假设一页展示 5 条数据
const countOfPage = 5

router.get('/', (req, res) => {
    let page = req.query.page * 1
    if(!req.query.page){
        // 定义当前在第一页
        page = 1
    }
    // 先获取学生的总数量，
    Student.count((err, total) => {

        if (!err) {
            // 根据数量求出总页数
            const allPage = Math.ceil(total / countOfPage)
            // 要显示的页数
            const showPages = getShowPages(page,allPage)
            // 查询出所有数据
            Student.find(req.query, (err, data) => {
                // res.send('查询成功:' + data)
                // console.log(data);
                console.log(showPages);
                if (!err) {
                    const render = require('../views/index.art')
                    const htmlStr = render({
                        data,
                        page,
                        allPage,
                        showPages,
                        title: '豪华首页'
                    })
                    res.status(200).send(htmlStr)
                } else {
                    res.status(200).send('查询失败')
                }
            }).skip(countOfPage * (page - 1)).limit(countOfPage)
        } else {
            res.status(200).send('获取失败')
        }

    })




})

// 进入添加页面
router.get('/add', (req, res) => {
    const render = require('../views/add.art')
    const htmlStr = render({
        title: '神奇添加'
    })
    res.status(200).send(htmlStr)
})

// 我的方法
// function getShowPages(page, allPage) {
//     // page:当前页3
//     // allPage:总页数11
//     if(page<=3){
//         return [1,2,3,4,5]
//     }
//     else if (page<=allPage-3) {
//         return [page-2,page-1,page,page+1,page+2]
//     }else{
//         return [allPage-4,allPage-3,allPage-2,allPage-1,allPage]
//     }
// }

// 老师的
function getShowPages(page, allPage) {
    // page:当前页3
    // allPage:总页数11
    // 用来保存当前点击的这一页的前几页和后几页
    let showPages = []
    if (allPage <= 5) {
        for (let i = 0; i < allPage; i++) {
            showPages[i] = i + 1
        }
    }else{
        // 假设page = 8
        // 6   7   8   9   10
        showPages.push(page)
        // 偏移量offset
        let offset = 1
        while(showPages.length < 5 ){
            if(page - offset>0){
                showPages.unshift(page - offset)
            }
            if(page + offset <= allPage){
                showPages.push(page + offset)
            }
            offset++
            // console.log(showPages);
        }
        return showPages
    }
}

// console.log(getShowPages(5, 11));


// 导出路由对象
module.exports = router