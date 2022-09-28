// 导入
const express = require('express')
const template = require('art-template')

const app = express()

app.use(express.static('wwwroot'))

const data = {
    title: '汽车专卖',
    content: [
        { index: 0, name: '比亚迪', price: '28.88w', currentPrice: '8.88w' },
        { index: 1, name: '奇瑞', price: '8.88w', currentPrice: '0.88w' },
        { index: 2, name: '吉利', price: '12.88w', currentPrice: '5.88w' },
        { index: 3, name: '小鹏', price: '36.00w', currentPrice: '18.88w' },
        { index: 4, name: '蔚来', price: '38.88w', currentPrice: '28.88w' }
    ]
}

// 静态资源文件夹中如果有 index.html 文件，默认访问的是该文件
// 如果静态文件中没有该文件的话，就会找到服务器接口中的 / 接口
app.get('/',(req,res)=>{

    // __dirname 项目的绝对路径
    const htmlStr = template(__dirname + '/views/index.art',{title: '第一个页面中的内容'})

    res.status(200).send(htmlStr)
})

app.get('/info2',(req,res)=>{
    
    // 第一种方法
    // const htmlStr = template(__dirname + '/views/index.art',data)

    // 第二种方法
    const render = require('./views/index2.art')
    const htmlStr = render({title: '这是第二个页面中的内容'})
    // console.log(render);
    res.status(200).send(htmlStr)
})

app.get('/info3',(req,res)=>{
    
    // 第一种方法
    // const htmlStr = template(__dirname + '/views/index.art',data)
    
    // 第二种方法
    const render = require('./views/index3.art')
    const htmlStr = render({title: '这是第三个页面中的内容'})
    // console.log(render);
    res.status(200).send(htmlStr)
})
app.listen('3000',()=>{
    console.log('服务器开启成功...');
})