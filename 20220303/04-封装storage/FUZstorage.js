/*
    目的：

    1.将原来储存对象时出现的问题解决掉 ：[Object Object]
*/
const FZStorage = {
    setSes:(key,value)=>{
        /*
            考虑到传递过来的value可能是字符串，也可能是其他类型
            我们这里不管是什么类型，都将其转换成字符串
        */
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    getSes:(key)=>{
        const value = sessionStorage.getItem(key)
        return JSON.parse(value)
    },
    setLoc:(key,value)=>{
        /*
            考虑到传递过来的value可能是字符串，也可能是其他类型
            我们这里不管是什么类型，都将其转换成字符串
        */
        localStorage.setItem(key,JSON.stringify(value))
    },
    getLoc:(key)=>{
        const value = localStorage.getItem(key)
        return JSON.parse(value)
    }
}