// 导入服务器对象
const app = require('./module/app')



app.use(require('./router/views.js'))

app.use('/user',require('./router/user.js'))
app.use('/querstion',require('./router/question.js'))


app.listen('3000',()=>{
    console.log('开启成功...');
})