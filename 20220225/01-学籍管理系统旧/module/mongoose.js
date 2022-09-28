// 加载导入mongoose模块

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/h5-2109')

const db = mongoose.connection

// 监听连接状态
db.on('open',()=>{
    console.log('数据库连接成功...');
})
db.on('error',()=>{
    console.log('数据库连接失败...');
})

// 创建构造函数
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: String,
    age: Number,
    gender: Boolean,
    phone: String,
    email: String,
    detail: String,
    createTime: Date
},{
    collection: 'test-student'
})
// 创建构造函数，取名随意
const  Student = mongoose.model('h5',studentSchema)

// 导出Student
module.exports = Student