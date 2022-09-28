// 页面的入口js文件

// 假设此数据是从服务器请求过来的
const data = {
    title: '当当书架',
    books:[
        {
            name: '《Html5入门指南》',
            price:'99.5'
        },
        {
            name: '《CSS3从入门到入坑》',
            price:'128.88'
        },
        {
            name: '《JAVASCRIPT从入门到放弃》',
            price:'199.99'
        },
        {
            name: '《SQL从删库到跑路》',
            price:'299.99'
        },
        {
            name: '《java由浅入深》',
            price:'399.99'
        },
    ]
}
require(['text!template.html','art-template'],(templateStr,template)=>{
    // console.log(templateStr);
    // 将数据渲染到模板上
    // template.compile() 该函数返回的是一个渲染函数，参数是一个
    // 模板的字符串，而不是id
    const render = template.compile(templateStr)
    // 通过渲染函数，将数据渲染到模板上
    const htmlStr = render(data)
    // 渲染后得到一个被渲染后的字符串
    console.log(htmlStr);
    // 将渲染后的字符串添加到body中
    document.body.innerHTML = htmlStr
})
