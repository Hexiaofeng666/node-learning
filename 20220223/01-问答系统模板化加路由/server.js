// 导入服务器对象
const app = require('./module/app')

app.use(require('./router/views.js'))




app.use('/user',require('./router/user'))
app.use('/question',require('./router/question'))

app.listen('3000',()=>{
    console.log('开启成功...');
})