const express = require('express')
const multer = require('multer')
const fs = require('fs')

const app = express()

app.use(express.static('wwwroot'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post('/getProducts', (req, res) => {
    fs.stat('data/home.json', function(err, stats){
        if(stats){
            fs.readFile('data/home.json', (err, data) => {
                // console.log(data);
                res.send(data)
            })
        }
    })
})

app.post('/getNews', (req, res) => {
    fs.stat('data/news.json', function(err, stats){
        if(stats){
            fs.readFile('data/news.json', (err, data) => {
                // console.log(data);
                res.send(data)
            })
        }
    })
})

app.post('/addProduct', (req, res) => {
    // console.log(req.body);
    let keys = Object.keys(req.body)[0]
    fs.stat('data/home.json', function(err, stats){
        if(stats){
            fs.readFile('data/home.json', (err, data) => {
                // console.log(JSON.parse(data).list[keys]['count']);
                // console.log(JSON.parse(data).list[keys]);
                // console.log(JSON.parse(data).list.length);
                let idArr = []
                let result = []
                for(let i = 0; i < JSON.parse(data).list.length; i++){
                    let msg = {
                        id: JSON.parse(data).list[i].id,
                        count: JSON.parse(data).list[i].count
                    }
                    idArr.push(msg)
                }
                res.send(idArr)
                // console.log(idArr);
                // console.log(idArr[keys].count);
                // if(idArr[keys].count > 0){
                    // let count = JSON.parse(data).list[keys].count
                    // count++
                    // let goods = {
                    //     img: JSON.parse(data).list[keys].image,
                    //     title: JSON.parse(data).list[keys].title,
                    //     id: keys,
                    //     price: JSON.parse(data).list[keys].price,
                    //     count
                    // }
                    // fs.appendFile('data/goods.txt', JSON.stringify(goods) + ',', (err) => {
                    //     if(err){
                    //         res.send('失败');
                    //     }
                    // })
                // }else{
                    
                // }

                // let count = JSON.parse(data).list[keys].count
                // count++
                // let goods = {
                //     img: JSON.parse(data).list[keys].image,
                //     title: JSON.parse(data).list[keys].title,
                //     id: keys,
                //     price: JSON.parse(data).list[keys].price,
                //     count
                // }
                // fs.appendFile('data/goods.txt', JSON.stringify(goods) + ',', (err) => {
                //     if(err){
                //         res.send('失败');
                //     }
                // })

                // if(keys != goods.id){
                //     let count = JSON.parse(data).list[keys].count
                //     count++
                //     let goods = {
                //         img: JSON.parse(data).list[keys].image,
                //         title: JSON.parse(data).list[keys].title,
                //         id: keys,
                //         price: JSON.parse(data).list[keys].price,
                //         count: count
                //     }
                //     fs.appendFile('data/goods.txt', JSON.stringify(goods) + ',', (err) => {
                //         if(err){
                //             res.send('失败');
                //         }
                //     })
                // }else if(keys == goods.id){
                //     let count = JSON.parse(data).list[keys].count
                //     count++
                //     let goods = {
                //         count
                //     }
                //     fs.appendFile('data/goods.txt', JSON.stringify(goods) + ',', (err) => {
                //         if(err){
                //             res.send('失败');
                //         }
                //     })
                // }
            })
        }
    })
})

app.get('/getGoods', (req, res) => {
    fs.stat('data/goods.txt', function(err, stats){
        if(stats){
            fs.readFile('data/goods.txt',(err, data) => {
                console.log(JSON.parse('[' + data.slice(0, data.length - 1) + ']'));
                let msg = JSON.parse('[' + data.slice(0, data.length - 1) + ']')
                res.send(msg)
            })
        }else{
            // 文件不存在
        }
    })
})

app.post('/delProduct', (req, res) => {
    fs.stat('data/home.json', function(err, stats){
        if(stats){
            fs.readFile('data/home.json', (err, data) => {
                
            })
        }
    })
})

app.listen(3000, () => {
    console.log('serve is running...http://localhost:3000/');
})