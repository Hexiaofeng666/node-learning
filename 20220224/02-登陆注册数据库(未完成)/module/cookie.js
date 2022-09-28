
// 拆分 Cookie 的方法
function formatCookie(cookie,key){
    // cookie = 'petname=tx; question=1645425627428; name=tx'
    // cookie = 'petname=tx'
    // key = 'petname'
    if(cookie.indexOf('; ') == -1){
        // 只有一个 cookie
        const arr = cookie.split('=')
        if(arr[0] == key){
            return arr[1]
        }
    }else {
        // 有多个 cookie
        const arr = cookie.split('; ')
        console.log(arr);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const items = element.split('=')
            if(items[0] == key){
                return items[1]
            }
        }
    }
}

module.exports = formatCookie