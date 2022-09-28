//连接数据库，进行添加班级信息和学生信息和老师信息
const mongoose = require( 'mongoose' )


mongoose.connect('mongodb://127.0.0.1:27017/h5-2109')

// 连接数据库
const db = mongoose.connection
// 判断连接状态
db.on('open',()=>{
    console.log('数据库连接成功');
})
db.on('error',()=>{
    console.log('数据库连接失败');
})
// 获取Schema构造函数
const Schema = mongoose.Schema

const classSchema = new Schema({
    subject: String,
    session: Number,
    classroom: String,
    teacher: String

},{versionKey:false})

// 生成一个构造函数
const Class = mongoose.model('Class',classSchema)

const studentSchema = new Schema({
    name: String,
    age: Number,
    classinfo:{type: Schema.Types.ObjectId,ref:'Class'}

},{versionKey:false})

// 生成一个构造函数
const Student = mongoose.model('Student',studentSchema)

// 导出操作数据库的构造函数
module.exports = {
    Class,
    Student
}
