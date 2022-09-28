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


// 存入班级信息
// const cla = new Class({
//     subject: 'h5精英',
//     session: '2201',
//     classroom: '666',
//     teacher: '何老师'
// })

// cla.save()

// 存入学生信息
// Class.findOne({classroom: '602'},(err,cla)=>{
//     // console.log(cla);
//     const stu = new Student({
//         name: '张三',
//         age: 28,
//         classinfo: cla._id

//     })
//     stu.save()
// })

// 查询某个教室的所有学生
// Class.find((err,data)=>{
//     // 获取一个班级,此处获取第一个
//     const cla = data[0]

//     Student.find({classinfo: cla._id},(err,data)=>{
//         console.log(data[0].classinfo);
//     }).populate('classinfo')
//     // .populate('classinfo')将classinfo中的对象信息查询出来
//     // 默认是只显示 id
// })

// 查询某一个学生的教室
Student.find((err,data)=>{
    // 获取一个学生,此处获取第一个
    const stu = data[0]
    console.log(stu.classinfo.classroom);
}).populate('classinfo')



// 或者
// Student.find((err,data)=>{
//     // 获取一个学生,此处获取第一个
//     const stu = data[0]
//     Student.find({name: stu.name},(err,data)=>{
//         console.log(data[0].classinfo.classroom);
//     }).populate('classinfo')
// })
