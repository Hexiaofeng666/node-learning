const multer = require('multer')
// 配置储存上传文件的 storage 
const storage = multer.diskStorage({
    destination: 'wwwroot/uploads',
    filename: (req,res,callback)=>{
        // const petname = req.headers.cookie.split('=')[1]
        const petname = formatCookie(req.headers.cookie,'petname')
        callback(null,petname + '.png')
    }
})
const upload = multer({ storage })

module.exports = upload