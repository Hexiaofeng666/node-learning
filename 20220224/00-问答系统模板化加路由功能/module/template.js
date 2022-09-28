const template = require('art-template')

// 给模板添加辅助函数
template.defaults.imports.$formatDate = function(time){
    time = new Date(time)
    let y = time.getFullYear()
    let M = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()

    M = M < 10 ? '0' + M : M
    d = d < 10 ? '0' + d : d
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s

    // 2022-02-21 09:50:20
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
}
template.defaults.imports.$formatIp = function(ip){

    const regExp = /::1/ig
    if(ip.match(regExp)){
        return 'localhost'
    }else {
        return ip.substr(7)
    }

}

module.exports = template